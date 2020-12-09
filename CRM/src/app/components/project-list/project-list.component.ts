import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from 'src/app/models/Project';
import { PdfService } from 'src/app/services/pdf.service';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  
  projects: any;

  inProgress: Project[]=[];
  onHold: Project[]=[];
  done: Project[]=[];
  cancelled: Project[]=[];
  openPro: Project[]=[];

  constructor(private _service: ProjectService, private _pdfService: PdfService, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProjects();
    this._service.project=null;

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
  }

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

  divideProject(){
    for(let i =0; i<this.projects.length; i++){
      switch(this.projects[i].status){
        case 1:
          if(this.projects[i].actualCompletionDate!=null){
            this.inProgress.push(this.projects[i]);
          }else{
            this.done.push(this.projects[i]);
          }
          break;
        case 2:
          this.openPro.push(this.projects[i]);
          break;
        case 3: 
          this.onHold.push(this.projects[i]);
          break;
        case 4: 
          this.cancelled.push(this.projects[i]);
        break;
        default: 
          this.openPro.push(this.projects[i]);
        break;
      }
    }
  }

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

}
