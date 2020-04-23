import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators, FormArray } from '@angular/forms';
import { forbiddenNameValidator } from '../../shared/username.validator';
import { PasswordValidator } from '../../shared/password.validator';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  
  registrationForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.registrationForm=this._fb.group({
      userName: ['Username', [Validators.required, Validators.minLength(3), forbiddenNameValidator(/password/)]],
      email: [''],
      subscribe: [false],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      address: this._fb.group({
        street: [''],
        city: [''],
        state: [''],
        postalCode: ['']
      }),
      alternateEmails: this._fb.array([])
    }, {validator: PasswordValidator});
  
    this.registrationForm.get('subscribe').valueChanges.subscribe(checkedValue => {
      const email = this.registrationForm.get('email');
      if(checkedValue){
        email.setValidators(Validators.required);
      }else{
        email.clearValidators();
      }
      email.updateValueAndValidity();
      });
  }

  get userName(){
    return this.registrationForm.get('userName');
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

  get alternateEmails(){
    return this.registrationForm.get('alternateEmails') as FormArray;
  }

  addAlternateEmails(){
    this.alternateEmails.push(this._fb.control(''));
  }

  onSubmit(){
    console.log(this.registrationForm.value);
  }
}
