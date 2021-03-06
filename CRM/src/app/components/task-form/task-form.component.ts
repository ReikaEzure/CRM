import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Task } from '../../models/Task';
import { Project } from '../../models/Project';
import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskStatus: any = [];
  edit: boolean = false;

  taskForm: FormGroup;

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

  project: Project;

  constructor(private _fb: FormBuilder, private _taskService: TaskService, private _projectService: ProjectService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTaskStatus();

    //if there is any task assigned, use this form to edit that task information
    if(this._taskService.task!=null){
      this.task=this._taskService.task;
      this.edit=true;
    } 

    this.taskForm=this._fb.group({
      taskName: ['Task name', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required]],
      dueDate: ['', Validators.required],
      status: [],
      actualCompletionDate: []
    });

    
  }

  get taskName(){
    return this.taskForm.get('taskName');
  }

  get description(){
    return this.taskForm.get('description');
  }

  get dueDate(){
    return this.taskForm.get('dueDate');
  }

  get status(){
    return this.taskForm.get('status');
  }

  get actualCompletionDate(){
    return this.taskForm.get('actualCompletionDate');
  }

  changeTaskStatus(e) {
    this.status.setValue(e.target.value, {
      onlySelf: true
    })
  }

  //load task status
  loadTaskStatus(){
    this._taskService.loadTaskStatus().subscribe(
      res => {
        this.taskStatus = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  // insert new task to table Task
  createNewTask(){
    delete this.task.idTask;
    delete this.task.createdDate;
    this.task.description=this.description.value;
    this.task.dueDate=this.dueDate.value;
    delete this.task.actualCompletionDate;
    this.task.taskName=this.taskName.value;
    this.task.status=parseInt(this.status.value);
    this.task.project_idProject=this.project.idProject;

    console.log(this.task);

    this._taskService.saveTask(this.task).subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/project']);
      },
      err => {
        console.log('failed to insert into task');
        console.log(err);
      }
    );
  }

  //update task information
  updateTask(){
    this.task.description=this.description.value;
    this.task.dueDate=this.dueDate.value;
    this.task.taskName=this.taskName.value;
    this.task.status=parseInt(this.status.value);
    this.task.actualCompletionDate=this.actualCompletionDate.value;
    delete this.task.createdDate;
    delete this.task.project_idProject;

    console.log(this.task);

    this._taskService.updateTask(this.task.idTask, this.task).subscribe(
      res => {
        console.log(res);
        if(confirm("task information has been updated")) {
          this._router.navigate(['/project']);
        }
        
      },
      err => {
        console.log('failed to update into task');
        console.log(err);
      }
    );
  }

  onSubmit(){
    console.log(this.taskForm.value);
    this.createNewTask();
  }



}
