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
  clientView=false;

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
    promotion_idPromotion: 0,
    client_idClient: 0
  };

  constructor(private _service: TeamService, private _userService: UserService, private _projectService: ProjectService, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    if(this._userService.loggedInUser.role==5){
      this.clientView=true;
    }
    const params = this._activate.snapshot.params;

    //get project by idProject which has passed from url
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

    //get status of team member
    this.status=this._userService.status;
  }

  //get teams
  //here we only get userid of team member
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

  //get members detail
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

  //get email of each team member
  getEmail(id){
      this._userService.getEmail(id).subscribe(
        res => {
          console.log(res);
          this.emails.push(res);
        },
        error => console.log(error)
      );
  }

  //get team leader
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

  
  setHideMenu(){
    if(this.clientView){
      return 'hideMenu';
    }
    return 'showMenu';
  }
}
