import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  pdfMake: any;

  constructor() { }

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
  async generatePdf() {
    await this.loadPdfMaker();
    const def = { content: 'A sample PDF document generated using Angular and PDFMake' };
    this.pdfMake.createPdf(def).open();
  }
}
