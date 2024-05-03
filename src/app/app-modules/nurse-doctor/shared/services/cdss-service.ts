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
import { environment } from 'src/environments/environment';

@Injectable()
export class CDSSService {
  constructor(private http: HttpClient) {}

  getCdssQuestions(reqObject: any) {
    return this.http.post(environment.getCdssQuestionsUrl, reqObject);
  }

  getCdssAnswers(reqObject: any) {
    return this.http.post(environment.getCdssAnswersUrl, reqObject);
  }

  getSnomedCtRecord(reqObject: any) {
    return this.http.post(environment.getSnomedCtRecordUrl, reqObject);
  }

  getcheifComplaintSymptoms(reqObject: any) {
    return this.http.post(environment.getCheifComplaintsSymptomsUrl, reqObject);
  }

  getActionMaster() {
    return this.http.get(environment.getActionMasterUrl);
  }

  saveCheifComplaints(reqObject: any) {
    return this.http.post(environment.closeVisitSaveComplaintsUrl, reqObject);
  }
  getDiseaseData(diseaseObj: any) {
    return this.http.post(environment.getDiseaseDataUrls, diseaseObj);
  }
  getDiseaseName() {
    return this.http.post(environment.getDiseaseNamesUrls, {});
  }
}
