import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  isLoggedIn: boolean = false;
  loggedInUser: Login;

  _url = 'http://localhost:3000/login';

  constructor( private _http: HttpClient ) { }

  login(userData: any){
    return this._http.post(`${this._url}`, userData);
  }

  registerLogin(login: Login){
    return this._http.post(`${this._url}/register`, login);
  }
}
