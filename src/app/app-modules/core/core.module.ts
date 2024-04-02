/*
 * AMRIT – Accessible Medical Records via Integrated Technology
 * Integrated EHR (Electronic Health Records) Solution
 *
 * Copyright (C) "Piramal Swasthya Management and Research Institute"
 *
 * This file is part of AMRIT.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see https://www.gnu.org/licenses/.
 */
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

import { RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';
import { TelemedicineService } from './services/telemedicine.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonDialogComponent } from './component/common-dialog/common-dialog.component';
import { HttpServiceService } from './services/http-service.service';
import { AllergenSearchComponent } from './component/allergen-search/allergen-search.component';
import { SpecialistLoginComponent } from './component/specialist-login/specialist-login.component';
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
import {
  CameraService,
  SpinnerService,
  BeneficiaryDetailsService,
} from './services';
import { CanDeactivateGuardService } from './services/can-deactivate-guard.service';
import { CommonService } from './services/common-services.service';
import { InventoryService } from './services/inventory.service';
import { HttpInterceptorService } from './services/http-interceptor.service';

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
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        HttpInterceptorService,
        HttpServiceService,
        ConfirmationService,
        CameraService,
        TextareaDialog,
        AuthGuard,
        AppHeaderComponent,
        AuthService,
        SpinnerService,
        BeneficiaryDetailsService,
        CommonService,
        InventoryService,
        CanDeactivateGuardService,
        TelemedicineService,
        IotService,
        HttpServiceService,
      ],
    };
  }
}
