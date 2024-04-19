import { DOCUMENT } from '@angular/common';
import { Injectable, Inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { ConfirmationService } from '../../core/services/confirmation.service';
@Injectable()
export class InventoryService {
  inventoryUrl: any;
  current_language_set: any;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private confirmationService: ConfirmationService,
  ) {}

  moveToInventory(
    benID: any,
    visit: any,
    flowID: any,
    regID: any,
    language: any,
    healthID: any,
  ) {
    const authKey = this.getAuthKey();
    const facility = this.getFacilityID();
    const protocol = this.getProtocol();
    const host = this.getHost();
    const vanID = this.getVanID();
    const ppID = this.getppID();
    const serviceName = this.getServiceDetails();
    const parentAPI = this.getParentAPI();

    if (authKey && protocol && host && facility) {
      this.inventoryUrl = `${environment.INVENTORY_URL}protocol=${protocol}&host=${host}&user=${authKey}&app=${environment.app}&fallback=${environment.fallbackUrl}&back=${environment.redirInUrl}&facility=${facility}&ben=${benID}&visit=${visit}&flow=${flowID}&reg=${regID}&vanID=${vanID}&ppID=${ppID}&serviceName=${serviceName}&parentAPI=${parentAPI}&currentLanguage=${language}&healthID=${healthID}`;
      console.log(this.inventoryUrl);
      window.location.href = this.inventoryUrl;
    } else {
      this.confirmationService.alert(
        this.current_language_set.alerts.info.noFacilityMapper,
        'error',
      );
    }
  }
  getParentAPI() {
    return environment.parentAPI;
  }
  getAuthKey(): string | null {
    if (sessionStorage.getItem('isAuthenticated')) {
      return sessionStorage.getItem('key');
    }
    return null; // or return undefined; depending on your use case
  }

  getFlowID() {}

  getFacilityID() {
    if (sessionStorage.getItem('facilityID')) {
      return sessionStorage.getItem('facilityID');
    } else {
      return undefined;
    }
  }

  getProtocol() {
    return this.document.location.protocol;
  }

  getHost() {
    console.log(this.document.location, 'location');
    console.log(
      `${this.document.location.host}${this.document.location.pathname}`,
    );
    return `${this.document.location.host}${this.document.location.pathname}`;
  }

  getVanID() {
    const serviceLineDetailsData: any =
      localStorage.getItem('serviceLineDetails');
    const serviceLineDetails = JSON.parse(serviceLineDetailsData);
    return serviceLineDetails.vanID;
  }
  getppID() {
    const serviceLineDetailsData: any =
      localStorage.getItem('serviceLineDetails');
    const serviceLineDetails = JSON.parse(serviceLineDetailsData);
    return serviceLineDetails.parkingPlaceID;
  }

  getServiceDetails() {
    const serviceName = localStorage.getItem('serviceName');
    return serviceName;
  }
}
