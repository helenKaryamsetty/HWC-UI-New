import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class CommonService {
  // headers = new Headers( { 'Content-Type': 'application/json' } );

  commonServices = new Subject<any>();
  commonServices$ = this.commonServices.asObservable();

  getStatesURL = environment.getStatesURL;
  getDistrictsURL = environment.getDistrictsURL;

  constructor(private http: HttpClient) {}

  // getStates( countryId: number ) {
  //    return this.http.get(this.getStatesURL+countryId, this.options).map(res => res.json().data);
  // }

  getStates(countryId: number) {
    return this.http.get(this.getStatesURL);
    //.map((res: any) => res.json().data);
  }

  getDistricts(stateId: number) {
    return this.http.get(this.getDistrictsURL + stateId);
    //.map((res: any) => res.json().data);
  }
}
