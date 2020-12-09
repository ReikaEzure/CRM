import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs';

import { Login } from '../models/Login';
import { User, UserRole, UserStatus } from '../models/User';
import { Employee } from '../models/Employee';
import { Client } from '../models/Client';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _url = 'http://localhost:3000';

  loggedInUser: User;
  roles: any; //UserRole[]
  status: any; //UserStatus[]

  employee: Employee;
  client: Client;

  constructor(private _http: HttpClient) { }

  loadRoles(){
    return this._http.get(`${this._url}/userRole`);
  }

  loadUserStatus(){
    return this._http.get(`${this._url}/userStatus`);
  }

  registerUser(user: User){
    return this._http.post(`${this._url}/user/register`, user);
  }
  
  getUser(id: number){
    return this._http.get(`${this._url}/user/${id}`);
  }

  getUserById(id){
    return this._http.get(`${this._url}/user/byId/${id}`);
  }

  getUserByOffice(id){
    return this._http.get(`${this._url}/user/byOffice/${id}`);
  }

  getUserByClient(id){
    return this._http.get(`${this._url}/user/byClient/${id}`);
  }

  getEmail(id){
    return this._http.get(`${this._url}/login/getEmail/${id}`);
  }
  
  updateUser(id: String | number, user: User): Observable<User>{
    return this._http.put(`${this._url}/user/${id}`, user);
  }

  changeAvatar(id: String | number, user: User): Observable<User>{
    return this._http.put(`${this._url}/user/changeAvatar/${id}`, user);
  }

  createEmployee(emp: Employee){
    return this._http.post(`${this._url}/user/employee`, emp);
  }

  updateEmployee(id: String | number, emp: Employee): Observable<Employee>{
    return this._http.put(`${this._url}/user/employee/${id}`, emp);
  }

  createClient(cli: Client){
    return this._http.post(`${this._url}/user/client`, cli);
  }

  updateClient(id: String | number, cli: Client): Observable<Client>{
    return this._http.put(`${this._url}/user/client/${id}`, cli);
  }

  sendmail(data) {
    return this._http.post(`${this._url}/sendmail`, data);
  }

  login(id: number){
    return this._http.get(`${this._url}/user/login/${id}`);
  }

  logout(id: number){
    return this._http.get(`${this._url}/user/logout/${id}`);
  }
  

}
