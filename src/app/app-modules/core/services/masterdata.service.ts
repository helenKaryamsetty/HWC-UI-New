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
import { BehaviorSubject, Observable, Subject, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class MasterdataService {
  private _listners = new Subject<any>();

  listen(): Observable<any> {
    return this._listners.asObservable();
  }

  filter(filterBy: string) {
    this._listners.next(filterBy);
  }
  contactfilter(filterBy: string) {
    this._listners.next(filterBy);
  }
  /**
   * All master Data Urls
   */
  visitDetailMasterDataUrl = environment.visitDetailMasterDataUrl;
  nurseMasterDataUrl = environment.nurseMasterDataUrl;
  doctorMasterDataUrl = environment.doctorMasterDataUrl;
  snoMedDataURL = environment.snomedCTRecordURL;
  diagnosisSnomedCTRecordUrl = environment.snomedCTRecordListURL;
  diagnosisSnomedCTRecordUrl1 = environment.snomedCTRecordListURL1;
  getCalibrationStrips = environment.getCalibrationStrips;
  vaccinationTypeAndDoseMasterUrl = environment.vaccinationTypeAndDoseMasterUrl;
  previousCovidVaccinationUrl = environment.previousCovidVaccinationUrl;

  /**
   * Visit details master data observable and source
   */
  visitDetailMasterDataSource = new BehaviorSubject<any>(null);
  visitDetailMasterData$ = this.visitDetailMasterDataSource.asObservable();

  /**
   * Nurse master data observable and source
   */
  nurseMasterDataSource = new BehaviorSubject<any>(null);
  nurseMasterData$ = this.nurseMasterDataSource.asObservable();

  /**
   * Doctor master data observable and source
   */
  doctorMasterDataSource = new BehaviorSubject<any>(null);
  doctorMasterData$ = this.doctorMasterDataSource.asObservable();

  constructor(private http: HttpClient) {}

  /**
   * Visit details master data api call
   */
  getVisitDetailMasterData() {
    return this.http
      .get(this.visitDetailMasterDataUrl)
      .subscribe((res: any) => {
        this.visitDetailMasterDataSource.next(res.json().data);
      });
  }

  /**
   * Nurse master data api call
   */
  getNurseMasterData(visitID: string, providerServiceID: any) {
    const gender = localStorage.getItem('beneficiaryGender');
    return (
      this.http
        .get(
          this.nurseMasterDataUrl +
            visitID +
            '/' +
            providerServiceID +
            '/' +
            gender,
        )
        // return this.http.get(this.nurseMasterDataUrl+visitID)
        .subscribe((res: any) => {
          this.nurseMasterDataSource.next(res.json().data);
        })
    );
  }

  /**
   * Doctor master data api call
   */
  getDoctorMasterData(visitID: string, providerServiceID: any) {
    let facilityID = 0;
    if (
      JSON.parse(localStorage.getItem('serviceLineDetails') || '{}')
        .facilityID !== undefined &&
      JSON.parse(localStorage.getItem('serviceLineDetails') || '{}')
        .facilityID !== null
    ) {
      facilityID = JSON.parse(
        localStorage.getItem('serviceLineDetails') || '{}',
      ).facilityID;
    }
    let vanID = 0;
    if (
      JSON.parse(localStorage.getItem('serviceLineDetails') || '{}').vanID !==
        undefined &&
      JSON.parse(localStorage.getItem('serviceLineDetails') || '{}').vanID !==
        null
    ) {
      vanID = JSON.parse(
        localStorage.getItem('serviceLineDetails') || '{}',
      ).vanID;
    }
    const gender = localStorage.getItem('beneficiaryGender');
    console.log('facility', facilityID);

    return (
      this.http
        .get(
          this.doctorMasterDataUrl +
            visitID +
            '/' +
            providerServiceID +
            '/' +
            gender +
            '/' +
            facilityID +
            '/' +
            vanID,
        )
        //return this.http.get(this.doctorMasterDataUrl+visitID+"/"+providerServiceID)
        .subscribe((res: any) => {
          console.log('res.json().data', res.json().data);
          this.doctorMasterDataSource.next(res.json().data);
        })
    );
  }

  getSnomedCTRecord(term: any) {
    return this.http
      .post(this.snoMedDataURL, { term: term })
      .pipe(map((res: any) => res.json()));
  }

  reset() {
    this.visitDetailMasterDataSource.next(null);
    this.nurseMasterDataSource.next(null);
    this.doctorMasterDataSource.next(null);
  }

  getJSON(_jsonURL: any) {
    return this.http
      .get(_jsonURL)
      .pipe(map((response: any) => response.json()));
  }

  searchDiagnosisBasedOnPageNo(
    searchTerm: any,
    pageNo: any,
    diagnosisType?: string,
  ) {
    const body = {
      term: searchTerm,
      pageNo: pageNo,
      type: diagnosisType,
    };
    return this.http
      .post(this.diagnosisSnomedCTRecordUrl, body)
      .pipe(map((res: any) => res.json()));
  }

  searchDiagnosisBasedOnPageNo1(searchTerm: any, pageNo: any) {
    const body = {
      term: searchTerm,
      pageNo: pageNo,
    };
    return this.http
      .post(this.diagnosisSnomedCTRecordUrl1, body)
      .pipe(map((res: any) => res.json()));
  }

  fetchCalibrationStrips(providerServiceID: any, pageNo: any) {
    const body = {
      providerServiceMapID: providerServiceID,
      pageNo: pageNo,
    };
    return this.http
      .post(this.getCalibrationStrips, body)
      .pipe(map((res: any) => res.json()));
  }

  getVaccinationTypeAndDoseMaster() {
    return this.http
      .get(this.vaccinationTypeAndDoseMasterUrl)
      .pipe(map((res: any) => res.json()));
  }

  getPreviousCovidVaccinationDetails(beneficiaryRegID: any) {
    const reqObj = {
      beneficiaryRegID: beneficiaryRegID,
    };
    return this.http
      .post(this.previousCovidVaccinationUrl, reqObj)
      .pipe(map((res: any) => res.json()));
  }
  /* Neonatal immunization service masters*/
  getVaccineList(currentImmunizationServiceID: any) {
    const visitCategoryID = localStorage.getItem('visitCategoryId');
    return this.http
      .get(
        environment.vaccineListUrl +
          currentImmunizationServiceID +
          '/' +
          visitCategoryID,
      )
      .pipe(map((res: any) => res.json()));
  }
}
