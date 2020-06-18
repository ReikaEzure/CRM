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
          console.log(res);
        },
        error => console.log(error)
      );
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
