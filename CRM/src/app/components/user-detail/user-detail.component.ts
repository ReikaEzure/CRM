import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Login } from 'src/app/models/Login';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  loginDetail: Login;
  loggedInUser: User;
  roles;
  status;

  constructor(private _service: UserService, private _authService: AuthenticationService, private _router: Router) { }

  ngOnInit(): void {
    this.loginDetail = this._authService.loginDetail;
    this.roles = this._service.roles;
    this.status = this._service.status;
    this.getUser();
    console.log(this.loginDetail, this.loggedInUser);

  }

  getUser(){
    this._service.getUser(this._authService.loginDetail.idLogin).subscribe(
      res => {
        this._service.loggedInUser=res;
        this.loggedInUser = res;
        
        console.log(res);
      },
      error => console.log(error)
    );
  }

  logout(event: Event): void {
    event.preventDefault(); // Prevents browser following the link
    this._service.loggedInUser=null;
    this._authService.loginDetail=null;
    this._authService.isLoggedIn=false;
    console.clear()
    this._router.navigate(['/login']);
    
    // Here you can call your service method to logout the user
    // and then redirect with Router object, for example
  }


}
