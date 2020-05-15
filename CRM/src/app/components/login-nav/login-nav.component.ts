import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-nav',
  template: `
  <div class="col-md-6 offset-md-3 ">
    <div class="card border-light">
      <div class="card-header">
        <ul class="nav nav-tabs nav-fill card-header-tabs">
          <li class="nav-item">
            <a class="nav-link" routerLink="/login" routerLinkActive="active current">Login</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" routerLink="/registration" routerLinkActive="active current">Register</a>
          </li>
        </ul>  
      </div>
      <router-outlet></router-outlet>
    </div>
  </div>
  `,
  styles: [`
    .card { background-color: transparent; }
  `]
})
export class LoginNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
