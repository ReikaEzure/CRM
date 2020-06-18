import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Project } from '../../models/Project';
import { ProjectService } from '../../services/project.service';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectStatus: any = [];
  client: any = [];
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
    promoId: 0,
    client_idClient: 0
  };

  
  constructor(private _fb: FormBuilder, private _service: ProjectService, private _clientService: ClientService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadClient();
    this.loadProjectStatus();

    this.projectForm=this._fb.group({
      title: ['Project title', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      dueDate: ['', Validators.required],
      budget: ['', Validators.required],
      status: [],
      clientId: []
    });

    const params = this._activate.snapshot.params;
    if(params.id){
      this._service.getProject(params.id).subscribe(
        res => {
          console.log(res);
          this.project=res;
          this.edit=true;
        },
        err => {console.log(err.message);}
      );
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

  changeClient(e) {
    this.clientId.setValue(e.target.value, {
      onlySelf: true
    })
  }

  loadClient(){
    this._clientService.getClients().subscribe(
      res => {
        this.client = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  changeProjectStatus(e) {
    this.status.setValue(e.target.value, {
      onlySelf: true
    })
  }

  loadProjectStatus(){
    this._service.loadProjectStatus().subscribe(
      res => {
        this.projectStatus = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

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
    delete this.project.promoId;
    this.project.client_idClient=parseInt(this.clientId.value);

    console.log(this.project);

    this._service.saveProject(this.project).subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/project']);
      },
      err => {
        console.log('failed to insert into project');
        console.log(err);
      }
    );
  }

  updateProject(){

  }

  onSubmit(){
    console.log(this.projectForm.value);
    this.createNewProject();
  }

}
