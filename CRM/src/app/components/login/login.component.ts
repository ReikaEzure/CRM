import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Router, ActivatedRoute} from '@angular/router';

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
  

  constructor(private _fb: FormBuilder, private _service: AuthenticationService, private _userService: UserService, private _router: Router) { }

  ngOnInit(): void {
    this.loadRoles();
    this.loadUserStatus();

    this.loginForm = this._fb.group({
      username:['', [Validators.required]],
      password:['', Validators.required]
    });
  }

  loadRoles(){
    this._userService.loadRoles().subscribe(
      res => {
        this._userService.roles = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }
  loadUserStatus(){
    this._userService.loadUserStatus().subscribe(
      res => {
        this._userService.status = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }
  
  onSubmit(){
    console.log(this.loginForm.value);
    this._service.login(this.loginForm.value).subscribe(
      res => { 
        console.log(res);
        this._service.loginDetail=res;
        this._service.isLoggedIn=true;
        this._router.navigate(['/home']);
      },
      err => { 
        console.log(err); 
        this.loginFailed=true;
      }
    );
    this.loginForm.reset();
  }

}


