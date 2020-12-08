import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Login } from 'src/app/models/Login';
import { OfficeService } from 'src/app/services/office.service';


import { AuthenticationService } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loginFailed: boolean = false;
  loginInfo: Login = {
    password: '',
    username: ''
  }
  

  constructor(private _fb: FormBuilder, private _authService: AuthenticationService, 
    private _userService: UserService, private _officeService: OfficeService,
    private _cookie: CookieService, private _router: Router) { }

  ngOnInit(): void {
    this.loadRoles();
    this.loadUserStatus();

    this.loginForm = this._fb.group({
      username:['', [Validators.required]],
      password:['', Validators.required]
    });
    // check if there is cookie
    if(this._cookie.check('password') && this._cookie.check('username')){
      this.onSubmit();
    }
  }

  // load role (administrator, Business developer, developer, designer, client)
  loadRoles(){
    this._userService.loadRoles().subscribe(
      res => {
        this._userService.roles = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }
  // load user status (working, on leave, in meeting, be back soon)
  loadUserStatus(){
    this._userService.loadUserStatus().subscribe(
      res => {
        this._userService.status = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }
  
  // check if username and password are correct
  onSubmit(){
    
    if(this._cookie.check('password') && this._cookie.check('username')){
      //get cookie
      this.loginInfo.password=this._cookie.get('password');
      this.loginInfo.username=this._cookie.get('username');
    }else{
      //get input data
      this.loginInfo.username=this.loginForm.get('username').value;
      this.loginInfo.password=this.loginForm.get('password').value;
    }
    
    //load data from Login table
    this._authService.login(this.loginInfo).subscribe(
      res => { 
        console.log(res);
        this._authService.loginDetail=res;
        this._authService.isLoggedIn=true;
        //load data of User table
        this.login();
        this.getUser();
        //set cookie that expires tomorrow
        let tomorrow = new Date();
        tomorrow.setDate(new Date().getDate()+1);
        this._cookie.set('password', this.loginInfo.password.toString(), tomorrow);
        this._cookie.set('username', this.loginInfo.username.toString(), tomorrow);
        this._router.navigate(['/home']);
      },
      err => { 
        console.log(err); 
        this.loginFailed=true;
      }
    );
    this.loginForm.reset();
  }

  // get user data from database
  getUser(){
    this._userService.getUser(this._authService.loginDetail.idLogin).subscribe(
      res => {
        this._userService.loggedInUser=res;
        this.getOffice(this._userService.loggedInUser.idUser);
        console.log(res);
      },
      error => console.log(error)
    );
  }

  getOffice(id){
    this._officeService.getOffice(id).subscribe(
      res => {
        this._officeService.office=res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  // get login data from database
  login(): void {
    this._userService.login(this._authService.loginDetail.idLogin).subscribe(
      res => {
        console.log(res);
      },
      error => console.log(error)
    );
  }
  
}


