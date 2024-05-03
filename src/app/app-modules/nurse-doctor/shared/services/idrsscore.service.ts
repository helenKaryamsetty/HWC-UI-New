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
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class IdrsscoreService {
  private _listners = new Subject<any>();
  enableDiagnosis: any = null;
  diseaseConfirmation: any = null;
  hyperConfirm: any = null;
  finalHypertension: any = false;
  diabetesPresentInList!: number;
  visualAcuityTestInMMU = 1;
  diabetesNotPresentInMMU = 0;
  rbsResult: any = null;

  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(filterBy: string) {
    this._listners.next(filterBy);
  }

  IRDSscore: any = null;

  IDRSFamilyScore = new BehaviorSubject(this.IRDSscore);
  IDRSFamilyScore$ = this.IDRSFamilyScore.asObservable();
  confirmedValue: any = null;

  confirmed = new BehaviorSubject(this.confirmedValue);
  confirmed$ = this.confirmed.asObservable();
  IRDSscoreWaist: any = null;

  IDRSWaistScore = new BehaviorSubject(this.IRDSscoreWaist);
  IDRSWaistScore$ = this.IDRSWaistScore.asObservable();

  IRDSscorePhysicalActivity: any = null;

  IDRSPhysicalActivityScore = new BehaviorSubject(
    this.IRDSscorePhysicalActivity,
  );
  IDRSPhysicalActivityScore$ = this.IDRSPhysicalActivityScore.asObservable();

  IDRSScoreFlag: any = null;

  IDRSScoreFlagCheck = new BehaviorSubject(this.IDRSScoreFlag);
  IDRSScoreFlagCheck$ = this.IDRSScoreFlagCheck.asObservable();

  IDRSSuspected: any = null;

  IDRSSuspectedFlag = new BehaviorSubject(this.IDRSSuspected);
  IDRSSuspectedFlag$ = this.IDRSSuspectedFlag.asObservable();

  diabetesSelected: any = null;

  diabetesSelectedFlag = new BehaviorSubject(this.diabetesSelected);
  diabetesSelectedFlag$ = this.diabetesSelectedFlag.asObservable();

  VisualAcuityTestMandatory: any = null;

  VisualAcuityTestMandatoryFlag = new BehaviorSubject(
    this.VisualAcuityTestMandatory,
  );
  VisualAcuityTestMandatoryFlag$ =
    this.VisualAcuityTestMandatoryFlag.asObservable();

  systolicBp: any = null;

  systolicBpValue = new BehaviorSubject(this.systolicBp);
  systolicBpValue$ = this.systolicBpValue.asObservable();

  diastolicBp: any = null;

  diastolicBpValue = new BehaviorSubject(this.diastolicBp);
  diastolicBpValue$ = this.diastolicBpValue.asObservable();

  rBSPresent: any = null;

  rBSPresentFlag = new BehaviorSubject(this.rBSPresent);
  rBSPresentFlag$ = this.rBSPresentFlag.asObservable();

  visualAcuityPresent: any = null;

  visualAcuityPresentFlag = new BehaviorSubject(this.visualAcuityPresent);
  visualAcuityPresentFlag$ = this.visualAcuityPresentFlag.asObservable();

  heamoglobinPresent: any = null;

  heamoglobinPresentFlag = new BehaviorSubject(this.heamoglobinPresent);
  heamoglobinPresentFlag$ = this.heamoglobinPresentFlag.asObservable();

  referralSuggested: any = null;

  referralSuggestedFlag = new BehaviorSubject(this.referralSuggested);
  referralSuggestedFlag$ = this.referralSuggestedFlag.asObservable();

  hypertensionSelected: any = null;

  hypertensionSelectedFlag = new BehaviorSubject(this.hypertensionSelected);
  hypertensionSelectedFlag$ = this.hypertensionSelectedFlag.asObservable();

  confirmedDiabeticSelected: any = null;

  confirmedDiabeticSelectedFlag = new BehaviorSubject(
    this.confirmedDiabeticSelected,
  );
  confirmedDiabeticSelectedFlag$ =
    this.confirmedDiabeticSelectedFlag.asObservable();

  visitDiseases = new BehaviorSubject(null);
  visitDiseases$ = this.visitDiseases.asObservable();

  uncheckedDiseases = new BehaviorSubject(null);
  uncheckedDiseases$ = this.uncheckedDiseases.asObservable();

  finalDiagnosisDiseaseconfirm = new BehaviorSubject(this.diseaseConfirmation);
  finalDiagnosisDiseaseconfirm$ =
    this.finalDiagnosisDiseaseconfirm.asObservable();

  finalDiagnosisHypertensionConfirmation = new BehaviorSubject(
    this.hyperConfirm,
  );
  finalDiagnosisHypertensionConfirmation$ =
    this.finalDiagnosisHypertensionConfirmation.asObservable();

  rbsResultsFromVitals = new BehaviorSubject(this.rbsResult);
  rbsResultsFromVitals$ = this.rbsResultsFromVitals.asObservable();

  constructor(private http: HttpClient) {}

  setIDRSFamilyScore(score: any) {
    this.IRDSscore = score;
    console.log('score', score);
    this.IDRSFamilyScore.next(score);
    console.log('score value', this.IDRSFamilyScore);
  }
  setConfirmedDisease(score: any) {
    this.confirmedValue = score;
    console.log('score', score);
    this.confirmed.next(score);
    console.log('score value', this.confirmed);
  }

  clearMessage() {
    this.IDRSFamilyScore.next(0);
    this.IDRSWaistScore.next(0);
    this.IDRSPhysicalActivityScore.next(0);
  }

  setIDRSScoreWaist(score: any) {
    this.IRDSscoreWaist = score;
    console.log('score', score);
    this.IDRSWaistScore.next(score);
    console.log('score value', this.IDRSWaistScore);
  }

  setIRDSscorePhysicalActivity(score: any) {
    this.IRDSscorePhysicalActivity = score;
    console.log('score', score);
    this.IDRSPhysicalActivityScore.next(score);
    console.log('score value', this.IDRSPhysicalActivityScore);
  }
  // to check the idrs score to unable the update button
  setIDRSScoreFlag() {
    this.IDRSScoreFlag = 1;
    this.IDRSScoreFlagCheck.next(1);
  }

  clearScoreFlag() {
    this.IDRSScoreFlag = 0;
    this.IDRSScoreFlagCheck.next(0);
  }
  //to check whether any value is avaiable in array to prompt the msg in error reffer page
  setSuspectedArrayValue() {
    this.IDRSSuspected = 1;
    this.IDRSSuspectedFlag.next(1);
  }
  clearSuspectedArrayFlag() {
    this.IDRSSuspected = 0;
    this.IDRSSuspectedFlag.next(0);
  }
  //if diabetes is avaialble in suspected array
  setDiabetesSelected() {
    this.diabetesSelected = 1;
    this.diabetesSelectedFlag.next(1);
  }
  clearDiabetesSelected() {
    this.diabetesSelected = 0;
    this.diabetesSelectedFlag.next(0);
  }
  //if RBS is greater than 200
  setVisualAcuityTestMandatoryFlag() {
    this.VisualAcuityTestMandatory = 1;
    this.VisualAcuityTestMandatoryFlag.next(1);
  }
  clearVisualAcuityTestMandatoryFlag() {
    this.VisualAcuityTestMandatory = 0;
    this.VisualAcuityTestMandatoryFlag.next(0);
  }
  //change in systolic Bp
  setSystolicBp(value: any) {
    this.systolicBp = value;
    this.systolicBpValue.next(value);
  }
  clearSystolicBp() {
    this.systolicBp = 0;
    this.systolicBpValue.next(0);
  }
  //change in diastolic bp
  setDiastolicBp(value: any) {
    this.diastolicBp = value;
    this.diastolicBpValue.next(value);
  }
  clearDiastolicBp() {
    this.diastolicBp = 0;
    this.diastolicBpValue.next(0);
  }
  // if rbs test is present in master value of lab test
  rBSPresentInMaster() {
    this.rBSPresent = 1;
    this.rBSPresentFlag.next(1);
  }
  //if visual acuity is present in master value of lab test
  visualAcuityPresentInMaster() {
    this.visualAcuityPresent = 1;
    this.visualAcuityPresentFlag.next(1);
  }
  //if visual acuity is present in master value of lab test
  haemoglobinPresentInMaster() {
    this.heamoglobinPresent = 1;
    this.heamoglobinPresentFlag.next(1);
  }
  //Referral Reason suggestion
  setReferralSuggested() {
    this.referralSuggested = 1;
    this.referralSuggestedFlag.next(1);
  }

  clearReferralSuggested() {
    this.referralSuggested = 0;
    this.referralSuggestedFlag.next(0);
  }

  setDiseasesSelected(disease: any) {
    this.visitDiseases.next(disease);
  }
  clearDiseaseSelected() {
    this.visitDiseases.next(null);
  }
  clearUnchecked() {
    this.uncheckedDiseases.next(null);
  }
  setUnchecked(disease: any) {
    this.uncheckedDiseases.next(disease);
  }

  enableDiseaseConfirmationOnCaseRecord = new BehaviorSubject(
    this.enableDiagnosis,
  );
  enableDiseaseConfirmationOnCaseRecord$ =
    this.enableDiseaseConfirmationOnCaseRecord.asObservable();

  enableDiseaseConfirmation(arg0: boolean) {
    this.enableDiagnosis = arg0;
    this.enableDiseaseConfirmationOnCaseRecord.next(arg0);
  }
  setHypertensionSelected() {
    this.hypertensionSelected = 1;
    this.hypertensionSelectedFlag.next(1);
  }
  clearHypertensionSelected() {
    this.hypertensionSelected = 0;
    this.hypertensionSelectedFlag.next(0);
  }

  finalDiagnosisDiabetesConfirm(diabetesConfirmation: any) {
    this.finalDiagnosisDiseaseconfirm.next(diabetesConfirmation);
  }
  finalDiagnosisHypertensionConfirm(hyperConfirmation: any) {
    this.finalHypertension = hyperConfirmation;
    this.finalDiagnosisHypertensionConfirmation.next(hyperConfirmation);
  }

  setConfirmedDiabeticSelected() {
    this.confirmedDiabeticSelected = 1;
    this.confirmedDiabeticSelectedFlag.next(1);
  }
  clearConfirmedDiabeticSelected() {
    this.confirmedDiabeticSelected = 0;
    this.confirmedDiabeticSelectedFlag.next(0);
  }
  rbsTestResultsInVitals(rbsTestResult: any) {
    this.rbsResultsFromVitals.next(rbsTestResult);
  }
}
