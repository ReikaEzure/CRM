import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/models/Login';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {
  
  contactDetail: User;
  email: any;
  roles;
  status;

  loading = false;
  buttionText = "Submit";
  

  constructor(private _service: UserService, private _authService: AuthenticationService, private _router: Router, private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadUserStatus();
    this.loadRoles();

    const params = this._activate.snapshot.params;
    if(params.id){
      this._service.getUserById(params.id).subscribe(
        res => {
          console.log(res);
          this.contactDetail=res;
          this.getEmail(this.contactDetail.login_idLogin);
        },
        err => {console.log(err.message);}
      );
    }

  }

  loadRoles(){
    this._service.loadRoles().subscribe(
      res => {
        this.roles = res;
        this._service.roles = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  loadUserStatus(){
    this._service.loadUserStatus().subscribe(
      res => {
        this.status = res;
        this._service.status = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  getEmail(id){
    this._service.getEmail(id).subscribe(
      res => {
        this.email=res;
        console.log(this.email);
      },
      error => console.log(error)
    );
  }
}
