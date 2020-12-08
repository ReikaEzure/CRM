import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Office } from '../models/Office';

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  _url = 'http://localhost:3000/office';

  offices: Office[];
  office: Office

  constructor(private _http: HttpClient) { }

  getOffices(){
    return this._http.get(`${this._url}`);
  }

  getOffice(id: number){
    return this._http.get(`${this._url}/${id}`);
  }

  saveOffice(office: Office){
    return this._http.post(`${this._url}`, office);
  }

  deleteOffice(id: number){
    return this._http.delete(`${this._url}/${id}`);
  }

  updateOffice(id: String | number, office: Office): Observable<Office>{
    return this._http.put(`${this._url}/client/${id}`, office);
  }

}
