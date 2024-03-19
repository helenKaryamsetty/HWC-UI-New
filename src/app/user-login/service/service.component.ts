import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from '../../app-modules/core/services/confirmation.service';
import { TelemedicineService } from '../../app-modules/core/services/telemedicine.service';
// import { ServicePointService } from './../service-point/service-point.service';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css'],
})
export class ServiceComponent implements OnInit {
  servicesList: any;
  serviceIDs: any;
  fullName: any;

  constructor(
    private router: Router,
    private telemedicineService: TelemedicineService,
    // private servicePointService: ServicePointService,
    private confirmationService: ConfirmationService,
  ) {}

  ngOnInit() {
    localStorage.removeItem('providerServiceID');
    const servicesData = localStorage.getItem('services');
    if (servicesData !== null) {
      this.servicesList = JSON.parse(servicesData);
    }
    this.fullName = localStorage.getItem('fullName');
  }

  loginDataResponse: any;
  selectService(service: any) {
    localStorage.setItem('providerServiceID', service.providerServiceID);
    console.log(localStorage.getItem('provideServiceID'));
    localStorage.setItem('serviceName', service.serviceName);
    localStorage.setItem('serviceID', service.serviceID);
    sessionStorage.setItem('apimanClientKey', service.apimanClientKey);
    const loginData = localStorage.getItem('loginDataResponse');
    if (loginData !== null) {
      this.servicesList = JSON.parse(loginData);
    }
    // this.loginDataResponse = JSON.parse(localStorage.getItem('loginDataResponse'));
    this.checkRoleAndDesingnationMappedForservice(
      this.loginDataResponse,
      service,
    );
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

  roleArray: any = [];
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
            'Role features are not mapped for user , Please map a role feature',
            'error',
          );
        }
      } else {
        this.confirmationService.alert(
          'Role features are not mapped for user , Please map a role feature',
          'error',
        );
      }
    } else {
      this.confirmationService.alert(
        'Role features are not mapped for user , Please map a role feature',
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
          'Designation is not available for user , Please map the designation',
          'error',
        );
      }
    } else {
      this.confirmationService.alert(
        'Designation is not available for user , Please map the designation',
        'error',
      );
    }
  }

  checkDesignationWithRole() {
    if (this.roleArray.includes(this.designation)) {
      localStorage.setItem('designation', this.designation);
      // this.getSwymedMailLogin();
      this.routeToDesignation(this.designation);
    } else {
      this.confirmationService.alert(
        'Designation is not matched with your roles , Please map the designation or include more roles',
        'error',
      );
    }
  }
  // getSwymedMailLogin() {
  //   this.servicePointService.getSwymedMailLogin().subscribe((res: any) => {
  //     if (res.statusCode === 200)
  //       window.location.href = res.data.response
  //   })
  // }

  routeToDesignation(designation: any) {
    switch (designation) {
      case 'TC Specialist':
        this.router.navigate(['/common/tcspecialist-worklist']);
        break;
      case 'Supervisor':
        this.telemedicineService.routeToTeleMedecine();
        break;
      default:
        this.router.navigate(['/servicePoint']);
        break;
    }
  }
}
