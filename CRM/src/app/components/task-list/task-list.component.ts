import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { ProjectService } from '../../services/project.service';
import { Project } from 'src/app/models/Project';
import { Task } from 'src/app/models/Task';
import { UserService } from 'src/app/services/user.service';

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
  clientView=false;

  upcoming: Task[]=[];
  done: Task[]=[];

  constructor( private _userService: UserService, private _service: TaskService, private _projectService: ProjectService, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadTaskStatus();
    if(this._userService.loggedInUser.role==5){
      this.clientView=true;
    }

    //load project using idProject that has passed with url
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
        //load list of tasks
      this.getTasks(params.id);
      
    }
  }

  //loas task status
  loadTaskStatus(){
    this._service.loadTaskStatus().subscribe(
      res => {
        this.taskStatus = res;
        this._service.taskStatus = res;
      },
      error => console.log(error)
    );
  }

  data : any = {
    id: 0,
    status: 0
  }

  //apply color depending on status of each task
  applyColor(status){
      switch(status){
        case 1: //In progress
          return 'table-secondary';
        case 2: //Done
          return 'table-light';
        case 3: //Approved
          return 'table-success';
        case 4: //Pending
          return 'table-info';
        case 5: //Struggling
          return 'table-warning';
        default:
          return 'table-secondary';
    }
  }

  getStatusForClient(status){
    switch(status){
      case 1: //In progress
        return 'In progress';
      case 2: //Done
        return 'Done';
      case 3: //Approved
        return 'Approved';
      case 4: //Pending
        return 'Pending';
      case 5: //Struggling
        return 'In progress';
      default:
        return 'Pending';
  }
}

  // show counter to due date
  dueDateCounter(due){
    let today = new Date();
    let date = new Date(due);
    let res='';
    let week= ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let month =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    //if due date is within 1 day, show hours and minutes till due
    if(date.getDate()==today.getDate() && date.getMonth()==today.getMonth() && date.getFullYear()==today.getFullYear()){
      if(date.getHours()>1){
        res= date.getHours()+' hours, '
      }else{
        res= date.getHours()+' hour, '
      }
      if(date.getMinutes()>1){
        res+= date.getMinutes()+' minutes'
      }else{
        res+= date.getMinutes()+' minute'
      }
    }//if due date is within a week, show date of due date
    else if(date.getDate()>today.getDate() && date.getDate()<(today.getDate()+7)){
      res= 'On '+week[date.getDay()];
    }//if there is longer period of time till due date, show date of due
    else{
      res= date.getDate()+', '+month[date.getMonth()]+', '+date.getFullYear();
    }
    return res;
  }

  //when user select different status change directly in that time
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

  //get list of tasks
  getTasks(id){
    this._service.getTasks(id).subscribe(
      res => {
        this.tasks = res;
        this.divideTask();
      },
      error => console.log(error)
    );
  }

  //delete task
  deleteTask(idTask: String, idProject: String){
    this._service.deleteTask(idTask).subscribe(
      res => {
        console.log(res);
        this.getTasks(idProject);
      },
      err => {console.log(err.message)}
    );
  }

  //divide task to filter, upcoming or done
  divideTask(){
    for(let i =0; i<this.tasks.length; i++){
      if(this.tasks[i].status==2){
        this.done.push(this.tasks[i]);
      }else{
        this.upcoming.push(this.tasks[i]);
      }
    }
  }

  //filter upcoming tasks or tasks that already have done
  getUpcomingTask(){
    this.tasks=this.upcoming;
  }
  getDoneTask(){
    this.tasks=this.done;
    console.log(this.done);
  }

  setHideMenu(){
    if(this.clientView){
      return 'hideMenu';
    }
    return 'showMenu';
  }
}
