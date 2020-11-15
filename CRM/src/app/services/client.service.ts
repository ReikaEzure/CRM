import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { ClientCompany, Address, Phone, Sns } from '../models/ClientCompany';
import { Observable } from 'rxjs';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  _url = 'http://localhost:3000';

  clientCompanies : ClientCompany[];

  constructor(private _http: HttpClient) { }

  getClients(){
    return this._http.get(`${this._url}/client`);
  }

  getClient(id: number){
    return this._http.get(`${this._url}/client/${id}`);
  }

  saveClient(client: ClientCompany){
    return this._http.post(`${this._url}/client`, client);
  }

  deleteClient(id: String){
    return this._http.delete(`${this._url}/client/${id}`);
  }

  updateClient(id: String | number, client: ClientCompany): Observable<ClientCompany>{
    return this._http.put(`${this._url}/client/${id}`, client);
  }

  loadClientTypes(){
    return this._http.get(`${this._url}/clientType`);
  }

  saveAddress(address: Address){
    return this._http.post(`${this._url}/address`, address);
  }

  savePhone(phone: Phone){
    return this._http.post(`${this._url}/phone`, phone);
  }

  saveSns(sns: Sns){
    return this._http.post(`${this._url}/sns`, sns);
  }
}
