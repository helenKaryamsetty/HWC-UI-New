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
import { nextTick } from 'process';
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
  enableDiseaseConfirm: string | any = '';

  isDiabetesConfirmed: boolean | any = null;
  isHypertensionConfirmed: boolean | any = null;
  isOralConfirmed: boolean | any = null;
  isCervicalConfirmed: boolean | any = null;
  isBreastConfirmed: boolean | any = null;
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

  enableDiseaseConfirmForm = new BehaviorSubject<any>(
    this.enableDiseaseConfirm,
  );
  enableDiseaseConfirmForm$ = this.enableDiseaseConfirmForm.asObservable();

  confirmedDiseasesLists = [];
  confirmedDiseasesListCheck = new BehaviorSubject<any>(
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
  diabetesSuspectStatus(diabetesStatus: boolean) {
    this.diabetesScreeningStatus.next(diabetesStatus);
  }
  hypertensionSuspectStatus(hypertensionStatus: boolean) {
    this.hypertensionScreeningStatus.next(hypertensionStatus);
  }
  oralSuspectStatus(suspectStatus: boolean) {
    this.oralScreeningStatus.next(suspectStatus);
  }
  breastSuspectStatus(breastStatus: boolean) {
    this.breastScreeningStatus.next(breastStatus);
  }
  cervicalSuspectStatus(cervicalStatus: boolean) {
    this.cervicalScreeningStatus.next(cervicalStatus);
  }

  /* Enabling History Screen*/
  enableHistoryScreenOnIdrs(enablingIdrs: boolean) {
    this.enableIdrsForm.next(enablingIdrs);
  }

  /* Enabling Disease confirmed Screen*/
  enableDiseaseConfirmationScreen(enablingDisease: string) {
    this.enableDiseaseConfirmForm.next(enablingDisease);
  }

  clearDiseaseConfirmationScreenFlag() {
    this.enableDiseaseConfirm = null;
    this.enableDiseaseConfirmForm.next(null);
  }

  /* Setting confirmed diseases*/
  setConfirmedDiseasesForScreening(confirmedDiseasesList: any[]) {
    this.confirmedDiseasesListCheck.next(confirmedDiseasesList);
  }

  clearConfirmedDiseasesForScreening() {
    this.confirmedDiseasesLists = [];
    this.confirmedDiseasesListCheck.next(null);
  }

  /* Hiding Vitals form*/
  disableViatlsFormOnCbac(enablingCbac: boolean) {
    this.checkIfCbacForm.next(enablingCbac);
  }

  /* Enable history form after adding control to the medical form */
  enableHistoryFormAfterInitialization(historyFormControlAdded: boolean) {
    this.enableHistoryFormafterFormInit.next(historyFormControlAdded);
  }

  checkIfCbac(cbacIdrsValue: boolean) {
    this.checkIfCbacForm.next(cbacIdrsValue);
  }

  screeningValueChanged(valueChanged: boolean) {
    this.valueChangedForNCD.next(valueChanged);
  }

  setScreeningDataFetch(screeningData: boolean) {
    this.fetchScreeningData.next(screeningData);
  }
}
