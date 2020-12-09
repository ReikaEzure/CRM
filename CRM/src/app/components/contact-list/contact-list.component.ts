import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { OfficeService } from 'src/app/services/office.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  contacts: any = [];
  status: any;

  constructor(private _userService: UserService, private _officeService: OfficeService, private _activate: ActivatedRoute, private _router: Router) { }

  ngOnInit(): void {
    this.loadUserStatus();

    const params = this._activate.snapshot.params;
    if(params.id){
      this._userService.getUserByClient(params.id).subscribe(
        res => {
          this.contacts = res;
          console.log(res);
        },
        error => console.log(error)
      );
    }else{
      console.log('Here');
      console.log(this._userService.loggedInUser.idUser);
      this._officeService.getOffice(this._userService.loggedInUser.idUser).subscribe(
        res => {
          this._officeService.office=res;
          console.log(this._officeService.office);
          this.getContactsfromOffice(this._officeService.office.idOffice);
          console.log(res);
        },
        error => console.log(error)
      );
    }
  }

  getContactsfromOffice(id){
    this._userService.getUserByOffice(id).subscribe(
      res => {
        this.contacts = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  getContacts(id){
    this._userService.getUserByOffice(id).subscribe(
      res => {
        this.contacts=res;
      },
      error => console.log(error)
    );
    
  }

  getEmail(id){
    this._userService.getEmail(id).subscribe(
      res => {
        return res;
      },
      error => console.log(error)
    );
  }

  loadUserStatus(){
    this._userService.loadUserStatus().subscribe(
      res => {
        this.status = res;
        this._userService.status = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }
}
