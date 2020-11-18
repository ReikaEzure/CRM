import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '../../services/project.service';
import { Project } from 'src/app/models/Project';
import { ClientCompany } from 'src/app/models/ClientCompany';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

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

  client: ClientCompany = {
    idClient: 0,
    companyName: '',
    nif: '',
    industry: '',
    email: '',
    createdDate: new Date(),
    updatedDate: new Date(),
    preference: '',
    clientType_idClientType: 0
  };

  projectStatus;

  constructor(private _activate: ActivatedRoute, private _service: ProjectService, private _cliService: ClientService) { }

  ngOnInit(): void {
    this.projectStatus=this._service.projectStatus;

    const params = this._activate.snapshot.params;
    if(params.id){
      this._service.getProject(params.id).subscribe(
        res => {
          this.project = res;
          this._service.project = res;
          console.log(res);
          this.getClient();
        },
        error => console.log(error)
      );
    }




  }

  getClient(){
    this._cliService.getClient(this.project.client_idClient).subscribe(
      res => {
        this.client = res;
        this._cliService.clientCompany = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

}
