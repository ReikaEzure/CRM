import { Component, OnInit } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';

import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {
  
  projects: any = [];

  constructor(private _service: ProjectService, private _pdfService: PdfService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects(){
    this._service.getProjects().subscribe(
      res => {
        this.projects = res;
        this._service.projectStatus=res;
        console.log(res);
      },
      error => console.log(error)
    );
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
