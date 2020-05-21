import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ClientCompany, Address, Phone, Sns } from '../../models/ClientCompany';
import { Router, ActivatedRoute } from '@angular/router';

import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

  clientTypes: any = [];

  clientForm: FormGroup;

  edit: boolean = false;
  addr: Address ={
    client_idClient: 0,
    addressLine: '',
    city: '',
    state: '',
    country: '',
    postalcode: ''
  }

  phones: Phone = {
    client_idClient: 0,
    phoneNumber: ''
  }

  socials: Sns = {
    client_idClient: 0,
    sns: '',
    url: ''
  }

  client: ClientCompany = {
    idClient: 0,
    companyName: '',
    nif: '',
    industry: '',
    email: '',
    createdDate: new Date,
    updatedDate: new Date,
    preference: '',
    clientType: 0,
    phone: [],
    address: this.addr,
    sns: []
  };

  lastInserted: ClientCompany = {
    idClient: 0,
    companyName: ''
  }

  
  constructor(private _fb: FormBuilder, private _service: ClientService, private _route: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.clientForm=this._fb.group({
      companyName: ['Company Name', [Validators.required, Validators.minLength(3)]],
      nif: ['', [Validators.required]],
      industry: ['', Validators.required],
      email: ['', [Validators.required]],
      preference: [],
      clientType: [],
      phone: ['', [Validators.required]],
      alternatePhones: this._fb.array([]),
      address: this._fb.group({
        street: [''],
        city: [''],
        state: [''],
        country: [''],
        postalCode: ['']
      }),
      sns: ['', [Validators.required]],
      otherSns: this._fb.array([])
    });

    const params = this._activate.snapshot.params;
    if(params.id){
      this._service.getClient(params.id).subscribe(
        res => {
          console.log(res);
          this.client=res;
          this.edit=true;
        },
        err => {console.log(err.message);}
      );
    }
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

  get email(){
    return this.clientForm.get('email');
  }

  get preference(){
    return this.clientForm.get('preference');
  }

  get clientType(){
    return this.clientForm.get('clientType');
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

  changeClientType(e) {
    this.clientType.setValue(e.target.value, {
      onlySelf: true
    })
  }

  loadClientTypes(){
    this._service.loadClientTypes().subscribe(
      res => {
        this.clientTypes = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  saveNewClient(){
    delete this.client.idClient;
    this.client.companyName=this.companyName.value;
    this.client.nif=this.nif.value;
    this.client.industry=this.industry.value;
    this.client.email=this.email.value;
    delete this.client.createdDate;
    delete this.client.updatedDate;
    this.client.preference=this.preference.value;
    this.client.clientType=this.clientType.value;
    delete this.client.phone;
    delete this.client.address;
    delete this.client.sns;

    this._service.saveClient(this.client).subscribe(
      res => {
        console.log(res);
        this.lastInserted = res;
        console.log("last inserted id is: "+this.lastInserted[0].idClient);
        this._route.navigate(['/client']);
      },
      err => {console.log(err)}
    );
    console.log(this.client);
  }

  saveMoreDetail(){
  }

  updateClient(){
    delete this.client.createdDate;
    console.log(this.client);
    this._service.updateClient(this.client.idClient, this.client).subscribe(
      res => {
        console.log(res);
        this._route.navigate(['/games']);
      },
      err => {console.log(err)}
    );

  }

  onSubmit(){
    console.log(this.clientForm.value);
  }

}
