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
  snsTypes = ['Website', 'Twitter', 'Instagram', 'Facebook'];
  clientTypes: any = [];

  clientForm: FormGroup;

  edit: boolean = false;
  addr: Address ={
    client_idClient: 0,
    addressLine: '',
    city: '',
    state: '',
    country: '',
    postalCode: ''
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
    clientType_idClientType: 0,
    phone: [],
    address: this.addr,
    sns: []
  };

  lastInserted: ClientCompany = {
    idClient: 0,
    companyName: ''
  }

  
  constructor(private _fb: FormBuilder, private _service: ClientService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadClientTypes();

    this.clientForm=this._fb.group({
      companyName: ['Company Name', [Validators.required, Validators.minLength(3)]],
      nif: ['', [Validators.required]],
      industry: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
      sns: this._fb.group({
        snsType: [''],
        url: [''],
      }),
      otherSns: this._fb.array([
        this._fb.group({
          snsType: [],
          url: [],
        })
      ])
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

    if(this._service.clientCompany!=null){
      this.client=this._service.clientCompany;
      this.edit=true;
      console.log(this.client);
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

  get addressLine(){
    return this.clientForm.get('address').get('street');
  }
  get city(){
    return this.clientForm.get('address').get('city');
  }
  get state(){
    return this.clientForm.get('address').get('state');
  }
  get coutry(){
    return this.clientForm.get('address').get('country');
  }
  get postalCode(){
    return this.clientForm.get('address').get('postalCode');
  }

  get snsType(){
    return this.clientForm.get('sns').get('snsType');
  }
  get url(){
    return this.clientForm.get('sns').get('url');
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

  changeSnsType(e) {
    this.snsType.setValue(e.target.value, {
      onlySelf: true
    })
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
    this.client.clientType_idClientType=parseInt(this.clientType.value);
    delete this.client.phone;
    delete this.client.address;
    delete this.client.sns;

    console.log(this.client);

    this._service.saveClient(this.client).subscribe(
      res => {
        console.log(res);
        this.lastInserted = res;
        console.log("last inserted id is: "+this.lastInserted[0].idClient);
        this.saveMoreDetail();
        
      },
      err => {
        console.log(err);
      }
    );
  }

  saveMoreDetail(){
    this.phones.client_idClient=this.lastInserted[0].idClient;
    this.phones.phoneNumber=this.phone.value;
    if(this.savePhone(this.phones)!=null && this.alternatePhones.length>0){
      for(var i=0; i<this.alternatePhones.length; i++){
        this.phones.client_idClient=this.lastInserted[0].idClient;
        this.phones.phoneNumber=this.alternatePhones[i].value;
        this.savePhone(this.phones);
      }
    }

    this.addr.client_idClient=this.lastInserted[0].idClient;
    this.addr.addressLine=this.addressLine.value;
    this.addr.city=this.city.value;
    this.addr.country=this.coutry.value;
    this.addr.state=this.state.value;
    this.addr.postalCode=this.postalCode.value;
    this.saveAddress(this.addr);

    this.socials.client_idClient=this.lastInserted[0].idClient;
    this.socials.sns=this.snsType.value;
    this.socials.url=this.url.value;
    if(this.saveSns(this.socials)!=null && this.otherSns.length>0){
      for(var i=0; i<this.otherSns.length; i++){
        this.socials.client_idClient=this.lastInserted[0].idClient;
        this.socials.url=this.otherSns[i].value;
        this.saveSns(this.socials);
      }
    }
    
    this._router.navigate(['/client']);
  }

  savePhone(p: Phone){
    this._service.savePhone(p).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err); 
        return null;
      }
    );
  }

  saveAddress(a: Address){
    this._service.saveAddress(a).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
        return null;
      }
    );
  }

  saveSns(s: Sns){
    this._service.saveSns(s).subscribe(
      res => {
        console.log(res);
      },
      err => {
        console.log(err);
        return null;
      }
    );
  }

  updateClient(){
    delete this.client.createdDate;
    console.log(this.client);
    this._service.updateClient(this.client.idClient, this.client).subscribe(
      res => {
        console.log(res);
        this._router.navigate(['/client']);
      },
      err => {console.log(err)}
    );

  }

  onSubmit(){
    console.log(this.clientForm.value);
    this.saveNewClient();
  }

}
