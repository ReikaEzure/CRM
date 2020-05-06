import { Component, OnInit } from '@angular/core';
import { Login } from '../../models/Login';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  loginUser: Login = {
    id: 0,
    username: '',
    password: '',
    email: ''  
  };

  constructor() { }

  ngOnInit(): void {
  }

}
