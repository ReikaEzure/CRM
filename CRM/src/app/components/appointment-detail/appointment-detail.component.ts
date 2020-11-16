import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from 'src/app/models/Appointment';
import { AppointmentService } from 'src/app/services/appointment.service';

@Component({
  selector: 'app-appointment-detail',
  templateUrl: './appointment-detail.component.html',
  styleUrls: ['./appointment-detail.component.scss']
})
export class AppointmentDetailComponent implements OnInit {

  appointment: Appointment={
    idAppointment: 0,
    createdDate: new Date(),
    updatedDate: new Date(),
    description: '',
    date: new Date()
  };

  constructor(private _service:AppointmentService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this._activate.snapshot.params;
    if(params.id){
      this._service.getAppointment(params.id).subscribe(
        res => {
          console.log(res);
          this.appointment=res;
          this._service.appointment=res;
        },
        err => {console.log(err.message);}
      );
    }
  }

  delete(event: Event): void {
    event.preventDefault(); // Prevents browser following the link

    this._service.deleteAppointment(this.appointment.idAppointment).subscribe(
      res => {
        this._router.navigate(['/appointment']);
        
        console.log(res);
      },
      error => console.log(error)
    );
  }

}
