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
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Injectable()
export class RegistrarService {
  consentGranted = '0';
  stateIdFamily: any = null;

  registrationMasterDetails = new BehaviorSubject<any>(null);
  registrationMasterDetails$ = this.registrationMasterDetails.asObservable();

  beneficiaryDetails = new BehaviorSubject<any>(null);
  beneficiaryDetails$ = this.beneficiaryDetails.asObservable();

  beneficiaryEditDetails = new BehaviorSubject<any>(null);
  beneficiaryEditDetails$ = this.beneficiaryEditDetails.asObservable();

  healthId: any = null;
  healthIdOtp = new BehaviorSubject(this.healthId);
  generateHealthIdOtp$ = this.healthIdOtp.asObservable();

  healthIdMobVerificationValue: any = null;
  healthIdMobVerification = new BehaviorSubject(
    this.healthIdMobVerificationValue,
  );
  healthIdMobVerificationCheck$ = this.healthIdMobVerification.asObservable();

  benFamilyDet: any = null;
  benfamilyData = new BehaviorSubject<any>(this.benFamilyDet);
  benFamilyDetails$ = this.benfamilyData.asObservable();

  enablingDispense = false;

  abhaGenerateData: any;
  aadharNumberNew: any;

  abhaDetail: any = null;
  abhaDetailData = new BehaviorSubject<any>(this.abhaDetail);
  abhaDetailDetails$ = this.abhaDetailData.asObservable();

  enableDispenseDetail = new BehaviorSubject<boolean>(this.enablingDispense);
  enablingDispense$ = this.enableDispenseDetail.asObservable();

  public dialogData = new BehaviorSubject<any>(null);
  dialogResult$ = this.dialogData.asObservable();

  changePersonalDetailsData(res: any) {
    this.dialogData.next(res);
  }

  enableDispenseOnFertility(enablingDispense: any) {
    this.enableDispenseDetail.next(enablingDispense);
  }

  getBenFamilyDetails(benFamilyDetails: any) {
    this.benFamilyDet = benFamilyDetails;
    this.benfamilyData.next(benFamilyDetails);
  }

  getabhaDetail(abhaDetailDetails: any) {
    this.abhaDetail = abhaDetailDetails;
    this.abhaDetailData.next(this.abhaDetail);
  }
  // getBenFamilyDetails(value){
  //  this.benFamilyDetails = value;
  // }

  // GenerateOTPEnable: any;
  // GenerateOTP = new BehaviorSubject(this.GenerateOTPEnable);
  // GenerateOTP$ = this.GenerateOTP.asObservable();

  // setGenerateOTPFlag(value) {
  //   this.GenerateOTPEnable = value;

  //   this.GenerateOTP.next(value);

  // }

  constructor(private http: HttpClient) {}

  getRegistrationMaster(servicePointID: any) {
    const tmpSPID = { spID: servicePointID };
    return this.http
      .post(environment.registrarMasterDataUrl, tmpSPID)
      .subscribe((res: any) => {
        console.log(JSON.stringify(res.json().data), 'json data');
        if (res.json().data)
          this.registrationMasterDetails.next(res.json().data);
      });
  }

  getResgistartionMasterData(servicePointID: any) {
    const tmpSPID = { spID: servicePointID };
    return this.http
      .post(environment.registrarMasterDataUrl, tmpSPID)
      .pipe(map((res: any) => res.json()));
  }

  subject = new BehaviorSubject(this.consentGranted);
  consentStatus$ = this.subject.asObservable();

  sendConsentStatus(grantValue: string) {
    this.consentGranted = grantValue;
    this.subject.next(grantValue);
  }

  getPatientDataAsObservable(benRegID: any) {
    return this.http
      .post(environment.getCompleteBeneficiaryDetail, {
        beneficiaryRegID: benRegID,
      })
      .subscribe((res: any) => {
        if (res.json().data) {
          console.log(res.json().data, 'res json data');
          this.beneficiaryDetails.next(res.json().data);
        }
      });
  }

