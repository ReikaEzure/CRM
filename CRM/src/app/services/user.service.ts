import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs';

import { Login } from '../models/Login';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _url = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  loadRoles(){
    return this._http.get(`${this._url}/userRole`);
  }

  registerUser(user: User){
    return this._http.post(`${this._url}/user/register`, user);
  }
  
  getUser(id: number){
    return this._http.get(`${this._url}/user/${id}`);
  }

  

}
