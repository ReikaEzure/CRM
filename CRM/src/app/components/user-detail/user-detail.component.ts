import { Component, OnInit } from '@angular/core';
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

  constructor(private _service: UserService, private _authService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginDetail = this._authService.loggedInUser;
    this.getUser();
    console.log(this.loginDetail, this.loggedInUser);

  }

  getUser(){
    this._service.getUser(this.loginDetail.idLogin).subscribe(
      res => {
        this.loggedInUser = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

}
