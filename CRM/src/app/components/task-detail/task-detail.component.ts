import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/models/Task';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  task: Task = {
    idTask: 0,
    createdDate: new Date,
    description: '',
    dueDate: new Date,
    actualCompletionDate: new Date,
    taskName: '',
    status: 0,
    project_idProject: 0
  };
  taskStatus;
  taskId;
  projectId;

  constructor(private _activate: ActivatedRoute, private _service: TaskService, private _projectService: ProjectService) { }

  ngOnInit(): void {
    //load task status and project
    this.taskStatus=this._service.taskStatus;
    this.projectId=this._projectService.project.idProject;

    //get task detail using idTask that has passed from url
    const params = this._activate.snapshot.params;
    if(params.id){
      this._service.getTask(params.id).subscribe(
        res => {
          this.task = res;
          this._service.task=this.task;
          this.taskId=this.task.idTask;
          console.log(res);
        },
        error => console.log(error)
      );
    }

    
  }

}
