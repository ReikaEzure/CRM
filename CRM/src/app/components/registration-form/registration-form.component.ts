import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { forbiddenNameValidator } from '../../shared/username.validator';
import { PasswordMatchValidator } from '../../shared/password.validator';

import { Login } from '../../models/Login';
import { User } from '../../models/User';

import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service'

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  idTypes = ['DNI', 'NIE', 'Passport'];
  roles: any = [];
  edit: boolean = false;

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

  constructor(private _fb: FormBuilder, private _userService: UserService, private _authService: AuthenticationService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadRoles();

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
      username: ['', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
      confirmPassword: ['', Validators.required],
      role: ['']
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

  changeIdType(e) {
    this.idType.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeRole(e) {
    this.role.setValue(e.target.value, {
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

  registerLoginData(){
    delete this.login.idLogin;
    this.login.username=this.username.value;
    this.login.email=this.email.value;
    this.login.password=this.password.value;
    console.log(this.login);

    this._authService.registerLogin(this.login).subscribe(
      res => {
        console.log(res);
        this.lastInserted = res;
        console.log("last inserted id is: "+this.lastInserted[0].idLogin);
        this.registerUserData();
      },
      err => {console.log(err);}
    );
  }

  registerUserData(){
    delete this.user.idUser;
    delete this.user.joinedDate;
    delete this.user.avatar;
    delete this.user.lastLogin;
    this.user.firstName=this.firstname.value;
    this.user.lastName=this.lastname.value;
    this.user.birthDate=this.birthdate.value;
    this.user.phone=this.phone.value;
    this.user.id=this.id.value;
    this.user.idType=this.idType.value;
    this.user.role=parseInt(this.role.value);
    this.user.status=1;
    this.user.login_idLogin=parseInt(this.lastInserted[0].idLogin);
    console.log(this.user);

    this._userService.registerUser(this.user).subscribe(
      res => {
        console.log(res);
        this._authService.isLoggedIn=true;
        this._router.navigate(['/home']);
      },
      err => {console.log(err);}
    );
  }

  onSubmit(){
    console.log(this.registrationForm.value);
    this.registerLoginData();
  }
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
          this._router.navigate(['/home']);
        }
      },
      err => {console.log(err);}
    );
  }

}
