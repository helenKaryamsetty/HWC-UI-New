import { NgModule, ErrorHandler, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Http, XHRBackend, RequestOptions } from '@angular/http';
import { MaterialModule } from './material.module';
// import { Md2Module } from 'md2';
// import { ChartsModule } from 'ng2-charts';
// import { PaginationModule } from 'ngx-bootstrap/pagination';

import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { WebCamModule } from 'ack-angular-webcam';

// import { HttpInterceptor } from './services/http-interceptor.service';
import { SpinnerService } from './services/spinner.service';
import { CameraService } from './services/camera.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { BeneficiaryDetailsService } from './services/beneficiary-details.service';
import { CommonService } from './services/common-services.service';
import { GlobalErrorHandler } from './services/global-error-handler.service';
import { TelemedicineService } from './services/telemedicine.service';

// import { myEmail } from './directives/email/myEmail.directive';
// import { myMobileNumber } from './directives/MobileNumber/myMobileNumber.directive';
// import { myName } from './directives/name/myName.directive';
// import { myPassword } from './directives/password/myPassword.directive';
// import { StringValidator } from './directives/stringValidator.directive';
// import { NumberValidator } from './directives/numberValidator.directive';
// import { DisableFormControlDirective } from './directives/disableFormControl.directive';
// import { NullDefaultValueDirective } from './directives/null-default-value.directive';
import { InventoryService } from './services/inventory.service';

// import { DiagnosisSearchDirective } from './directives/provisionalDiagnosis.directive';
// import { ConfirmatoryDiagnosisDirective } from './directives/confirmatory-diagnosis.directive';
//import { ViewRadiologyUploadedFilesComponent } from '../lab/view-radiology-uploaded-files/view-radiology-uploaded-files.component';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';

// import { HttpServiceService } from 'app/app-modules/core/services/http-service.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonDialogComponent } from './component/common-dialog/common-dialog.component';
import { HttpServiceService } from './services/http-service.service';
import { AllergenSearchComponent } from './component/allergen-search/allergen-search.component';
import { SpecialistLoginComponent } from './component/specialist-login/specialist-login.component';
// import { AppFooterComponent } from './component/app-footer/app-footer.component';
import { AppHeaderComponent } from './component/app-header/app-header.component';
import { BeneficiaryDetailsComponent } from './component/beneficiary-details/beneficiary-details.component';
import { CalibrationComponent } from './component/calibration/calibration.component';
import { CameraDialogComponent } from './component/camera-dialog/camera-dialog.component';
import { DiagnosisSearchComponent } from './component/diagnosis-search/diagnosis-search.component';
import { IotBluetoothComponent } from './component/iot-bluetooth/iot-bluetooth.component';
import { IotcomponentComponent } from './component/iotcomponent/iotcomponent.component';
import { MmuRbsDetailsComponent } from './component/mmu-rbs-details/mmu-rbs-details.component';
import { OpenPreviousVisitDetailsComponent } from './component/open-previous-visit-details/open-previous-visit-details.component';
import { PreviousDetailsComponent } from './component/previous-details/previous-details.component';
import { ShowCommitAndVersionDetailsComponent } from './component/show-commit-and-version-details/show-commit-and-version-details.component';
import { PreviousImmunizationServiceDetailsComponent } from './component/previous-immunization-service-details/previous-immunization-service-details.component';
import { SpinnerComponent } from './component/spinner/spinner.component';
import { TextareaDialog } from './component/textarea-dialog/textarea-dialog.service';
import { TextareaDialogComponent } from './component/textarea-dialog/textarea-dialog.component';
import { UserLoginModule } from 'src/app/user-login/user-login.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { IotService } from './services/iot.service';
import { AppFooterComponent } from './component/app-footer/app-footer.component';
import { HealthIdDisplayModalComponent } from './component/health-id-display-modal/health-id-display-modal.component';
import { ConfirmationService } from './services/confirmation.service';
// import { HealthIdDisplayModalComponent } from './components/health-id-display-modal/health-id-display-modal.component';
// import { myHealthId } from './directives/myHealthId/myHealthId.directive';

// import { SetLanguageComponent } from './components/set-language.component';
// import { ClinicalObservationsDirective } from './directives/clinical-observations.directive';
// import { SignificantFindingsDirective } from './directives/significant-findings.directive';

