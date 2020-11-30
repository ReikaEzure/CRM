import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Address } from '../models/ClientCompany';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable } from 'rxjs';
import { ClientCompany, Phone } from '../models/ClientCompany';
import { Invoice } from '../models/Invoice';
import { Office } from '../models/Office';
import { Project } from '../models/Project';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  pdfMake: any;

  _url = 'http://localhost:3000/invoice';

  invoices : Invoice[];
  invoice : Invoice;

  constructor(private _http: HttpClient) { }

  getInvoices(){
    return this._http.get(`${this._url}`);
  }

  getInvoice(id: String | number){
    return this._http.get(`${this._url}/${id}`);
  }

  saveInvoice(invoice: Invoice){
    return this._http.post(`${this._url}`, invoice);
  }

  deleteInvoice(id: String | number){
    return this._http.delete(`${this._url}/${id}`);
  }

  updateInvoice(id: String | number, invoice: Invoice): Observable<Invoice>{
    return this._http.put(`${this._url}/${id}`, invoice);
  }

  //load the PDFMake library
  async loadPdfMaker() {
    if (!this.pdfMake) {
      const pdfMakeModule = await import('pdfmake/build/pdfmake');
      const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
      this.pdfMake = pdfMakeModule.default;
      this.pdfMake.vfs = pdfFontsModule.default.pdfMake.vfs;
    }
  }
  
  //generate pdf
  async generatePdf(office: Office, user: User, client: ClientCompany, project: Project, invoice: Invoice, phone: Phone[], address: Address) {
    await this.loadPdfMaker();
    const def = { 
      content: [
        {
          style: 'tableExample',
          table: {
            body: [
              ['Invoice', 'Number: '+invoice.idInvoice],
              ['', 'Issue date:   '+invoice.issueDate]
            ]
          },
          layout: 'noBorders'
        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
        {
          style: 'tableExample',
          table: {
            body: [
              [client.companyName, ''],
              [address.addressLine+' '+address.city+' '+address.state+' '+address.postalCode+ ' '+address.country, ''],
              ['NIF:   '+client.nif, ''],
              ['Tel:   '+phone[0].phoneNumber, 'Day of order: '+project.createdDate],
              ['Email: '+client.email, 'Day of submission: '+project.actualCompletionDate],
            ]
          },
          layout: 'noBorders'
        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
        'Concept',
        {
          style: 'tableExample',
          table: {
            body: [
              ['Project tittle', project.title],
              ['Description', project.description]
            ]
          },
          layout: 'noBorders'
        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
        {
          style: 'tableExample',
          table: {
            body: [
              ['Subtotal', invoice.subtotal],
              ['IVA', invoice.iva],
              ['Total: ', invoice.total],
            ]
          },
          layout: 'noBorders'
        },
        {canvas: [ { type: 'line', x1: 0, y1: 0, x2: 515, y2: 0, lineWidth: 1 } ]},
        office.name,
        office.nif,
        office.phone,
        'Payment should be done within 15 days',
        'Professional services that, having as their object their original artistic creations (illustrations), are provided to third parties by natural persons who are authors of paintings, drawings, engravings, lithographs, comic strips, comics or comics, as well as their essays and sketches and other original plastic works, whether or not they are applied.'
      ] 
    };
    console.log("genarating pdf...");
    this.pdfMake.createPdf(def).open();
  }
}
