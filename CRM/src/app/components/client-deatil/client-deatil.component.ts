import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from 'src/app/services/client.service';

import { ClientCompany, Address, Phone, Sns, ClientType } from '../../models/ClientCompany';

@Component({
  selector: 'app-client-deatil',
  templateUrl: './client-deatil.component.html',
  styleUrls: ['./client-deatil.component.scss']
})
export class ClientDeatilComponent implements OnInit {

  clientTypes : any = [];

  addr: Address = {};

  phones: any;

  socials: any;

  client: ClientCompany = {
    idClient: 0,
    companyName: '',
    nif: '',
    industry: '',
    email: '',
    createdDate: new Date(),
    updatedDate: new Date(),
    preference: '',
    clientType_idClientType: 0,
    phone: [],
    address: this.addr,
    sns: []

  }

  constructor(private _service: ClientService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadClientTypes();

    const params = this._activate.snapshot.params;
    if(params.id){
      this._service.getClient(params.id).subscribe(
        res => {
          this.client=res;
          this._service.clientCompany=res;
        },
        err => {console.log(err.message);}
      );
      this._service.getAddress(params.id).subscribe(
        res => {
          this.addr=res;
          this._service.addr=res;
          this.client.address=this.addr;
        },
        err => {console.log(err.message);}
      );
      this._service.getPhone(params.id).subscribe(
        res => {
          this.phones=res;
          this._service.phone=res;
          this.client.phone=this.phones;
        },
        err => {console.log(err.message);}
      );
      this._service.getSns(params.id).subscribe(
        res => {
          this.socials=res;
          this._service.sns=res;
          this.client.sns=this.socials;
          console.log(this.client);
        },
        err => {console.log(err.message);}
      );

    }
    
  }

  loadClientTypes(){
    this._service.loadClientTypes().subscribe(
      res => {
        this.clientTypes = res;
        console.log('loading client types...');
        console.log(res);
      },
      error => console.log(error)
    );
  }

}
