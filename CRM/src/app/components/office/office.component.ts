import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Office } from 'src/app/models/Office';
import { OfficeService } from 'src/app/services/office.service';

@Component({
  selector: 'app-office',
  templateUrl: './office.component.html',
  styleUrls: ['./office.component.scss']
})
export class OfficeComponent implements OnInit {
  officeForm : FormGroup;

  edit : boolean = false;

  offices: any;

  offi : Office = {
    idOffice: 0,
    name: '',
    phone: '',
    nif: ''
  }
  constructor(private _fb: FormBuilder, private _service: OfficeService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.getOffices();
    this.officeForm=this._fb.group({
      office: ['', [Validators.required]]
    });
  }
  get office(){
    return this.officeForm.get('promotion'); 
  }

  getOffices(){
    this._service.getOffices().subscribe(
      res => {
        this.offices=res;
      },
      error => console.log(error)
    );
  }

  changeOfficeValue(e) {
    this.office.setValue(e.target.value, {
      onlySelf: true
    })
  }

  changeOffice(){

  }

  onSubmit(){
    console.log(this.officeForm.value);
    this.changeOffice();
  }



}
