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
      //if id has passed from url, use it as idClient and get contacts list of clients
      this._userService.getUserByClient(params.id).subscribe(
        res => {
          this.contacts = res;
          console.log(res);
        },
        error => console.log(error)
      );
    }else{
      //if no id has been passed with url, show employees contact list
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

  //get contacts list of all the employees that works in same office
  getContactsfromOffice(id){
    this._userService.getUserByOffice(id).subscribe(
      res => {
        this.contacts = res;
        console.log(res);
      },
      error => console.log(error)
    );
  }

  //get email address of user
  getEmail(id){
    this._userService.getEmail(id).subscribe(
      res => {
        return res;
      },
      error => console.log(error)
    );
  }

  //load user status
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
