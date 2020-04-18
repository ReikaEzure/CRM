import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  _url = 'http://localhost:3000/authentication';

  constructor( private _http: HttpClient ) { }

  login(userData: Login){
    return this._http.post(`${this._url}/login`, userData);
  }
}
