import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

import { Team, TeamLeader } from '../models/Team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  _url = 'http://localhost:3000';

  constructor(private _http: HttpClient) { }

  getTeams(){
    return this._http.get(`${this._url}/team`);
  }

  getTeam(id: String){
    return this._http.get(`${this._url}/team/${id}`);
  }

  saveTeam(team: Team){
    return this._http.post(`${this._url}/team`, team);
  }

  deleteTeam(id: String){
    return this._http.delete(`${this._url}/team/${id}`);
  }

  updateTeam(id: String | number, team: Team): Observable<Team>{
    return this._http.put(`${this._url}/team/${id}`, team);
  }

  getTeamLeaders(){
    return this._http.get(`${this._url}/teamLeader`);
  }

  getTeamLeader(id: String){
    return this._http.get(`${this._url}/teamLeader/${id}`);
  }

  saveTeamLeader(teamLeader: TeamLeader){
    return this._http.post(`${this._url}/teamLeader`, teamLeader);
  }

  deleteTeamLeader(id: String){
    return this._http.delete(`${this._url}/teamLeader/${id}`);
  }

  updateTeamLeader(id: String | number, teamLeader: TeamLeader): Observable<TeamLeader>{
    return this._http.put(`${this._url}/teamLeader/${id}`, teamLeader);
  }
  
}
