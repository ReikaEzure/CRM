import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {

  task: Task;
  taskStatus;

  constructor(private _activate: ActivatedRoute, private _service: TaskService) { }

  ngOnInit(): void {
    this.taskStatus=this._service.taskStatus;

    const params = this._activate.snapshot.params;
    if(params.id){
      this._service.getTask(params.id).subscribe(
        res => {
          this.task = res;
          console.log(res);
        },
        error => console.log(error)
      );
    }

    
  }

}
