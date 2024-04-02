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
@NgModule({
  imports: [
    CommonModule,
    // ChartsModule,
    NurseDoctorRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    // NurseWorklistComponent,
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
    // GeneralPatientVitalsComponent,
    // MedicationHistoryComponent,
    // DevelopmentHistoryComponent,
    // FeedingHistoryComponent,
    // OtherVaccinesComponent,
    // ImmunizationHistoryComponent,
    // PastObstericHistoryComponent,
    // PerinatalHistoryComponent,
    // MenstrualHistoryComponent,
    // FamilyHistoryComponent,
    // ComorbidityConcurrentConditionsComponent,
    // GeneralPersonalHistoryComponent,
    // PastHistoryComponent,
    // GeneralOpdHistoryComponent,
    DoctorWorklistComponent,
    // AncComponent,
    // AncDetailsComponent,
    // AncImmunizationComponent,
    // ObstetricFormulaComponent,
    // VisitDetailsComponent,
    // VisitCategoryComponent,
    // ChiefComplaintsComponent,
    // AdherenceComponent,
    // TravelHistoryComponent,
    // SymptomsComponent,
    // ContactHistoryComponent,
    // InvestigationsComponent,
    // UploadFilesComponent,
    // HistoryComponent,
    // ExaminationComponent,
    // VitalsComponent,
    // CaseRecordComponent,
    // AncComponent,
    // PncComponent,
    // DashboardComponent,
    // WorkareaComponent,
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
    // RadiologistWorklistComponent,
    // OncologistWorklistComponent,
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
    // TcSpecialistWorklistComponent,
    // DoctorTmWorklistWrapperComponent,
    // TmFutureWorklistComponent,
    // SchedulerComponent,
    // TcSpecialistWorklistWrapperComponent,
    // TcSpecialistFutureWorklistComponent,
    // NurseWorklistWrapperComponent,
    // NurseTmWorklistComponent,
    // NurseTmFutureWorklistComponent,
    // CovidDiagnosisComponent,
    // IdrsComponent,
    // PhysicalActivityHistoryComponent,
    // FamilyHistoryNcdscreeningComponent,
    // NcdScreeningDiagnosisComponent,
    // NurseMmuTmReferredWorklistComponent,
    // DiseaseconfirmationComponent,
    // CovidVaccinationStatusComponent,
    // DiabetesScreeningComponent,
    // OralCancerScreeningComponent,
    // ScreeningComponent,
    // CbacComponent,
    // HypertensionScreeningComponent,
    // BreastCancerScreeningComponent,
    // CervicalCancerScreeningComponent,
    // ScreeningCaseSheetComponent,
    // GeneralOralExaminationComponent,
    // FamilyPlanningComponent,
    // DispensationDetailsComponent,
    // FamilyPlanningAndReproductiveComponent,
    // IecAndCounsellingComponent,
    // TreatmentsOnSideEffectsComponent,
    // FamilyPlanningCaseSheetComponent,
    // VisitDeatilsCaseSheetComponent,
    // NeonatalPatientVitalsComponent,
    // NeonatalImmunizationServiceComponent,
    BirthImmunizationHistoryComponent,
    InfantBirthDetailsComponent,
    FormImmunizationHistoryComponent,
    // FollowUpForImmunizationComponent,
    // NeonatalAndInfantServiceCaseSheetComponent,
    ChildAndAdolescentOralVitaminACaseSheetComponent,
    // ChildhoodOralVitaminComponent,
    // ImmunizationServiceComponent,
    // Nurse104RefferedWorklistComponent,
    // Referred104CdssDetailsComponent,
    // Referred104DetailsPopupComponent,
    // Referred104WorkareaComponent,
    // Referred104CdssDetailsComponent,
    // CdssFormComponent,
    // DiseaseFormComponent,
    // Cdss104FormComponent,
    // ViewDiseaseSummaryDetailsComponent,
    // CdssFormResultPopupComponent,
    // Referred104BeneficiaryDetailsComponent
  ],

  providers: [
    NurseService,
    DoctorService,
    MasterdataService,
    // WorkareaCanActivate, LabService,IdrsscoreService,RegistrarService,TestInVitalsService,FamilyTaggingService, NcdScreeningService, CDSSService
  ],
  // entryComponents: [PrintPageSelectComponent, ViewTestReportComponent, BeneficiaryMctsCallHistoryComponent, SchedulerComponent, CdssFormResultPopupComponent,ViewDiseaseSummaryDetailsComponent
  // ]
})
export class NurseDoctorModule {}
