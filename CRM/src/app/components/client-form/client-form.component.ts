import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  clientForm: FormGroup;

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
    this.clientForm=this._fb.group({
      companyName: ['Company Name', [Validators.required, Validators.minLength(3)]],
      nif: ['', [Validators.required]],
      industry: ['', Validators.required],
      address: this._fb.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        postalCode: ['']
      }),
      phone: ['', [Validators.required]],
      alternatePhones: this._fb.array([]),
      email: ['', [Validators.required]],
      subscribe: [false],
      sns: ['', [Validators.required]],
      otherSns: this._fb.array([])
    }, {});
  
    this.clientForm.get('subscribe').valueChanges.subscribe(checkedValue => {
      const email = this.clientForm.get('email');
      if(checkedValue){
        email.setValidators(Validators.required);
      }else{
        email.clearValidators();
      }
      email.updateValueAndValidity();
      });
  }

  get companyName(){
    return this.clientForm.get('companyName');
  }

  get nif(){
    return this.clientForm.get('nif');
  }

  get industry(){
    return this.clientForm.get('industry');
  }

  get userName(){
    return this.clientForm.get('userName');
  }

  get email(){
    return this.clientForm.get('email');
  }

  get phone(){
    return this.clientForm.get('phone');
  }

  get alternatePhones(){
    return this.clientForm.get('alternatePhones') as FormArray;
  }

  get sns(){
    return this.clientForm.get('sns');
  }

  get otherSns(){
    return this.clientForm.get('otherSns') as FormArray;
  }

  addAlternatePhones(){
    this.alternatePhones.push(this._fb.control(''));
  }

  addOtherSns(){
    this.otherSns.push(this._fb.control(''));
  }

  onSubmit(){
    console.log(this.clientForm.value);
  }

}
