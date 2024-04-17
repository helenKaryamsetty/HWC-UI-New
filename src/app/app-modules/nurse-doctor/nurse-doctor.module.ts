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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { NurseDoctorRoutingModule } from './nurse-doctor-routing.module';
import { DoctorWorklistComponent } from './doctor-worklist/doctor-worklist.component';
import { BirthImmunizationHistoryComponent } from './birth-immunization-history/birth-immunization-history.component';
import { FormImmunizationHistoryComponent } from './birth-immunization-history/form-immunization-history/form-immunization-history.component';
import { InfantBirthDetailsComponent } from './birth-immunization-history/infant-birth-details/infant-birth-details.component';
import { AncCaseSheetComponent } from './case-sheet/general-case-sheet/anc-case-sheet/anc-case-sheet.component';
import { CaseSheetComponent } from './case-sheet/case-sheet.component';
import { ChildAndAdolescentOralVitaminACaseSheetComponent } from './case-sheet/general-case-sheet/child-and-adolescent-oral-vitamin-a-case-sheet/child-and-adolescent-oral-vitamin-a-case-sheet.component';
import { NurseService } from './shared/services/nurse.service';
import { DoctorService, MasterdataService } from './shared/services';
import { ExaminationCaseSheetComponent } from './case-sheet/general-case-sheet/examination-case-sheet/examination-case-sheet.component';
import { MaterialModule } from '../core/material.module';
import { Nurse104RefferedWorklistComponent } from './nurse-worklist-wrapper/nurse-104-reffered-worklist/nurse-104-reffered-worklist.component';
import { NurseMmuTmReferredWorklistComponent } from './nurse-worklist-wrapper/nurse-mmu-tm-referred-worklist/nurse-mmu-tm-referred-worklist.component';
import { NurseTmFutureWorklistComponent } from './nurse-worklist-wrapper/nurse-tm-future-worklist/nurse-tm-future-worklist.component';
import { NurseTmWorklistComponent } from './nurse-worklist-wrapper/nurse-tm-worklist/nurse-tm-worklist.component';
import { NurseWorklistWrapperComponent } from './nurse-worklist-wrapper/nurse-worklist-wrapper.component';
import { NurseWorklistComponent } from './nurse-worklist-wrapper/nurse-worklist/nurse-worklist.component';
import { NcdScreeningService } from './shared/services/ncd-screening.service';
import { Referred104WorkareaComponent } from './workarea/referred-104-workarea/referred-104-workarea.component';
import { WorkareaComponent } from './workarea/workarea.component';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { VisitDetailsComponent } from './visit-details/visit-details.component';
import { PatientVisitDetailsComponent } from './visit-details/visit-details/visit-details.component';
import { CbacComponent } from './visit-details/cbac/cbac.component';
import { AdherenceComponent } from './visit-details/adherence/adherence.component';
import { ChiefComplaintsComponent } from './visit-details/chief-complaints/chief-complaints.component';
import { ContactHistoryComponent } from './visit-details/contact-history/contact-history.component';
import { CovidVaccinationStatusComponent } from './visit-details/covid-vaccination-status/covid-vaccination-status.component';
import { DiseaseconfirmationComponent } from './visit-details/diseaseconfirmation/diseaseconfirmation.component';
import { InvestigationsComponent } from './visit-details/investigations/investigations.component';
import { SymptomsComponent } from './visit-details/symptoms/symptoms.component';
import { TravelHistoryComponent } from './visit-details/travel-history/travel-history.component';
import { UploadFilesComponent } from './visit-details/upload-files/upload-files.component';
import { IdrsscoreService } from './shared/services/idrsscore.service';
import { DispensationDetailsComponent } from './family-planning/dispensation-details/dispensation-details.component';
import { FamilyPlanningAndReproductiveComponent } from './family-planning/family-planning-and-reproductive-details/family-planning-and-reproductive-details.component';
import { FamilyPlanningComponent } from './family-planning/family-planning.component';
import { IecAndCounsellingComponent } from './family-planning/iec-and-counselling-details/iec-and-counselling-details.component';
import { AncDetailsComponent } from './anc/anc-details/anc-details.component';
import { AncImmunizationComponent } from './anc/anc-immunization/anc-immunization.component';
import { AncComponent } from './anc/anc.component';
import { ObstetricFormulaComponent } from './anc/obstetric-formula/obstetric-formula.component';
import { PncComponent } from './pnc/pnc.component';
import { ChildhoodOralVitaminComponent } from './immunization-service/childhood-oral-vitamin/childhood-oral-vitamin.component';
import { ImmunizationServiceComponent } from './immunization-service/immunization-service.component';
import { NeonatalImmunizationServiceComponent } from './immunization-service/neonatal-immunization-service/neonatal-immunization-service.component';
import { GeneralPatientVitalsComponent } from './vitals/general-patient-vitals/general-patient-vitals.component';
import { NeonatalPatientVitalsComponent } from './vitals/neonatal-patient-vitals/neonatal-patient-vitals.component';
import { VitalsComponent } from './vitals/vitals.component';
import { TestInVitalsService } from './shared/services/test-in-vitals.service';
import { TcSpecialistWorklistComponent } from './tc-specialist-worklist/tc-specialist-worklist.component';
import { TmFutureWorklistComponent } from './doctor-tm-future-worklist/tm-future-worklist.component';
import { DoctorTmWorklistWrapperComponent } from './doctor-tm-worklist-wrapper/doctor-tm-worklist-wrapper.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { TcSpecialistFutureWorklistComponent } from './tc-specialist-future-worklist/tc-specialist-future-worklist.component';
import { TcSpecialistWorklistWrapperComponent } from './tc-specialist-worklist-wrapper/tc-specialist-worklist-wrapper.component';
import { OncologistWorklistComponent } from './oncologist-worklist/oncologist-worklist.component';
import { RadiologistWorklistComponent } from './radiologist-worklist/radiologist-worklist.component';
import {
  MatNativeDateModule,
  DateAdapter,
  MAT_DATE_LOCALE,
  MAT_DATE_FORMATS,
} from '@angular/material/core';
import {
  MomentDateModule,
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import { CdssFormComponent } from './cdss/cdss-form/cdss-form.component';
import { CdssFormResultPopupComponent } from './cdss/cdss-form-result-popup/cdss-form-result-popup.component';
import { CDSSService } from './shared/services/cdss-service';
import { DiseaseFormComponent } from './cdss/diseaseSummary/diseaseSummary.component';
import { ViewDiseaseSummaryDetailsComponent } from './cdss/viewDiseaseSummaryDetails/viewDiseaseSummaryDet.component';
import { HistoryComponent } from './history/history.component';
import { GeneralOpdHistoryComponent } from './history/general-opd-history/general-opd-history.component';
import { GeneralPersonalHistoryComponent } from './history/general-opd-history/personal-history/personal-history.component';
import { PastHistoryComponent } from './history/general-opd-history/past-history/past-history.component';
import { PhysicalActivityHistoryComponent } from './history/general-opd-history/physical-activity-history/physical-activity-history.component';
import { DevelopmentHistoryComponent } from './history/general-opd-history/development-history/development-history.component';
import { FamilyHistoryNcdscreeningComponent } from './history/general-opd-history/family-history-ncdscreening/family-history-ncdscreening.component';
import { FeedingHistoryComponent } from './history/general-opd-history/feeding-history/feeding-history.component';
import { MedicationHistoryComponent } from './history/general-opd-history/medication-history/medication-history.component';
import { FamilyHistoryComponent } from './history/general-opd-history/family-history/family-history.component';
import { ComorbidityConcurrentConditionsComponent } from './history/general-opd-history/comorbidity-concurrent-conditions/comorbidity-concurrent-conditions.component';
import { MenstrualHistoryComponent } from './history/general-opd-history/menstrual-history/menstrual-history.component';
import { PerinatalHistoryComponent } from './history/general-opd-history/perinatal-history/perinatal-history.component';
import { PastObstericHistoryComponent } from './history/general-opd-history/past-obsteric-history/past-obsteric-history.component';
import { ImmunizationHistoryComponent } from './history/general-opd-history/immunization-history/immunization-history.component';
import { OtherVaccinesComponent } from './history/general-opd-history/other-vaccines/other-vaccines.component';
import { BreastCancerScreeningComponent } from './screening/breast-cancer-screening/breast-cancer-screening.component';
import { CervicalCancerScreeningComponent } from './screening/cervical-cancer-screening/cervical-cancer-screening.component';
import { DiabetesScreeningComponent } from './screening/diabetes-screening/diabetes-screening.component';
import { HypertensionScreeningComponent } from './screening/hypertension-screening/hypertension-screening.component';
import { OralCancerScreeningComponent } from './screening/oral-cancer-screening/oral-cancer-screening.component';
import { ScreeningComponent } from './screening/screening.component';
import { IdrsComponent } from './idrs/idrs.component';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MM/YYYY',
    dateA11yLabel: 'DD/MM/YYYY',
    monthYearA11yLabel: 'MM/YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    // ChartsModule,
    NurseDoctorRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    MatTableModule,
    MatChipsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatNativeDateModule,
    MomentDateModule,
  ],
  declarations: [
    NurseWorklistComponent,
    PatientVisitDetailsComponent,
    // PrintPageSelectComponent,
    // QuickConsultComponent,
    // ObstetricExaminationComponent,
    // GenitoUrinarySystemComponent,
    // CentralNervousSystemComponent,
    // MusculoskeletalSystemComponent,
    // RespiratorySystemComponent,
    // GastroIntestinalSystemComponent,
    // CardioVascularSystemComponent,
    // SystemicExaminationComponent,
    // HeadToToeExaminationComponent,
    // GeneralExaminationComponent,
    // GeneralOpdExaminationComponent,
    GeneralPatientVitalsComponent,
    MedicationHistoryComponent,
    DevelopmentHistoryComponent,
    FeedingHistoryComponent,
    OtherVaccinesComponent,
    ImmunizationHistoryComponent,
    PastObstericHistoryComponent,
    PerinatalHistoryComponent,
    MenstrualHistoryComponent,
    FamilyHistoryComponent,
    ComorbidityConcurrentConditionsComponent,
    GeneralPersonalHistoryComponent,
    PastHistoryComponent,
    GeneralOpdHistoryComponent,
    DoctorWorklistComponent,
    AncComponent,
    AncDetailsComponent,
    AncImmunizationComponent,
    ObstetricFormulaComponent,
    VisitDetailsComponent,
    // VisitCategoryComponent,
    ChiefComplaintsComponent,
    AdherenceComponent,
    TravelHistoryComponent,
    SymptomsComponent,
    ContactHistoryComponent,
    InvestigationsComponent,
    UploadFilesComponent,
    HistoryComponent,
    // ExaminationComponent,
    VitalsComponent,
    // CaseRecordComponent,
    PncComponent,
    // DashboardComponent,
    WorkareaComponent,
    // GeneralCaseRecordComponent,
    // GeneralReferComponent,
    // GeneralCaseSheetComponent,
    // ReferComponent,
    // PrintPageSelectComponent,
    // PreviousVisitDetailsComponent,
    // FindingsComponent,
    // DiagnosisComponent,
    // PrescriptionComponent,
    // DoctorInvestigationsComponent,
    // TestAndRadiologyComponent,
    RadiologistWorklistComponent,
    OncologistWorklistComponent,
    // GeneralOpdDiagnosisComponent,
    // AncDiagnosisComponent,
    CaseSheetComponent,
    // NcdCareDiagnosisComponent,
    // PncDiagnosisComponent,
    // PreviousSignificiantFindingsComponent,
    // ViewTestReportComponent,
    // HistoryCaseSheetComponent,
    ExaminationCaseSheetComponent,
    AncCaseSheetComponent,
    // PncCaseSheetComponent,
    // DoctorDiagnosisCaseSheetComponent,
    // BeneficiaryMctsCallHistoryComponent,
    // BeneficiaryPlatformHistoryComponent,
    TcSpecialistWorklistComponent,
    DoctorTmWorklistWrapperComponent,
    TmFutureWorklistComponent,
    SchedulerComponent,
    TcSpecialistWorklistWrapperComponent,
    TcSpecialistFutureWorklistComponent,
    NurseWorklistWrapperComponent,
    NurseTmWorklistComponent,
    NurseTmFutureWorklistComponent,
    // CovidDiagnosisComponent,
    IdrsComponent,
    PhysicalActivityHistoryComponent,
    FamilyHistoryNcdscreeningComponent,
    // NcdScreeningDiagnosisComponent,
    NurseMmuTmReferredWorklistComponent,
    DiseaseconfirmationComponent,
    CovidVaccinationStatusComponent,
    DiabetesScreeningComponent,
    OralCancerScreeningComponent,
    ScreeningComponent,
    CbacComponent,
    HypertensionScreeningComponent,
    BreastCancerScreeningComponent,
    CervicalCancerScreeningComponent,
    // ScreeningCaseSheetComponent,
    // GeneralOralExaminationComponent,
    FamilyPlanningComponent,
    DispensationDetailsComponent,
    FamilyPlanningAndReproductiveComponent,
    IecAndCounsellingComponent,
    // TreatmentsOnSideEffectsComponent,
    // FamilyPlanningCaseSheetComponent,
    // VisitDeatilsCaseSheetComponent,
    // NeonatalPatientVitalsComponent,
    NeonatalImmunizationServiceComponent,
    NeonatalPatientVitalsComponent,
    // NeonatalImmunizationServiceComponent,
    BirthImmunizationHistoryComponent,
    InfantBirthDetailsComponent,
    FormImmunizationHistoryComponent,
    // FollowUpForImmunizationComponent,
    // NeonatalAndInfantServiceCaseSheetComponent,
    ChildAndAdolescentOralVitaminACaseSheetComponent,
    ChildhoodOralVitaminComponent,
    ImmunizationServiceComponent,
    Nurse104RefferedWorklistComponent,
    // Referred104CdssDetailsComponent,
    // Referred104DetailsPopupComponent,
    Referred104WorkareaComponent,
    // Referred104CdssDetailsComponent,
    CdssFormComponent,
    DiseaseFormComponent,
    // Cdss104FormComponent,
    ViewDiseaseSummaryDetailsComponent,
    CdssFormResultPopupComponent,
    // Referred104BeneficiaryDetailsComponent
  ],

  providers: [
    NurseService,
    DoctorService,
    MasterdataService,
    NcdScreeningService,
    IdrsscoreService,
    // WorkareaCanActivate, LabService,RegistrarService,
    TestInVitalsService, //FamilyTaggingService, NcdScreeningService,
    CDSSService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class NurseDoctorModule {}
