import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { PdfService } from 'src/app/services/pdf.service';
import { UserService } from 'src/app/services/user.service';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit { 
  clientView=false;
  projects: any;

  inProgress: Project[]=[];
  onHold: Project[]=[];
  done: Project[]=[];
  cancelled: Project[]=[];
  openPro: Project[]=[];

  constructor(private _service: ProjectService, private _userService: UserService, private _pdfService: PdfService, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    if(this._userService.loggedInUser.role==5){
      this.clientView=true;
    }

    this.getProjects();
    this._service.project=null;

    //if id has passed from url, get projects list of certain client
    const params = this._activate.snapshot.params;
    if(params.id){
      this._service.getProjectByClient(params.id).subscribe(
        res => {
          this.projects = res;
          console.log(res);
        },
        error => console.log(error)
      );
    }

    if(this._userService.clientView){
      
    }
  }

  //get projects list
  getProjects(){
    this._service.getProjects().subscribe(
      res => {
        this.projects = res;
        this._service.projectStatus=res;
        console.log(res);
        this.divideProject();
      },
      error => console.log(error)
    );
  }

  //divide projects to category
  divideProject(){
    for(let i =0; i<this.projects.length; i++){
      switch(this.projects[i].status){
        case 1://open
          this.openPro.push(this.projects[i]);
          break;
        case 2:
          if(this.projects[i].actualCompletionDate!=null){
            //in progress
            this.inProgress.push(this.projects[i]);
          }else{
            //done
            this.done.push(this.projects[i]);
          }
          break;
          
        case 3: //on hold
          this.onHold.push(this.projects[i]);
          break;
        case 4: // cancelled
          this.cancelled.push(this.projects[i]);
        break;
        default: 
          this.openPro.push(this.projects[i]);
        break;
      }
    }
  }

  // filter projects depends on tab that has pressed by user
  getInProgress(){
    this.projects=this.inProgress;
  }

  getOpen(){
    this.projects=this.openPro;
  }

  getOnHold(){
    this.projects=this.onHold;
  }

  getDone(){
    this.projects=this.done;
  }

  getCancelled(){
    this.projects=this.cancelled;
  }


  deleteProjects(id: String){
    console.log(id);
    this._service.deleteProject(id).subscribe(
      res => {
        console.log(res);
        this.getProjects();
      },
      err => {console.log(err.message)}
    );
  }
  setHideMenu(){
    if(this.clientView){
      return 'hideMenu';
    }
    return 'showMenu';
  }
}
