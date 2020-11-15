import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Appointment } from '../models/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  _url = 'http://localhost:3000';

  appointments : Appointment[];

  constructor(private _http: HttpClient) { }

  getAppointments(){
    return this._http.get(`${this._url}/appointment`);
  }

  getAppointment(id: String){
    return this._http.get(`${this._url}/appointment/${id}`);
  }

  saveAppointment(appointment: Appointment){
    return this._http.post(`${this._url}/appointment`, appointment);
  }

  deleteAppointment(id: String){
    return this._http.delete(`${this._url}/appointment/${id}`);
  }

  updateAppointment(id: String | number, appointment: Appointment): Observable<Appointment>{
    return this._http.put(`${this._url}/appointment/${id}`, appointment);
  }
}
