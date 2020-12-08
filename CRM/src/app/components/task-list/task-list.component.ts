import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { Project } from 'src/app/models/Project';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  project: Project;
  tasks: any = [];
  taskStatus;
  projectId=0;

  constructor(private _service: TaskService, private _projectService: ProjectService, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTaskStatus();

    const params = this._activate.snapshot.params;
    if(params.id){
      this.projectId=params.id;
      this._projectService.getProject(this.projectId).subscribe(
        res => {
          this.project = res;
          this._projectService.project=this.project;
          console.log(res);
        },
        error => console.log(error)
      );

        this._service.task=null;
      this.getTasks(params.id);
      
    }
  }

  loadTaskStatus(){
    this._service.loadTaskStatus().subscribe(
      res => {
        this.taskStatus = res;
        this._service.taskStatus = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  data : any = {
    id: 0,
    status: 0
  }

  applyColor(){
    for(let i=0;i<this.tasks.length;i++){
      var element=document.getElementById(this.tasks[i].idTask)
      switch(this.tasks[i].status){
        case 1: //In progress
          element.classList.add('table-secondary');
          break;
        case 2: //Done
        element.classList.add('table-light');
          break;
        case 3: //Approved
        element.classList.add('table-success');
          break;
        case 4: //Pending
        element.classList.add('table-info');
          break;
        case 5: //Struggling
          element.classList.add('table-warning');
          break;
        default:
          element.classList.add('table-secondary');
          break;
      }
    }
  }

  changeTaskStatus(id, e){
    this.data.id=id;
    this.data.status=e.target.value;
    this._service.changeStatus(this.data).subscribe(
      res => {
        console.log(res);
      },
      error => console.log(error)
    );
  }

  getTasks(id){
    this._service.getTasks(id).subscribe(
      res => {
        this.tasks = res;
        console.log(res);
        this.applyColor();
      },
      error => console.log(error)
    );
  }

  deleteTask(idTask: String, idProject: String){
    console.log(idTask);
    this._service.deleteTask(idTask).subscribe(
      res => {
        console.log(res);
        this.getTasks(idProject);
      },
      err => {console.log(err.message)}
    );
  }


}
