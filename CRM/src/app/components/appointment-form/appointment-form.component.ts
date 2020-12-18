import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from 'src/app/services/appointment.service';
import { UserService } from 'src/app/services/user.service';
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

  constructor(private _fb: FormBuilder, private _userService: UserService, private _service: AppointmentService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.appointmentForm=this._fb.group({
      date: ['', [Validators.required]],
      description: ['', [Validators.required]]
      
    });

    //if idAppointment has passed, use form for editting information 
    //if not, for create new appointment
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

  //insert table appointment
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
        let lastInserted: Appointment=res;
        let appo={
          appointment_idAppointment: lastInserted.idAppointment,
          user_idUser: this._userService.loggedInUser.idUser
        }
        this._service.createAppo(appo).subscribe(
          res => {
            console.log(res);
          },
          err => {console.log(err);}
        );
        this._router.navigate(['/appointment']);
        
      },
      err => {console.log(err);}
    );

  }

  //update appointment
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
