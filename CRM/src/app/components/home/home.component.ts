import { Component, OnInit } from '@angular/core';
import { PdfService } from 'src/app/services/pdf.service';
import { Login } from '../../models/Login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loginUser: Login = {
    idLogin: 0,
    username: '',
    password: '',
    email: ''  
  };

  constructor(private _pdfService: PdfService) { }

  ngOnInit(): void {
  }

  generatePDF(){
    
  }

}