  getPatientData(benRegID: any) {
    return this.http
      .post(environment.getCompleteBeneficiaryDetail, {
        beneficiaryRegID: benRegID,
      })
      .pipe(map((res: any) => res.json().data));
  }

  registerBeneficiary(beneficiary: any) {
    const benData = { benD: beneficiary };
    return this.http
      .post(environment.registerBeneficiaryUrl, benData)
      .pipe(map((res: any) => res.json().data));
  }

  quickSearch(searchTerm: any) {
    return this.http
      .post(environment.quickSearchUrl, searchTerm)
      .pipe(map((res: any) => res.json().data));
  }

  identityQuickSearch(searchTerm: any) {
    return this.http
      .post(environment.identityQuickSearchUrl, searchTerm)
      .pipe(map((res: any) => res.json().data));
  }

  // quickSearchByPhoneNO(searchTerm: any) {
  //   return this.http.get(environment.quickSearchUrl, searchTerm)
  //     .map((res) => res.json().data);
  // }

  clearBeneficiaryEditDetails() {
    this.beneficiaryEditDetails.next(null);
  }

  saveBeneficiaryEditDataASobservable(beneficiary: any) {
    this.beneficiaryEditDetails.next(beneficiary);
  }

  advanceSearch(searchTerms: any) {
    return this.http
      .post(environment.advanceSearchUrl, searchTerms)
      .pipe(map((res: any) => res.json()));
  }

  advanceSearchIdentity(searchTerms: any) {
    return this.http
      .post(environment.advanceSearchIdentityUrl, searchTerms)
      .pipe(map((res: any) => res.json().data));
  }

  externalSearchIdentity(searchTerms: any) {
    return this.http
      .post(environment.externalSearchIdentityUrl, searchTerms)
      .pipe(map((res: any) => res.json().data));
  }

  migrateBenToAmrit(benDetails: any) {
    return this.http
      .post(environment.externalSearchIdentityUrl, benDetails)
      .pipe(map((res: any) => res.json().data));
  }

  loadMasterData(servicePointID: any) {
    const tmpSPID = { spID: servicePointID };
    return this.http
      .post(environment.registrarMasterDataUrl, tmpSPID)
      .pipe(map((res: any) => res.json().data));
  }

  patientRevisit(benRegID: any) {
    return this.http
      .post(environment.patientRevisitSubmitToNurse, benRegID)
      .pipe(map((res: any) => res.json().data));
  }

  identityPatientRevisit(ben: any) {
    return this.http
      .post(environment.identityPatientRevisitSubmitToNurseURL, ben)
      .pipe(map((res: any) => res.json()));
  }

  updatePatientData(beneficiary: any) {
    return this.http
      .post(environment.updateBeneficiaryUrl, beneficiary)
      .pipe(map((res: any) => res.json().data));
  }

  getDistrictBlocks(servicePointID: any) {
    return this.http
      .post(environment.servicePointVillages, {
        servicePointID: servicePointID,
      })
      .pipe(map((res: any) => res.json().data));
  }

  submitBeneficiary(iEMRForm: any) {
    return this.http
      .post(environment.submitBeneficiaryIdentityUrl, iEMRForm)
      .pipe(
        map((res: any) => res.json()),
        shareReplay(1),
      );
  }

  updateBeneficiary(iEMRForm: any) {
    return this.http
      .post(environment.updateBeneficiaryIdentityUrl, iEMRForm)
      .pipe(
        map((res: any) => res.json()),
        shareReplay(1),
      );
  }

  getVillageList(blockId: any) {
    return this.http
      .get(`${environment.getVillageListUrl}${blockId}`)
      .pipe(map((res: any) => res.json()));
  }

  getSubDistrictList(districtId: any) {
    return this.http
      .get(`${environment.getSubDistrictListUrl}${districtId}`)
      .pipe(map((res: any) => res.json()));
  }

