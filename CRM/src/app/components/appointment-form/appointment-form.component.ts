import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { Appointment } from '../../models/Appointment';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.scss']
})
export class AppointmentFormComponent implements OnInit {

  appointmentForm : FormGroup;

  edit : boolean = false;

  appointment : Appointment = {
    idAppointment: 0,
    date: new Date(),
    description: '',
    createdDate: new Date(),
    updatedDate: new Date()
  }

  constructor(private _fb: FormBuilder, private _service: AppointmentService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.appointmentForm=this._fb.group({
      date: ['', [Validators.required]],
      description: ['', [Validators.required]]
      
    });

    if(this._service.appointment!=null){
      this.appointment=this._service.appointment;
      this.edit=true;
    }
  }

  get date(){
    return this.appointmentForm.get('date');
  }

  get description(){
    return this.appointmentForm.get('description');
  }

  saveNewAppointment(){
    delete this.appointment.idAppointment;
    this.appointment.date=this.date.value;
    this.appointment.description=this.description.value;
    delete this.appointment.createdDate;
    delete this.appointment.updatedDate;
    console.log(this.appointment);

    this._service.saveAppointment(this.appointment).subscribe(
      res =>{
        console.log(res);
        this._router.navigate(['/appointment']);
        
      },
      err => {console.log(err);}
    );

  }

  updateAppointment(){
    this.appointment.date=this.date.value;
    this.appointment.description=this.description.value;
    delete this.appointment.createdDate;
    delete this.appointment.updatedDate;
    console.log(this.appointment);

    this._service.updateAppointment(this.appointment.idAppointment, this.appointment).subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/appointment']);
      },
      err => {console.log(err);}
    );
  }

  onSubmit(){
    this.saveNewAppointment();
    this._router.navigate(['/appointment']);
  }

}
