import { Component, OnInit } from '@angular/core';

import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  appointments: any = [];

  constructor(private _service: AppointmentService) { }

  ngOnInit(): void {
    this.getTodaysAppointments();
  }

  getTodaysAppointments(){
    this._service.getTodaysAppointments().subscribe(
      res => {
        this.appointments = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }
  getUpcomingsAppointments(){
    this._service.getUpcomingsAppointments().subscribe(
      res => {
        this.appointments = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }
  getDoneAppointments(){
    this._service.getDoneAppointments().subscribe(
      res => {
        this.appointments = res;
        console.log(res);
      },
      error => console.log(error)
    );
  
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