  getDistrictList(stateId: any) {
    return this.http
      .get(`${environment.getDistrictListUrl}${stateId}`)
      .pipe(map((res: any) => res.json()));
  }

  generateOTP(mobileNo: any, mode: any) {
    if (mode === 'MOBILE') {
      return this.http
        .post(environment.otpGenerationUrl, mobileNo)
        .pipe(map((res: any) => res.json()));
    } else if (mode === 'AADHAR') {
      return this.http
        .post(environment.otpGenerationWithUIDUrl, mobileNo)
        .pipe(map((res: any) => res.json()));
    }
  }

  generateHealthId(reqObj: any) {
    return this.http
      .post(environment.healthIdGenerationUrl, reqObj)
      .pipe(map((res: any) => res.json()));
  }

  generateHealthIdWithUID(reqObj: any) {
    return this.http
      .post(environment.healthIdGenerationWithUIDUrl, reqObj)
      .pipe(map((res: any) => res.json()));
  }
  verifyOTPForAadharHealthId(reqObj: any) {
    return this.http
      .post(environment.verifyOTPUrl, reqObj)
      .pipe(map((res: any) => res.json()));
  }

  checkAndGenerateMobileOTPHealthId(reqObj: any) {
    return this.http
      .post(environment.checkAndGenerateMobileOTPUrl, reqObj)
      .pipe(map((res: any) => res.json()));
  }

  verifyMobileOTPForAadhar(reqObj: any) {
    return this.http
      .post(environment.verifyMobileOTPUrl, reqObj)
      .pipe(map((res: any) => res.json()));
  }

  mapHealthId(reqObj: any) {
    return this.http
      .post(environment.mapHealthIdUrl, reqObj)
      .pipe(map((res: any) => res.json()));
  }

  getHealthIdDetails(reqObj: any) {
    return this.http
      .post(environment.gethealthIdDetailsUrl, reqObj)
      .pipe(map((res: any) => res.json()));
  }
  generateOtpForMappingCareContext(reqObjForMapping: any) {
    return this.http
      .post(environment.careContextGenerateOtpUrl, reqObjForMapping)
      .pipe(map((res: any) => res.json()));
  }
  verifyOtpForMappingCarecontext(reqObjForVerifyOtp: any) {
    return this.http
      .post(environment.verifyOtpForMappingContextUrl, reqObjForVerifyOtp)
      .pipe(map((res: any) => res.json()));
  }
  generateOTPValidateHealthID(healthID: any) {
    return this.http
      .post(environment.generateOTPForHealthIDValidation, healthID)
      .pipe(map((res: any) => res.json()));
  }
  verifyOTPForHealthIDValidation(reqObjForValidateOTP: any) {
    return this.http
      .post(environment.verifyOTPForHealthIDValidation, reqObjForValidateOTP)
      .pipe(map((res: any) => res.json()));
  }

  generateHealthIDCard(healthID: any) {
    return this.http
      .post(environment.generateOTPForHealthIDCard, healthID)
      .pipe(map((res: any) => res.json()));
  }
  verifyOTPForHealthIDCard(reqObjForValidateOTP: any) {
    return this.http
      .post(environment.verifyOTPAndGenerateHealthCard, reqObjForValidateOTP)
      .pipe(map((res: any) => res.json()));
  }

  passIDsToFetchOtp(id: any) {
    this.healthId = id;
    this.healthIdOtp.next(id);
  }

  setHealthIdMobVerification(obj: any) {
    this.healthIdMobVerificationValue = obj;
    this.healthIdMobVerification.next(this.healthIdMobVerificationValue);
  }

  clearHealthIdMobVerification() {
    this.healthIdMobVerificationValue = null;
    this.healthIdMobVerification.next(this.healthIdMobVerificationValue);
  }

  updateBenDetailsInMongo(amritID: any) {
    return this.http
      .post(environment.updateAmritIDInMongo, amritID)
      .pipe(map((res: any) => res.json()));
  }
}
