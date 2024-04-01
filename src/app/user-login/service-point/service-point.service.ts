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
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicePointService {
  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  // getServicePoints(userId: string, serviceProviderId: string) {
  //   return this.http.post(environment.servicePointUrl, { userID: userId, providerServiceMapID: serviceProviderId })
  //     .pipe(map((res: any) => console.log(res)),
  //     catchError((err: string) => {
  //       return throwError(err);
  //     }))
  //     ;
  // }

  getServicePoints(userId: string, serviceProviderId: string) {
    return this.http
      .post(environment.servicePointUrl, {
        userID: userId,
        providerServiceMapID: serviceProviderId,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        }),
        catchError((err: any) => {
          console.error('Error:', err);
          return throwError(err);
        }),
      );
  }

  getMMUDemographics() {
    const serviceLineDetails: any = localStorage.getItem('serviceLineDetails');
    const vanID = JSON.parse(serviceLineDetails).vanID;
    const spPSMID = localStorage.getItem('providerServiceID');

    return this.http
      .post(environment.demographicsCurrentMasterUrl, {
        vanID: vanID,
        spPSMID: spPSMID,
      })
      .pipe(
        map((res: any) => {
          console.log(res);
          return res;
        }),

        catchError((err: string) => {
          return throwError(err);
        }),
      );
  }

  getSwymedMailLogin() {
    const userID = localStorage.getItem('userID');
    return this.http.get(environment.getSwymedMailLoginUrl + userID);
  }
  getCdssAdminDetails(providerServiceMapID: string | null) {
    return (
      this.http
        .get(environment.getAdminCdssStatus + '/' + providerServiceMapID)
        // .get(environment.getSwymedMailLoginUrl + providerServiceMapID) // this is just for demo. ** need to change this with above
        .pipe(map((res: any) => res))
    );
  }
}
