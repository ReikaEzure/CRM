import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '../../services/project.service';
import { Project } from 'src/app/models/Project';
import { ClientCompany } from 'src/app/models/ClientCompany';
import { ClientService } from 'src/app/services/client.service';
import { Promotion } from 'src/app/models/Promotion';
import { PromotionService } from 'src/app/services/promotion.service';

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
    promotion_idPromotion: 0,
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

  promo: Promotion = {
    idPromotion: 0,
    name: '',
    description: '',
    offerAmount: 0
  }

  projectStatus;

  constructor(private _activate: ActivatedRoute, private _service: ProjectService, 
    private _cliService: ClientService, private _promoService: PromotionService) { }

  ngOnInit(): void {
    this.loadProjectStatus();

    //load project information using idProject from url
    const params = this._activate.snapshot.params;
    if(params.id){
      this._service.getProject(params.id).subscribe(
        res => {
          this.project = res;
          this._service.project = res;
          console.log(res);
          //get promotion and client detail as well
          this.getPromo();
          this.getClient();
        },
        error => console.log(error)
      );
    }
  }

  //load project status
  loadProjectStatus(){
    this._service.loadProjectStatus().subscribe(
      res => {
        this.projectStatus = res;
      },
      error => console.log(error)
    );
  }

  //get promotion detail that has applied 
  getPromo(){
    this._promoService.getPromotion(this.project.promotion_idPromotion).subscribe(
      res => {
        this.promo = res;
        this._promoService.promotion = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  //get client who ordered this project
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
