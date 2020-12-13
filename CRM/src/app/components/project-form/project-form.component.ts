import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { ClientService } from '../../services/client.service';
import { Client } from 'src/app/models/Client';
import { ClientCompany } from 'src/app/models/ClientCompany';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectStatus: any = [];
  clients: any = [];
  edit: boolean = false;

  projectForm: FormGroup;

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


  
  constructor(private _fb: FormBuilder, private _service: ProjectService, private _clientService: ClientService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    //load clients
    this.loadClients();
    //load project status
    this.loadProjectStatus();

    this.projectForm=this._fb.group({
      title: ['Project title', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      dueDate: ['', Validators.required],
      budget: ['', Validators.required],
      status: [],
      clientId: [],

      updatedDate: [],
      actualCompletionDate: [],
      documentation: [],
      feedback: [],
      quantityOfChange: []
    });

    //if assigned project is found, use this form to edit assigned project detail
    if(this._service.project!=null){
      this.project=this._service.project;
      this.client=this._clientService.clientCompany;
      this.edit=true;
      console.log(this.project);
      console.log(this.client);
    }
  }

  get title(){
    return this.projectForm.get('title');
  }

  get description(){
    return this.projectForm.get('description');
  }

  get dueDate(){
    return this.projectForm.get('dueDate');
  }

  get budget(){
    return this.projectForm.get('budget');
  }

  get status(){
    return this.projectForm.get('status');
  }

  get clientId(){
    return this.projectForm.get('clientId');
  }

  get updatedDate(){
    return this.projectForm.get('updatedDate');
  }

  get actualCompletionDate(){
    return this.projectForm.get('actualCompletionDate');
  }

  get documentation(){
    return this.projectForm.get('documentation');
  }

  get feedback(){
    return this.projectForm.get('feedback');
  }

  get quantityOfChange(){
    return this.projectForm.get('quantityOfChange');
  }

  changeClient(e) {
    this.clientId.setValue(e.target.value, {
      onlySelf: true
    })
  }

  //load clients that is stored in database
  loadClients(){
    this._clientService.getClients().subscribe(
      res => {
        this.clients = res;
      },
      error => console.log(error)
    );
  }

  changeProjectStatus(e) {
    this.status.setValue(e.target.value, {
      onlySelf: true
    })
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

  //insert new project
  createNewProject(){
    delete this.project.idProject;
    this.project.title=this.title.value;
    this.project.description=this.description.value;
    this.project.dueDate=this.dueDate.value;
    delete this.project.createdDate;
    delete this.project.updatedDate;
    delete this.project.actualCompletionDate;
    this.project.budget=this.budget.value;
    delete this.project.documentation;
    delete this.project.feedback;
    delete this.project.quantityOfChange;
    this.project.status=parseInt(this.status.value);
    delete this.project.promotion_idPromotion;
    this.project.client_idClient=parseInt(this.clientId.value);

    this._service.saveProject(this.project).subscribe(
      res => {
        console.log(res);
        if(confirm("project information has been added")) {
          this._router.navigate(['/project']);
        }
      },
      err => {
        console.log('failed to insert into project');
        console.log(err);
      }
    );
  }

  //update project detail
  updateProject(){

    this.project.title=this.title.value;
    this.project.description=this.description.value;
    this.project.dueDate=this.dueDate.value;
    this.project.actualCompletionDate=this.actualCompletionDate.value;
    delete this.project.createdDate;
    delete this.project.updatedDate;
    this.project.budget=this.budget.value;
    this.project.documentation=this.documentation.value;
    this.project.feedback=this.feedback.value;
    this.project.quantityOfChange=this.quantityOfChange.value;
    this.project.status=parseInt(this.status.value);
    this.project.client_idClient=parseInt(this.clientId.value);

    this._service.updateProject(this.project.idProject, this.project).subscribe(
      res => {
        console.log(res);
        if(confirm("project information has been updated")) {
          this._router.navigate(['/project']);
        }
      },
      err => {
        console.log('failed to update into project');
        console.log(err);
      }
    );
  }

  onSubmit(){
    console.log(this.projectForm.value);
    this.createNewProject();
  }

}