@NgModule({
  imports: [
    HttpClientModule,
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    UserLoginModule,
    MatGridListModule,
    // ChartsModule,

    // PaginationModule.forRoot()
  ],
  declarations: [
    CommonDialogComponent,
    CameraDialogComponent,
    TextareaDialogComponent,
    SpinnerComponent,
    BeneficiaryDetailsComponent,
    AppFooterComponent,
    AppHeaderComponent,
    PreviousDetailsComponent,
    PreviousImmunizationServiceDetailsComponent,
    MmuRbsDetailsComponent,
    SpecialistLoginComponent,
    DiagnosisSearchComponent,
    // myEmail, myMobileNumber, myName, myPassword, StringValidator, NullDefaultValueDirective, NumberValidator, DisableFormControlDirective,
    //  DiagnosisSearchDirective, ConfirmatoryDiagnosisDirective,
    ShowCommitAndVersionDetailsComponent,
    //ViewRadiologyUploadedFilesComponent,
    // , ConfirmatoryDiagnosisDirective
    IotcomponentComponent,
    IotBluetoothComponent,
    AllergenSearchComponent,
    CalibrationComponent,
    // SetLanguageComponent,
    HealthIdDisplayModalComponent,
    // ClinicalObservationsDirective, SignificantFindingsDirective,
    // myHealthId,
    OpenPreviousVisitDetailsComponent,
  ],
  exports: [
    MaterialModule,
    CommonDialogComponent,
    CameraDialogComponent,
    TextareaDialogComponent,
    SpinnerComponent,
    BeneficiaryDetailsComponent,
    SpecialistLoginComponent,
    AppFooterComponent,
    AppHeaderComponent,
    DiagnosisSearchComponent,
    PreviousDetailsComponent,
    PreviousImmunizationServiceDetailsComponent,
    MmuRbsDetailsComponent,
    // PaginationModule,
    ShowCommitAndVersionDetailsComponent,
    // myEmail, myMobileNumber, myName, myPassword, DisableFormControlDirective, StringValidator, NumberValidator, NullDefaultValueDirective,
    //  DiagnosisSearchDirective, ConfirmatoryDiagnosisDirective,
    IotcomponentComponent,
    IotBluetoothComponent,
    AllergenSearchComponent,
    CalibrationComponent,
    // SetLanguageComponent,
    HealthIdDisplayModalComponent,
    //  ClinicalObservationsDirective, SignificantFindingsDirective,
    OpenPreviousVisitDetailsComponent,
  ],
  //   entryComponents: [
  //     CommonDialogComponent,
  //     CameraDialogComponent,
  //    TextareaDialogComponent,
  //     SpinnerComponent,
  //     PreviousDetailsComponent,
  //     PreviousImmunizationServiceDetailsComponent,
  //     MmuRbsDetailsComponent,
  //     SpecialistLoginComponent,
  //     DiagnosisSearchComponent,
  //     ShowCommitAndVersionDetailsComponent,
  //     ViewRadiologyUploadedFilesComponent,
  //     IotcomponentComponent,
  //     IotBluetoothComponent,
  //     AllergenSearchComponent,
  //     CalibrationComponent,
  //     HealthIdDisplayModalComponent,
  //     OpenPreviousVisitDetailsComponent
  //   ]
})
export class CoreModule {
  // static forRoot: any;

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        //         HttpInterceptor,
        //         HttpServiceService,

        ConfirmationService,
        //         CameraService,
        TextareaDialog,
        AuthGuard,
        AppHeaderComponent,
        AuthService,
        //         SpinnerService,
        //         BeneficiaryDetailsService,
        //         CommonService,
        //         InventoryService,
        //         CanDeactivateGuardService,
        TelemedicineService,
        IotService,
        HttpServiceService,
        //         {
        //           provide: Http,
        //           useFactory: HttpInterceptorFactory,
        //           deps: [XHRBackend, RequestOptions, Router, SpinnerService, ConfirmationService]
        //         }
      ],
    };
  }
}

// export function HttpInterceptorFactory(backend: XHRBackend, options: RequestOptions, router: Router, spinner: SpinnerService, confirmation: ConfirmationService) {
//   return new HttpInterceptor(backend, options, router, spinner, confirmation);
//}
