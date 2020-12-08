import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Address } from '../../models/ClientCompany';
import { ClientCompany, Phone } from 'src/app/models/ClientCompany';
import { Invoice } from 'src/app/models/Invoice';
import { Office } from 'src/app/models/Office';
import { Project } from 'src/app/models/Project';
import { User } from 'src/app/models/User';
import { ClientService } from 'src/app/services/client.service';
import { OfficeService } from 'src/app/services/office.service';
import { PdfService } from 'src/app/services/pdf.service';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {

  office: Office;
  user: User;
  client: ClientCompany;
  project: Project;
  invoice: Invoice;
  phone: any;
  address: any;

  constructor(private _pdfService: PdfService,private _userService: UserService,
    private _clientService: ClientService, private _projectService: ProjectService,
    private _officeService: OfficeService, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this._activate.snapshot.params;
    if(params.id){
      this._projectService.getProject(params.id).subscribe(
        res => {
          this.project = res;
          console.log(res);
          this.getClient();
          this.getInvoice();
        },
        error => console.log(error)
      );
    }

    this.user=this._userService.loggedInUser;
    this._officeService.getOffice(this._userService.loggedInUser.idUser).subscribe(
      res => {
        this.office=res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  getClient(){
    this._clientService.getClient(this.project.client_idClient).subscribe(
      res => {
        this.client = res;
        console.log(res);
        this.getPhone();
        this.getAddress();
      },
      error => console.log(error)
    );
  }

  getPhone(){
    this._clientService.getPhone(this.client.idClient).subscribe(
      res => {
        this.phone = res;
        console.log(this.phone[0].phoneNumber);
      },
      error => console.log(error)
    );
  }

  getAddress(){
    this._clientService.getAddress(this.client.idClient).subscribe(
      res => {
        this.address = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  getInvoice(){
    this._pdfService.getInvoice(this.project.idProject).subscribe(
      res => {
        this.invoice = res;
        console.log(res);
        this._pdfService.invoice=res;
      },
      error => console.log(error)
    );
  }

  generatePDF(){
    this._pdfService.generatePdf(this.office, this.user, this.client, this.project, this.invoice, this.phone, this.address);
  }

}
