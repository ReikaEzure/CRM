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
      otherSns: this._fb.array([])
    });

    //if client is assigned, use this form for editting information of client
    if(this._service.clientCompany!=null){
      this.client=this._service.clientCompany;
      this.addr=this._service.addr;
      this.phones=this._service.phone;
      this.socials=this._service.sns;
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

  get street(){
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

  get otherSnsType(){
    return this.clientForm.get('otherSnsType') as FormArray;
  }

  get otherUrl(){
    return this.clientForm.get('otherUrl') as FormArray;
  }

  //add another input to add multiple phone number
  addAlternatePhones(){
    this.alternatePhones.push(this._fb.control(''));
  }

  //add 2 more input to add multiple sns information
  addOtherSns(){
    this.otherSns.push(
      this._fb.group({
        otherSnsType: [],
        otherUrl: [],
      })
    );
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

  //load client types which are stored in database
  loadClientTypes(){
    this._service.loadClientTypes().subscribe(
      res => {
        this.clientTypes = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  //insert new client to ClientCompany table
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

  // insert phone number, address, sns to each tables
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
    this.addr.addressLine=this.street.value;
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

  //call function from service to save phone number to databse
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
  updatePhone(id){
    this._service.deletePhone(id).subscribe(
      res => {
        console.log(res);

        this.phones.client_idClient=this.client.idClient;
        this.phones.phoneNumber=this.phone.value;
        if(this.savePhone(this.phones)!=null && this.alternatePhones.length>0){
          for(var i=0; i<this.alternatePhones.length; i++){
            this.phones.client_idClient=this.lastInserted[0].idClient;
            this.phones.phoneNumber=this.alternatePhones[i].value;
            this.savePhone(this.phones);
          }
        }
      },
      err => {
        console.log(err); 
      }
    );

    
  }

  //call function from service to save address
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
  updateAddress(id, a: Address){
    this._service.updateAddress(id, a).subscribe(
      res=>{
        console.log(res)
      },
      err=>{
        console.log(err);
      }
    );
  }

  //call function to save sns
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
  updateSns(id){
    this._service.deleteSns(id).subscribe(
      res => {
        console.log(res);

        this.socials.client_idClient=this.client.idClient;
        this.socials.sns=this.snsType.value;
        this.socials.url=this.url.value;
        if(this.saveSns(this.socials)!=null && this.otherSns.length>0){
          for(var i=0; i<this.otherSns.length; i++){
            this.socials.client_idClient=this.lastInserted[0].idClient;
            this.socials.url=this.otherSns[i].value;
            this.saveSns(this.socials);
          }
        }
      },
      err => {
        console.log(err); 
      }
    );

    
  }

  //update client information
  updateClient(){
    delete this.client.createdDate;
    this.client.companyName=this.companyName.value;
    this.client.nif=this.nif.value;
    this.client.industry=this.industry.value;
    this.client.email=this.email.value;
    this.client.preference=this.preference.value;
    this.client.clientType_idClientType=parseInt(this.clientType.value);
    delete this.client.phone;
    delete this.client.address;
    delete this.client.sns;
    console.log(this.client);
    this._service.updateClient(this.client.idClient, this.client).subscribe(
      res => {
        console.log(res);

        //save address
        delete this.addr.client_idClient;
          this.addr.addressLine=this.street.value;
          this.addr.city=this.city.value;
          this.addr.country=this.coutry.value;
          this.addr.state=this.state.value;
          this.addr.postalCode=this.postalCode.value;
        if(this._service.addr!=null){
          this.updateAddress(this.client.idClient, this.addr);
        }else{
          this.saveAddress(this.addr);
        }
        this.updatePhone(this.client.idClient);
        this.updateSns(this.client.idClient);

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
