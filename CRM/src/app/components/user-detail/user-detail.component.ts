import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Email } from './../../../assets/smtp.js';

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

  loading = false;
  buttionText = "Submit";
  

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
    
  }

  changePass(){
    Email.send({
      Host : 'smtp.elasticemail.com',
      Username : 'info.rootlets@gmail.com',
      Password : 'D46160A6E891E75A73FC143A4FAA4E8A622B',
      To : 'reika.ezure@gmail.com',
      From : 'info.rootlets@gmail.com',
      Subject : 'Change password',
      Body : `
      <i>We received a request to change your password.</i> <br />
      <p>Use the link below to set up a new password for your account.</p><br />
      <p>If you did not request to chage your password, ignore this email and the link will expire on its own.</p> 
       `
      }).then( message => {alert(message); } );
        
  }

  register() {
    this.loading = true;
    this.buttionText = "Submiting...";
    let user = {
      name: 'Test',
      email: 'reika.ezure@gmail.com',
      idUser: this.loginDetail.idLogin
    }
    this._service.sendmail(user).subscribe(
      data => {
        let res:any = data; 
        console.log(
          `👏 > 👏 > 👏 > 👏 mail has been sent and the message id is ${res.messageId}`
        );
        this._router.navigate(['/receivingEmail']);
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      },() => {
        this.loading = false;
        this.buttionText = "Submit";
      }
    );
  }


}
