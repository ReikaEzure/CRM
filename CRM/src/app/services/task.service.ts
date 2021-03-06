import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Task } from '../models/Task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  _url = 'http://localhost:3000';

  taskStatus: any;
  tasks: Task[];
  task: Task;

  constructor(private _http: HttpClient) { }

  getTasks(id: String | number){
    return this._http.get(`${this._url}/task/${id}`);
  }

  getTask(id: String | number){
    return this._http.get(`${this._url}/task/info/${id}`);
  }

  saveTask(task: Task){
    return this._http.post(`${this._url}/task`, task);
  }

  deleteTask(id: String | number){
    return this._http.delete(`${this._url}/task/${id}`);
  }

  updateTask(id: String | number, task: Task): Observable<Task>{
    return this._http.put(`${this._url}/task/${id}`, task);
  }
  
  changeStatus(data: any){
    return this._http.post(`${this._url}/task/changeStatus`, data);
  }
  loadTaskStatus(){
    return this._http.get(`${this._url}/taskStatus`);
  }
  
}
