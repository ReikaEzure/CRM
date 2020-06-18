import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { PasswordMatchValidator } from '../../shared/password.validator';

import { Login } from '../../models/Login';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  resetPassForm: FormGroup;
  
  data: Login = {
    idLogin: 0,
    username: '',
    password: '',
    email: ''
  }

  constructor(private _fb: FormBuilder, private _authService: AuthenticationService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {

    this.resetPassForm=this._fb.group({
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$')]],
      confirmPassword: ['', Validators.required]
    }, {validator: PasswordMatchValidator});

    const params = this._activate.snapshot.params;
    if(params.id){
      this._authService.getLogin(params.id).subscribe(
        res => {
          console.log(res);
          this.data=res;
        },
        err => {console.log(err.message);}
      );
    }
  }

  get password(){
    return this.resetPassForm.get('password');
  }

  get confirmPassword(){
    return this.resetPassForm.get('confirmPassword');
  }

  resetPass(){
    this.data.password=this.password.value;
    console.log(this.data);

    this._authService.resetPassword(this.data.idLogin, this.data).subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/login']);
      },
      err => {console.log(err);}
    );

  }

  onSubmit(){
    console.log(this.resetPassForm.value);
    this.resetPass();
  }
}
