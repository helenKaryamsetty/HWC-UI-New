import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class IotService {
  baseurl = environment.ioturl;
  deviceStatusurl = environment.deviceStatusurl;
  deviceBluetoothurl = environment.deviceBluetoothurl;
  connectdeviceBluetoothurl = environment.connectdeviceBluetoothurl;
  disconnectdeviceBluetoothurl = environment.deviceDisconnectUrl;
  constructor(private http: HttpClient) {}
  disconnect = false;

  disconnectValue = new BehaviorSubject(this.disconnect);
  disconnectValue$ = this.disconnectValue.asObservable();
  setBluetoothConnected(val: any) {
    this.disconnect = val;
    this.disconnectValue.next(val);
  }
  startAPI(input: any) {
    return this.http.post(this.baseurl + input, null);
  }

  statusAPI(input: any) {
    return this.http.get(this.baseurl + input);
  }

  endAPI(input: any) {
    return this.http.put(this.baseurl + input, null);
  }
  endCalibrationAPI(input: any) {
    const content = ['application/json'];
    const headerDict = {
      'Content-Type': content,
    };
    return this.http.put(this.baseurl + input, { headers: headerDict });
  }

  getDeviceStatus() {
    return this.http.get(this.deviceStatusurl);
  }

  getBluetoothDevice() {
    return this.http.get(this.deviceBluetoothurl);
  }

  connectBluetoothDevice(str: string) {
    return this.http.post(this.connectdeviceBluetoothurl + '/' + str, {});
  }
  disconnectBluetoothDevice() {
    return this.http.post(this.disconnectdeviceBluetoothurl, null);
  }
  pairExternalDevice(url: string) {
    return this.http.post(this.baseurl + url, {});
  }
}
