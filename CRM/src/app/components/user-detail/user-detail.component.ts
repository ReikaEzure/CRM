import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Email } from './../../../assets/smtp.js';

import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Login } from 'src/app/models/Login';
import { User } from 'src/app/models/User';
import { CookieService } from 'ngx-cookie-service';
import mergeImages from 'merge-images';
import { Office } from 'src/app/models/Office.js';
import { OfficeService } from 'src/app/services/office.service.js';

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
  modify: boolean;
  ava ={
    imagenes: [],
    modify: false
  };
  
  office: Office = {
    idOffice: 0,
    name: '',
    phone: '',
    nif: ''
  };

  constructor(private _service: UserService, private _authService: AuthenticationService, 
    private _officeService: OfficeService, private _router: Router, private _cookie: CookieService) { }

  ngOnInit(): void {
    this.getOffice(this._service.loggedInUser.idUser);
    this.loadRoles();
    this.loadUserStatus();
    this.loginDetail = this._authService.loginDetail;
    this.loggedInUser = this._service.loggedInUser;
    console.log(this.office);
    console.log(this.loginDetail, this.loggedInUser);
    if(this.loggedInUser.avatar!=null){
      
      let imgs=[];
      imgs=this.loggedInUser.avatar.split(',');
      this.ava.imagenes=imgs;
      console.log(imgs);
      this.merge(imgs);
    }
    
  }

  getOffice(id){
    this._officeService.getOffice(id).subscribe(
      res => {
        this.office = res;
        this._officeService.office=res;
        console.log(res);
      },
      error => console.log(error)
    );
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

  // load user status (working, on leave, in meeting, be back soon)
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

  logout(event: Event): void {
    event.preventDefault(); // Prevents browser following the link

    this._service.logout(this.loggedInUser.idUser).subscribe(
      res => {
        // delete all saved user data from services and cookie
        this._service.loggedInUser=null;
        this._authService.loginDetail=null;
        this._authService.isLoggedIn=false;
        this._cookie.delete('password');
        this._cookie.delete('username');
        console.clear()
        this._router.navigate(['/login']);
        
        console.log(res);
      },
      error => console.log(error)
    );
  }

  

  changePass() {
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


  merge(imgs:string[]){
    this.ava.imagenes=imgs;
    mergeImages(imgs).then(b64 => document.querySelector('#ava').setAttribute('src', b64));
  }

  clickModificar(ava){
    ava.modify =! ava.modify;
  }

  accionCancelar(ava){
    console.log("Cancelado");
    ava.modify = false;
  }

  
  accionEnviar(event){
    console.log("Los que ha elegido")
    for(var i=0;i<event.length;i++){
      console.log(event[i]);
    }
    this.merge(event);
  }


}
