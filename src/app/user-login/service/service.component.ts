import { Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService } from 'src/app/app-modules/core/services';
import { TelemedicineService } from 'src/app/app-modules/core/services/telemedicine.service';
import { ServicePointService } from './../service-point/service-point.service';
import { HttpServiceService } from 'src/app/app-modules/core/services/http-service.service';
import { SetLanguageComponent } from 'src/app/app-modules/core/components/set-language.component';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit, DoCheck {
  servicesList: any;
  serviceIDs: any;
  fullName: any;
  currentLanguageSet: any;
  statesList: any = [];
  stateID: any;
  current_language_set: any;
  vanServicepointDetails: any;
  vansList = [];
  vanID!: string;
  serviceDetails: any;
  stateName: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private telemedicineService: TelemedicineService,
    private servicePointService: ServicePointService,
    private confirmationService: ConfirmationService,
    public httpServiceService: HttpServiceService,
  ) {}

  ngOnInit() {
    this.assignSelectedLanguage();
    localStorage.removeItem('providerServiceID');
    const services: any = localStorage.getItem('services');
    this.servicesList = JSON.parse(services);
    this.fullName = localStorage.getItem('fullName');
  }

  getServicePoint() {
    const serviceProviderId: any = localStorage.getItem('providerServiceID');
    const userId: any = localStorage.getItem('userID');
    const data: any = localStorage.getItem('loginDataResponse');
    const jsonData = JSON.parse(data);
    const designation = jsonData.designation.designationName;
    this.servicePointService
      .getServicePoints(userId, serviceProviderId)
      .subscribe(
        (res: any) => {
          console.log('res under getServicePoints', res);
          if (res.statusCode === 200 && res.data !== null) {
            const data = res.data;

            if (data.UserVanSpDetails && data.UserVanSpDetails.length > 0) {
              this.vanServicepointDetails = data.UserVanSpDetails;
              this.filterVanList(this.vanServicepointDetails);
              this.getDemographics();
              this.checkRoleAndDesingnationMappedForservice(
                this.loginDataResponse,
                this.serviceDetails,
              );
            } else if (designation === 'TC Specialist') {
              this.checkRoleAndDesingnationMappedForservice(
                this.loginDataResponse,
                this.serviceDetails,
              );
            }
          } else if (res.statusCode === 5002) {
            this.confirmationService.alert(res.errorMessage, 'error');
          } else {
            this.confirmationService.alert(res.errorMessage, 'error');
            this.router.navigate(['/service']);
          }
        },
        (err: any) => {
          this.confirmationService.alert(err, 'error');
        },
      );
  }
  filterVanList(vanServicepointDetails: any) {
    console.log('vanServicepointDetails', vanServicepointDetails);
    this.vansList = vanServicepointDetails.filter((van: any) => {
      if (van.vanSession === 3) {
        return van;
      }
    });
    this.vansList = vanServicepointDetails.filter(
      (thing: any, i: any, arr: any) =>
        arr.findIndex((t: any) => t.vanID === thing.vanID) === i,
    );
    console.log('vanList', this.vansList);
    this.getServiceLineDetails();
  }
  getServiceLineDetails() {
    const serviceLineDetails: any = this.vansList[0];
    console.log('serviceLineDetails', serviceLineDetails);
    localStorage.setItem(
      'serviceLineDetails',
      JSON.stringify(serviceLineDetails),
    );
    if (
      serviceLineDetails.facilityID &&
      serviceLineDetails.facilityID !== undefined &&
      serviceLineDetails.facilityID !== null
    )
      sessionStorage.setItem('facilityID', serviceLineDetails.facilityID);
    if (serviceLineDetails.servicePointID)
      localStorage.setItem('servicePointID', serviceLineDetails.servicePointID);
    if (serviceLineDetails.servicePointName)
      localStorage.setItem(
        'servicePointName',
        serviceLineDetails.servicePointName,
      );
    if (serviceLineDetails.vanSession)
      localStorage.setItem('sessionID', serviceLineDetails.vanSession);
  }

  loginDataResponse: any;
  ngDoCheck() {
    this.assignSelectedLanguage();
  }

  assignSelectedLanguage() {
    const getLanguageJson = new SetLanguageComponent(this.httpServiceService);
    getLanguageJson.setLanguage();
    this.currentLanguageSet = getLanguageJson.currentLanguageObject;
  }

  selectService(service: any) {
    localStorage.setItem('providerServiceID', service.providerServiceID);
    console.log(localStorage.getItem('provideServiceID'));
    localStorage.setItem('serviceName', service.serviceName);
    localStorage.setItem('serviceID', service.serviceID);
    sessionStorage.setItem('apimanClientKey', service.apimanClientKey);
    const loginDataResponse: any = localStorage.getItem('loginDataResponse');
    this.loginDataResponse = JSON.parse(loginDataResponse);
    this.serviceDetails = service;
    this.getServicePoint();
    this.getCdssAdminStatus();
  }

  checkRoleAndDesingnationMappedForservice(
    loginDataResponse: any,
    service: any,
  ) {
    let serviceData: any;

    if (loginDataResponse.previlegeObj) {
      serviceData = loginDataResponse.previlegeObj.filter((item: any) => {
        return item.serviceName === service.serviceName;
      })[0];

      if (serviceData !== null) {
        this.checkMappedRoleForService(serviceData);
      }
    }
  }

  roleArray: any[] = [];
  checkMappedRoleForService(serviceData: any) {
    this.roleArray = [];
    let roleData;
    if (serviceData.roles) {
      roleData = serviceData.roles;
      if (roleData.length > 0) {
        roleData.forEach((role: any) => {
          role.serviceRoleScreenMappings.forEach((serviceRole: any) => {
            this.roleArray.push(serviceRole.screen.screenName);
          });
        });
        if (this.roleArray && this.roleArray.length > 0) {
          localStorage.setItem('role', JSON.stringify(this.roleArray));
          this.checkMappedDesignation(this.loginDataResponse);
        } else {
          this.confirmationService.alert(
            this.currentLanguageSet.alerts.info.mapRoleFeature,
            'error',
          );
        }
      } else {
        this.confirmationService.alert(
          this.currentLanguageSet.alerts.info.mapRoleFeature,
          'error',
        );
      }
    } else {
      this.confirmationService.alert(
        this.currentLanguageSet.alerts.info.mapRoleFeature,
        'error',
      );
    }
  }

  designation: any;
  checkMappedDesignation(loginDataResponse: any) {
    if (
      loginDataResponse.designation &&
      loginDataResponse.designation.designationName
    ) {
      this.designation = loginDataResponse.designation.designationName;
      if (this.designation !== null) {
        this.checkDesignationWithRole();
      } else {
        this.confirmationService.alert(
          this.currentLanguageSet.alerts.info.mapDesignation,
          'error',
        );
      }
    } else {
      this.confirmationService.alert(
        this.currentLanguageSet.alerts.info.mapDesignation,
        'error',
      );
    }
  }

  checkDesignationWithRole() {
    if (this.roleArray.includes(this.designation)) {
      localStorage.setItem('designation', this.designation);
      this.routeToDesignation(this.designation);
    } else {
      this.confirmationService.alert(
        this.currentLanguageSet.alerts.info.rolesNotMatched,
        'error',
      );
    }
  }
  getSwymedMailLogin() {
    this.servicePointService.getSwymedMailLogin().subscribe((res: any) => {
      if (res.statusCode === 200) window.location.href = res.data.response;
    });
  }

  getDemographics() {
    this.servicePointService.getMMUDemographics().subscribe((res: any) => {
      if (res && res.statusCode === 200) {
        this.saveDemographicsToStorage(res.data);
      } else {
        this.locationGathetingIssues();
      }
    });
  }

  saveDemographicsToStorage(data: any) {
    if (data) {
      if (data.stateMaster && data.stateMaster.length >= 1) {
        localStorage.setItem('location', JSON.stringify(data));
      } else {
        this.locationGathetingIssues();
      }
    } else {
      this.locationGathetingIssues();
    }

    console.log('statesList', this.statesList);
    this.stateID = data.stateMaster.stateID;
    this.saveLocationDataToStorage();
  }

  locationGathetingIssues() {
    this.confirmationService.alert(
      this.current_language_set.coreComponents
        .issuesInGettingLocationTryToReLogin,
      'error',
    );
  }
  goToWorkList() {
    this.designation = localStorage.getItem('designation');
    this.routeToDesignationWorklist(this.designation);
  }

  routeToDesignationWorklist(designation: any) {
    switch (designation) {
      case 'Registrar':
        this.router.navigate(['/registrar/registration']);
        break;
      case 'Nurse':
        this.router.navigate(['/nurse-doctor/nurse-worklist']);
        break;
      case 'Doctor':
        this.router.navigate(['/nurse-doctor/doctor-worklist']);
        break;
      case 'Lab Technician':
        this.router.navigate(['/lab']);
        break;
      case 'Pharmacist':
        this.router.navigate(['/pharmacist']);
        break;
      case 'Radiologist':
        this.router.navigate(['/nurse-doctor/radiologist-worklist']);
        break;
      case 'Oncologist':
        this.router.navigate(['/nurse-doctor/oncologist-worklist']);
        break;
      default:
    }
  }

  routeToDesignation(designation: any) {
    switch (designation) {
      case 'TC Specialist':
        this.router.navigate(['/nurse-doctor/tcspecialist-worklist']);
        break;
      case 'Supervisor':
        this.telemedicineService.routeToTeleMedecine();
        break;
      default:
        this.router.navigate(['/servicePoint']);
        this.goToWorkList();
        break;
    }
  }

  getCdssAdminStatus() {
    const psmid = localStorage.getItem('providerServiceID');
    this.servicePointService
      .getCdssAdminDetails(psmid)
      .subscribe((res: any) => {
        if (
          res.data !== null &&
          res.data !== undefined &&
          res.data.isCdss !== undefined &&
          res.data.isCdss !== null
        ) {
          localStorage.setItem('isCdss', res.data.isCdss);
        }
      });
  }

  saveLocationDataToStorage() {
    const location: any = localStorage.getItem('location');
    const data = JSON.parse(location);
    this.stateName = data.stateMaster.find((item: any) => {
      if (item.stateID === data.otherLoc.stateID) return item.stateName;
    });
    const locationData = {
      stateID: data.otherLoc.stateID,
      stateName: this.stateName.stateName,
      districtID: data.otherLoc.districtList[0].districtID,
      districtName: data.otherLoc.districtList[0].districtName,
      blockName: data.otherLoc.districtList[0].blockName,
      blockID: data.otherLoc.districtList[0].blockId,
      subDistrictID: data.otherLoc.districtList[0].districtBranchID,
      villageName: data.otherLoc.districtList[0].villageName,
    };

    // Convert the object into a JSON string
    const locationDataJSON = JSON.stringify(locationData);

    // Store the JSON string in localStorage
    localStorage.setItem('locationData', locationDataJSON);
  }
}
