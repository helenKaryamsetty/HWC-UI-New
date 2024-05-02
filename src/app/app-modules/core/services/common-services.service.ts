import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommonService {
  commonServices = new Subject<any>();
  commonServices$ = this.commonServices.asObservable();

  getStatesURL = environment.getStatesURL;
  getDistrictsURL = environment.getDistrictsURL;

  constructor(private http: HttpClient) {}

  getStates(countryId: number) {
    return this.http.get(this.getStatesURL);
  }

  getDistricts(stateId: number) {
    return this.http.get(this.getDistrictsURL + stateId);
  }
}
