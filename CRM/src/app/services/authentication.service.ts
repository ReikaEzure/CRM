import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Login } from '../models/Login';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  _url = 'http://localhost:3000';

  constructor( private _http: HttpClient ) { }

  login(userData: any){
    return this._http.post(`${this._url}/login`, userData);
  }
}
