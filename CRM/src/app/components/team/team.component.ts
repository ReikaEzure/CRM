import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { Team, TeamLeader } from 'src/app/models/Team';
import { User } from 'src/app/models/User';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {
  status;
  team : any;
  

  teamLeader : TeamLeader = {
    teamLeaderId : 0,
    electedDate : new Date(),
    updatedDate : new Date(),
    team_idTeam : 0
  }

  members : Array<any> = [];
  emails : Array<any> = [];
  
  projectId=0;

  project: Project = {
    idProject: 0,
    title: '',
    description:　'',
    dueDate: new Date,
    createdDate: new Date,
    updatedDate: new Date,
    actualCompletionDate: new Date,
    budget: 0,
    price: 0,
    documentation: '',
    feedback: '',
    quantityOfChange: 0,
    status: 0,
    promoId: 0,
    client_idClient: 0
  };

  constructor(private _service: TeamService, private _userService: UserService, private _projectService: ProjectService, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this._activate.snapshot.params;

    if(params.id){
      
      this.projectId=params.id;
      this._projectService.getProject(this.projectId).subscribe(
        res => {
          this.project = res;
        },
        error => console.log(error)
      );
      this.getTeam(params.id);
    }

    this.status=this._userService.status;
  }

  getTeam(id){
    this._service.getTeam(id).subscribe(
      res => {
        this.team = res;
        this.getMember();
        this.getTeamLeader();
      },
      error => console.log(error)
    );
  }

  getMember(){
    for (let i=0; i<this.team.length; i++){
      let id=this.team[i].user_idUser;
      this._userService.getUserById(id).subscribe(
        res => {
          this.members.push(res);
          console.log(this.members);
          this.getEmail(this.members[i].login_idLogin);
        },
        error => console.log(error)
      );
    }
  }

  getEmail(id){
      this._userService.getEmail(id).subscribe(
        res => {
          console.log(res);
          this.emails.push(res);
        },
        error => console.log(error)
      );
  }

  getTeamLeader(){
    if(this.team[0].idTeam!=null){
      this._service.getTeamLeader(this.team[0].idTeam).subscribe(
        res => {
          this.teamLeader = res;
          console.log("Team Leader is : ");
          console.log(res);
        },
        error => console.log(error)
      );
    }
  }

  

}
