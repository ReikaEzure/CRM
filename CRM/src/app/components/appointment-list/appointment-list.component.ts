import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/models/Appointment';

import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  appointments: any = [];
  today: Appointment[]=[];
  upcoming: Appointment[]=[];
  done: Appointment[]=[];

  constructor(private _service: AppointmentService) { }

  ngOnInit(): void {
    this.getAppointments();
    this._service.appointment=null;
  }

  getAppointments(){
    this._service.getAppointments().subscribe(
      res => {
        this.appointments = res;
        console.log(res);
        this.divideAppointments();
      },
      error => console.log(error)
    );
  }

  divideAppointments(){
    let today= new Date();
    for(let i =0; i<this.appointments.length; i++){
      let date= new Date(this.appointments[i].date);
      if(date.getDate()==today.getDate() && date.getMonth()==today.getMonth() && date.getFullYear()==today.getFullYear()){
        this.today.push(this.appointments[i]);
      }else if(date>today){
        this.upcoming.push(this.appointments[i]);
      }else if(date< today){
        this.done.push(this.appointments[i]);
      }
    }
  }

  getTodaysAppointments(){
    this.appointments=this.today;
  }
  getUpcomingsAppointments(){
    this.appointments=this.upcoming;
  }
  getDoneAppointments(){
    this.appointments=this.done;
  
  }

  deleteAppointment(id: String){
    console.log(id);
    this._service.deleteAppointment(id).subscribe(
      res => {
        console.log(res);
        this.getTodaysAppointments();
      },
      err => {console.log(err.message)}
    );
  }



}
