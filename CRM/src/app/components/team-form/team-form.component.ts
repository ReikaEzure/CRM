import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/User';
import { OfficeService } from 'src/app/services/office.service';
import { UserService } from 'src/app/services/user.service';
import { Project } from 'src/app/models/Project';
import { ProjectService } from 'src/app/services/project.service';
import { TeamService } from 'src/app/services/team.service';
import { Team, TeamLeader } from 'src/app/models/Team';

@Component({
  selector: 'app-team-form',
  templateUrl: './team-form.component.html',
  styleUrls: ['./team-form.component.scss']
})
export class TeamFormComponent implements OnInit {
  contacts: any = [];
  status: any;
  projectId=0;
  project: Project;

  teamMemberForm : FormGroup;

  team: Team={
    idTeam: 0,
    project_idProject: 0,
    user_IdUser: 0
  }

  isChecked=false;

  constructor(private _fb: FormBuilder, private _teamService: TeamService, private _userService: UserService, private _projectService: ProjectService, private _officeService: OfficeService, private _activate: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.loadUserStatus();

      console.log(this._userService.loggedInUser.idUser);
      this._officeService.getOffice(this._userService.loggedInUser.idUser).subscribe(
        res => {
          this._officeService.office=res;
          console.log(this._officeService.office);
          this.getContactsfromOffice(this._officeService.office.idOffice);
          console.log(res);
        },
        error => console.log(error)
      );

      //get project by idProject which has passed from url
      const params = this._activate.snapshot.params;
      if(params.id){
        this.projectId=params.id;
        this._projectService.getProject(this.projectId).subscribe(
          res => {
            this.project = res;
          },
          error => console.log(error)
        );
      }

      this.teamMemberForm=this._fb.group({
        member: ['', Validators.required],
        leader: [false]
      });

      this.teamMemberForm.get('leader').valueChanges.subscribe(checkedValue => {
        if(checkedValue){
          this.isChecked=true;
        }else{
          this.isChecked=false
        }
        console.log(this.isChecked);
      });
  }

  get member(){
    return this.teamMemberForm.get('member');
  }

  get leader(){
    return this.teamMemberForm.get('leader');
  }

  //get contacts list of all the employees that works in same office
  getContactsfromOffice(id){
    this._userService.getUserByOffice(id).subscribe(
      res => {
        this.contacts = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  //load user status
  loadUserStatus(){
    this._userService.loadUserStatus().subscribe(
      res => {
        this.status = res;
        this._userService.status = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  changeMember(e) {
    this.member.setValue(e.target.value, {
      onlySelf: true
    })
  }

  isTeamLeader(){
    if(this.isChecked){
      let teamleader: TeamLeader={
        teamLeaderId: this.member.value,
        team_idTeam: this.projectId
      }
      delete teamleader.electedDate;
      delete teamleader.updatedDate;

      this._teamService.saveTeamLeader(teamleader).subscribe(
        res =>{
          alert('New team leader has successfully added');
          this._router.navigate(['/project/']);
        },
        err => {console.log(err);}
      );
    }else{
      alert('New team member has successfully added');
      this._router.navigate(['/project/']);
    }
    
  }

  onSubmit(){ 
    this.team.idTeam=this.projectId;
    this.team.project_idProject=this.projectId;
    this.team.user_IdUser=this.member.value;

    this._teamService.saveTeam(this.team).subscribe(
      res =>{
        console.log(res);
        this.isTeamLeader();
      },
      err => {console.log(err);}
    );


    
    
  }
}
