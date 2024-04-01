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
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class NcdScreeningService {
  currentLanguageSet: any;
  suspectStatus = false;
  breastStatus = false;
  cervicalStatus = false;
  diabetesStatus = false;
  hypertensionStatus = false;
  enablingIdrs = false;
  enablingCbac = false;
  historyFormControlAdded = false;
  valueChanged = false;
  /// Change this variable according to the nurse response of cbac screening
  fetchCBACResponseFromNurse = false;
  enableDiseaseConfirm = false;

  isDiabetesConfirmed = false;
  isHypertensionConfirmed = false;
  isOralConfirmed = false;
  isCervicalConfirmed = false;
  isBreastConfirmed = false;
  diabetesScreeningValidationOnSave = false;
  hypertensionScreeningValidationOnSave = false;
  breastScreeningValidationOnSave = false;
  cervicalScreeningValidationOnSave = false;
  oralScreeningValidationOnSave = false;

  diabetesScreeningStatus = new BehaviorSubject<boolean>(this.diabetesStatus);
  diabetesStatus$ = this.diabetesScreeningStatus.asObservable();

  hypertensionScreeningStatus = new BehaviorSubject<boolean>(
    this.hypertensionStatus,
  );
  hypertensionStatus$ = this.hypertensionScreeningStatus.asObservable();

  oralScreeningStatus = new BehaviorSubject<boolean>(this.suspectStatus);
  oralStatus$ = this.oralScreeningStatus.asObservable();

  breastScreeningStatus = new BehaviorSubject<boolean>(this.breastStatus);
  breastStatus$ = this.breastScreeningStatus.asObservable();

  cervicalScreeningStatus = new BehaviorSubject<boolean>(this.cervicalStatus);
  cervicalStatus$ = this.cervicalScreeningStatus.asObservable();

  enableIdrsForm = new BehaviorSubject<boolean>(this.enablingIdrs);
  enablingIdrs$ = this.enableIdrsForm.asObservable();

  valueChangedForNCD = new BehaviorSubject<boolean>(this.valueChanged);
  valueChangedForNCD$ = this.valueChangedForNCD.asObservable();

  enableDiseaseConfirmForm = new BehaviorSubject<boolean>(
    this.enableDiseaseConfirm,
  );
  enableDiseaseConfirmForm$ = this.enableDiseaseConfirmForm.asObservable();

  confirmedDiseasesLists: any = [];
  confirmedDiseasesListCheck = new BehaviorSubject<boolean>(
    this.confirmedDiseasesLists,
  );
  confirmedDiseasesListCheck$ = this.confirmedDiseasesListCheck.asObservable();

  checkIfCbacForm = new BehaviorSubject<boolean>(this.enablingCbac);
  enablingScreeningDiseases$ = this.checkIfCbacForm.asObservable();

  enableHistoryFormafterFormInit = new BehaviorSubject<boolean>(
    this.historyFormControlAdded,
  );
  enableHistoryFormafterFormInit$ =
    this.enableHistoryFormafterFormInit.asObservable();

  screeningData = false;
  fetchScreeningData = new BehaviorSubject<boolean>(this.screeningData);
  fetchScreeningDataCheck$ = this.fetchScreeningData.asObservable();

  constructor() {}
  diabetesSuspectStatus(diabetesStatus: any) {
    this.diabetesScreeningStatus.next(diabetesStatus);
  }
  hypertensionSuspectStatus(hypertensionStatus: any) {
    this.hypertensionScreeningStatus.next(hypertensionStatus);
  }
  oralSuspectStatus(suspectStatus: any) {
    this.oralScreeningStatus.next(suspectStatus);
  }
  breastSuspectStatus(breastStatus: any) {
    this.breastScreeningStatus.next(breastStatus);
  }
  cervicalSuspectStatus(cervicalStatus: any) {
    this.cervicalScreeningStatus.next(cervicalStatus);
  }

  /* Enabling History Screen*/
  enableHistoryScreenOnIdrs(enablingIdrs: any) {
    this.enableIdrsForm.next(enablingIdrs);
  }

  /* Enabling Disease confirmed Screen*/
  enableDiseaseConfirmationScreen(enablingDisease: any) {
    this.enableDiseaseConfirmForm.next(enablingDisease);
  }

  clearDiseaseConfirmationScreenFlag() {
    this.enableDiseaseConfirm = false;
    this.enableDiseaseConfirmForm.next(false);
  }

  /* Setting confirmed diseases*/
  setConfirmedDiseasesForScreening(confirmedDiseasesList: any) {
    this.confirmedDiseasesListCheck.next(confirmedDiseasesList);
  }

  clearConfirmedDiseasesForScreening() {
    this.confirmedDiseasesLists = [];
    this.confirmedDiseasesListCheck.next(false);
  }

  /* Hiding Vitals form*/
  disableViatlsFormOnCbac(enablingCbac: any) {
    this.checkIfCbacForm.next(enablingCbac);
  }

  /* Enable history form after adding control to the medical form */
  enableHistoryFormAfterInitialization(historyFormControlAdded: any) {
    this.enableHistoryFormafterFormInit.next(historyFormControlAdded);
  }

  checkIfCbac(cbacIdrsValue: any) {
    this.checkIfCbacForm.next(cbacIdrsValue);
  }

  screeningValueChanged(valueChanged: any) {
    this.valueChangedForNCD.next(valueChanged);
  }

  setScreeningDataFetch(screeningData: any) {
    this.fetchScreeningData.next(screeningData);
  }
}
