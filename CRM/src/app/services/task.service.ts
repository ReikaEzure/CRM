import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  _url = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  getTasks(){
    return this._http.get(`${this._url}/task`);
  }

  getTask(id: String){
    return this._http.get(`${this._url}/task/${id}`);
  }

  saveTask(task: Task){
    return this._http.post(`${this._url}/task`, task);
  }

  deleteTask(id: String){
    return this._http.delete(`${this._url}/task/${id}`);
  }

  updateTask(id: String | number, task: Task): Observable<Task>{
    return this._http.put(`${this._url}/task/${id}`, task);
  }
  
}
