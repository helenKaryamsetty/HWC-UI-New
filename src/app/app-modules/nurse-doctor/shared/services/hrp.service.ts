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
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HrpService {
  comorbidityConcurrentCondition: any = [];
  heightValue: any = null;
  bloodGroup: any = null;
  hemoglobin: any = null;
  pastIllness: any = [];
  pastObstetric: any = [];
  checkHrpStatus = false;

  constructor(private http: HttpClient) {}

  getHRPStatus(reqObj: any) {
    console.log('req', reqObj);
    return this.http.post(environment.getHrpStatusURL, reqObj);
  }

  getHrpForFollowUP(reqObj: any) {
    return this.http.post(environment.getHrpFollowUpURL, reqObj);
  }

  setcomorbidityConcurrentConditions(value: any) {
    this.comorbidityConcurrentCondition = value;
  }

  setPastIllness(value: any) {
    this.pastIllness = value;
  }
  setHeightFromVitals(value: any) {
    this.heightValue = value;
  }

  setBloodGroup(value: any) {
    this.bloodGroup = value;
  }

  setPastObstetric(value: any) {
    this.pastObstetric = value;
  }

  setHemoglobinValue(value: any) {
    this.hemoglobin = value;
  }
}
