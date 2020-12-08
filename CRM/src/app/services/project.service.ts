import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  _url = 'http://localhost:3000';

  projectStatus: any;
  projects : Project[];
  project: Project;

  constructor(private _http: HttpClient) { }

  getProjects(){
    return this._http.get(`${this._url}/project`);
  }

  getProject(id: number){
    return this._http.get(`${this._url}/project/${id}`);
  }

  saveProject(project: Project){
    return this._http.post(`${this._url}/project`, project);
  }

  deleteProject(id: String | number){
    return this._http.delete(`${this._url}/project/${id}`);
  }

  updateProject(id: String | number, project: Project): Observable<Project>{
    return this._http.put(`${this._url}/project/${id}`, project);
  }

  modifyPromotion(id: String | number, data: any): Observable<any>{
    return this._http.put(`${this._url}/project/promotion/${id}`, data);
  }

  loadProjectStatus(){
    return this._http.get(`${this._url}/projectStatus`);
  }
}
