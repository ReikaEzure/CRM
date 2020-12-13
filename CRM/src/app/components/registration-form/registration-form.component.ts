import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { forbiddenNameValidator } from '../../shared/username.validator';
import { PasswordMatchValidator } from '../../shared/password.validator';

import { Login } from '../../models/Login';
import { User } from '../../models/User';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service'
import { Client } from 'src/app/models/Client';
import { ClientService } from 'src/app/services/client.service';
import { OfficeService } from 'src/app/services/office.service';
import { Employee } from 'src/app/models/Employee';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  idTypes = ['DNI', 'NIE', 'Passport'];
  roles: any = [];
  edit: boolean = false;
  companies: any;
  offices: any;

  login: Login = {
    idLogin: 0,
    username: '',
    password: '',
    email: ''
  }

  lastInserted: Login = {
    idLogin: 0,
    username: '',
    password: '',
    email: ''
  };

  user: User = {
    idUser: 0,
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    phone: '',
    joinedDate: new Date(),
    lastLogin: new Date(),
    id: '',
    idType: '',
    avatar: '',
    role: 0,
    status: 0,
    login_idLogin: 0
  }

  registrationForm: FormGroup;

  constructor(private _fb: FormBuilder, private _userService: UserService, 
      private _authService: AuthenticationService, private _router: Router, private _officeService: OfficeService,
      private _activate: ActivatedRoute, private _cliService: ClientService) { }

  ngOnInit(): void {
    this.loadRoles();
    this.loadCompanies();
    this.loadOffices();

    this.registrationForm=this._fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      id: this._fb.group({
        idType: [''],
        id: ['', Validators.required]
      }),
      birthdate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      subscribe: [false],
      //username can not be same as password
      username: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      //password has to be 8 letter consisting number and character
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
      confirmPassword: ['', Validators.required],
      role: [''],
      idClientCompany: [''],
      idOffice:[''],
    }, {validator: PasswordMatchValidator});
  
    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if(checkedValue){
        email.setValidators(Validators.required);
      }else{
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });


    if(this._authService.loginDetail!=null && this._userService.loggedInUser!=null){
      this.login=this._authService.loginDetail;
      this.user=this._userService.loggedInUser;
      this.edit=true;
    }
  }

  get firstname(){
    return this.registrationForm.get('firstname');
  }

  get lastname(){
    return this.registrationForm.get('lastname');
  }

  get birthdate(){
    return this.registrationForm.get('birthdate');
  }

  get username(){
    return this.registrationForm.get('username');
  }

  get password(){
    return this.registrationForm.get('password');
  }

  get confirmPassword(){
    return this.registrationForm.get('confirmPassword');
  }

  get email(){
    return this.registrationForm.get('email');
  }

  get phone(){
    return this.registrationForm.get('phone');
  }

  get idType(){
    return this.registrationForm.get('id').get('idType');
  }

  get id(){
    return this.registrationForm.get('id').get('id');
  }

  get role(){
    return this.registrationForm.get('role');
  }

  get idClientCompany(){
    return this.registrationForm.get('idClientCompany');
  }

  get idOffice(){
    return this.registrationForm.get('idOffice');
  }

  changeIdType(e) {
    this.idType.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeRole(e) {
    this.role.setValue(e.target.value, {
      onlySelf: true
    })
    if(this.role.value!=5){
     this.idClientCompany.disable();
     this.idOffice.enable();
    }else{
      this.idClientCompany.enable();
      this.idOffice.disable();
    }
  }

  changeClientCompany(e) {
    this.idClientCompany.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeOffice(e) {
    this.idOffice.setValue(e.target.value, {
      onlySelf: true
    })
  }

  loadRoles(){
    this._userService.loadRoles().subscribe(
      res => {
        this.roles = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  loadCompanies(){
    this._cliService.getClients().subscribe(
      res => {
        this.companies = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  loadOffices(){
    this._officeService.getOffices().subscribe(
      res => {
        this.offices = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  //register new login data
  registerLoginData(){
    delete this.login.idLogin;
    this.login.username=this.username.value;
    this.login.email=this.email.value;
    this.login.password=this.password.value;
    console.log(this.login);

    this._authService.registerLogin(this.login).subscribe(
      res => {
        this.lastInserted = res;
        this._authService.loginDetail=this.lastInserted;
        this.registerUserData();
      },
      err => {console.log(err);}
    );
  }

  //register new user data
  registerUserData(){
    delete this.user.idUser;
    delete this.user.joinedDate;
    this.user.avatar = 'assets/img/avatar/media.png';
    delete this.user.lastLogin;
    this.user.firstName=this.firstname.value;
    this.user.lastName=this.lastname.value;
    this.user.birthDate=this.birthdate.value;
    this.user.phone=this.phone.value;
    this.user.id=this.id.value;
    this.user.idType=this.idType.value;
    this.user.role=parseInt(this.role.value);
    this.user.status=1;
    this.user.login_idLogin=this.lastInserted.idLogin;
    console.log(this.user);

    this._userService.registerUser(this.user).subscribe(
      res => {
        console.log(res);
        this.getUser(this.user.login_idLogin);
        alert('Welcome! You have been successfully registered!')
        this._router.navigate(['/login']);
      },
      err => {console.log(err);}
    );
  }

  onSubmit(){
    console.log(this.registrationForm.value);
    this.registerLoginData();
  }

  //update user data
  updateUser(){
    
    console.log("entered update user function");
    this.user.firstName=this.firstname.value;
    this.user.lastName=this.lastname.value;
    this.user.birthDate=this.birthdate.value;
    this.user.phone=this.phone.value;
    this.user.id=this.id.value;
    this.user.idType=this.idType.value;
    this.user.role=parseInt(this.role.value);
    delete this.user.avatar;
    delete this.user.lastLogin;
    delete this.user.joinedDate;
    console.log(this.user);

    this._userService.updateUser(this.user.idUser, this.user).subscribe(
      res => {
        console.log(res);
        if(confirm("Your user information has been updated")) {
          this._router.navigate(['/project']);
        }
      },
      err => {console.log(err);}
    );
  }

  getUser(id){
    let user: User;
    this._userService.getUser(id).subscribe(
      res => {
        user=res;
        this._userService.loggedInUser=res;
        if(this.role.value!=5){
          this.createEmployee(user.idUser);
        }else{
          this.createClient(user.idUser);
        }
      },
      err => {console.log(err);}
    );
  }
  createEmployee(id){
    let emp:Employee = {
      user_idUser: id,
      office_idOffice: this.idOffice.value
    }
    this._userService.createEmployee(emp).subscribe(
      res => {
        console.log(res);
      },
      err => {console.log(err);}
    );
  }
  createClient(id){
    let cli:Client = {
      user_idUser: id,
      clientCompany: this.idClientCompany.value
    }
    this._userService.createClient(cli).subscribe(
      res => {
        console.log(res);
      },
      err => {console.log(err);}
    );
  }
}
