import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Office } from 'src/app/models/Office';
import { OfficeService } from 'src/app/services/office.service';

@Component({
  selector: 'app-office-form',
  templateUrl: './office-form.component.html',
  styleUrls: ['./office-form.component.scss']
})
export class OfficeFormComponent implements OnInit {
  officeForm : FormGroup;

  edit : boolean = false;

  office : Office = {
    idOffice: 0,
    name: '',
    phone: '',
    nif: ''
  }
  constructor(private _fb: FormBuilder, private _service: OfficeService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.officeForm=this._fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      nif: ['', [Validators.required]]
    });
  }
  get name(){
    return this.officeForm.get('name');
  }

  get phone(){
    return this.officeForm.get('phone');
  }

  get nif(){
    return this.officeForm.get('nif');
  }

  //update office detail
  updateOffice(){
    this.office.name=this.name.value;
    this.office.phone=this.phone.value;
    this.office.nif=this.nif.value;
    console.log(this.office);

    this._service.updateOffice(this.office.idOffice, this.office).subscribe(
      res =>{
        console.log(res);
        this._router.navigate(['/user/']);
      },
      err => {console.log(err);}
    );
  }

  //save new office
  saveNewOffice(){
    delete this.office.idOffice;
    this.office.name=this.name.value;
    this.office.phone=this.phone.value;
    this.office.nif=this.nif.value;
    console.log(this.office);

    this._service.saveOffice(this.office).subscribe(
      res =>{
        console.log(res);
        this._router.navigate(['/user/']);
      },
      err => {console.log(err);}
    );

  }

  onSubmit(){
    console.log(this.officeForm.value);
    this.saveNewOffice();
  }

}
