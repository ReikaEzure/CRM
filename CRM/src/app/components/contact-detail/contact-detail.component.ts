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
    this.roles = this._service.roles;
    this.status = this._service.status;

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

  getEmail(id){
    this._service.getEmail(id).subscribe(
      res => {
        console.log(res);
        this.email=res;
      },
      error => console.log(error)
    );
}
}
