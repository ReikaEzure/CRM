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
  clientCompany : ClientCompany;
  phone : any; //Phone[];
  addr : Address;
  sns : any; //Sns[];

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

  deleteClient(id: number){
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

  getAddress(id: number){
    return this._http.get(`${this._url}/address/${id}`);
  }

  updateAddress(id: String | number, address: Address): Observable<Address>{
    return this._http.put(`${this._url}/address/${id}`, address);
  }

  savePhone(phone: Phone){
    return this._http.post(`${this._url}/phone`, phone);
  }

  getPhone(id: number){
    return this._http.get(`${this._url}/phone/${id}`);
  }

  deletePhone(id: number){
    return this._http.delete(`${this._url}/phone/${id}`);
  }

  saveSns(sns: Sns){
    return this._http.post(`${this._url}/sns`, sns);
  }

  getSns(id: number){
    return this._http.get(`${this._url}/sns/${id}`);
  }

  deleteSns(id: number){
    return this._http.delete(`${this._url}/sns/${id}`);
  }
}
