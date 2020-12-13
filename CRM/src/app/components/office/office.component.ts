import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/models/Employee';
import { Office } from 'src/app/models/Office';
import { OfficeService } from 'src/app/services/office.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {
  officeForm : FormGroup;

  edit : boolean = false;

  offices: any;
  emp: Employee = {
    user_idUser: 0,
    office_idOffice: 0
  }

  offi : Office = {
    idOffice: 0,
    name: '',
    phone: '',
    nif: ''
  }
  constructor(private _fb: FormBuilder, private _service: OfficeService, 
    private _userService: UserService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    //get information of office where user is working
    this.getOffice(this._userService.loggedInUser.idUser);
    //get list of office 
    this.getOffices();
    this.officeForm=this._fb.group({
      office: ['', [Validators.required]]
    });
  }
  get office(){
    return this.officeForm.get('office'); 
  }

  //get list of offices that is in database
  getOffices(){
    this._service.getOffices().subscribe(
      res => {
        this.offices=res;
      },
      error => console.log(error)
    );
  }

  changeOfficeValue(e) {
    this.office.setValue(e.target.value, {
      onlySelf: true
    })
  }

  // change office the user is working
  changeOffice(){
    this.emp.office_idOffice=this.office.value;
    this.emp.user_idUser=this._userService.loggedInUser.idUser;
    this._userService.updateEmployee(this.emp.user_idUser, this.emp).subscribe(
      res =>{
        console.log(res);
        this.getOffice(this.emp.user_idUser);
        this._router.navigate(['/user/']);
      },
      err => {console.log(err);}
    );
  }

  //insert new office detail
  addOffice(){
    this.emp.office_idOffice=this.office.value;
    this.emp.user_idUser=this._userService.loggedInUser.idUser;
    this._userService.createEmployee(this.emp).subscribe(
      res =>{
        console.log(res);
        this.getOffice(this.emp.user_idUser);
        this._router.navigate(['/user/']);
      },
      err => {console.log(err);}
    );

  }

  //get office of this user
  getOffice(id){
    this._service.getOffice(id).subscribe(
      res => {
        this._service.office=res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  onSubmit(){
    if(this._service.office!=null){
      this.changeOffice();
    }else{
      this.addOffice();
    }
    
  }



}
