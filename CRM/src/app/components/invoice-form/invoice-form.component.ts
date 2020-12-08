import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from 'src/app/models/Invoice';
import { Project } from 'src/app/models/Project';
import { PdfService } from 'src/app/services/pdf.service';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  invoiceForm: FormGroup;
  edit : boolean = false;

  invoice : Invoice = {
    idInvoice: 0,
    issueDate: new Date(),
    total: 0,
    iva: 0,
    irpf: 0,
    subtotal: 0,
    neto: 0,
    project_idProject: 0
  }

  project: Project;

  constructor(private _fb: FormBuilder, private _pdfService: PdfService, private _projectService: ProjectService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.invoiceForm=this._fb.group({
      total: [0, [Validators.required]],
      iva: [0, [Validators.required]],
      irpf: [0, [Validators.required]],
      subtotal: [0,[Validators.required]],
      neto: [0, [Validators.required]]
    });

    const params = this._activate.snapshot.params;
    if(params.id){
      this._pdfService.getInvoice(params.id).subscribe(
        res => {
          this.invoice = res;
          this._pdfService.invoice = res;
          console.log(res);
        },
        error => console.log(error)
      );
    }
    
    this.project=this._projectService.project;
  }

  get total(){
    return this.invoiceForm.get('total');
  }

  get subtotal(){
    return this.invoiceForm.get('subtotal');
  }

  get iva(){
    return this.invoiceForm.get('iva');
  }

  get irpf(){
    return this.invoiceForm.get('irpf');
  }

  get neto(){
    return this.invoiceForm.get('neto');
  }

  updateInvoice(){
    this.invoice.total=this.total.value;
    this.invoice.subtotal=this.subtotal.value;
    this.invoice.iva=this.iva.value;
    this.invoice.neto=this.neto.value;
    this.invoice.irpf=this.irpf.value;
    this.invoice.issueDate.toISOString;
    delete this.invoice.createdDate;
    delete this.invoice.updatedDate;
    this.invoice.project_idProject=this.project.idProject;

    this._pdfService.updateInvoice(this.invoice.idInvoice, this.invoice).subscribe(
      res =>{
        console.log(res);
        this._router.navigate(['/project/']);
      },
      err => {console.log(err);}
    );
  }

  saveNewInvoice(){
    delete this.invoice.idInvoice;
    this.invoice.total=this.total.value;
    this.invoice.subtotal=this.subtotal.value;
    this.invoice.iva=this.iva.value;
    this.invoice.neto=this.neto.value;
    this.invoice.irpf=this.irpf.value;
    this.invoice.issueDate.toISOString;
    delete this.invoice.createdDate;
    delete this.invoice.updatedDate;
    this.invoice.project_idProject=this.project.idProject;

    this._pdfService.saveInvoice(this.invoice).subscribe(
      res =>{
        console.log(res);
        this._router.navigate(['/project']);
      },
      err => {console.log(err);}
    );

  }

  onSubmit(){
    console.log(this.invoiceForm.value);
    this.saveNewInvoice();
    this._router.navigate(['/project']);
  }
}
