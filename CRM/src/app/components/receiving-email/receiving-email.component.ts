import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receiving-email',
  template: `
    <div class="jumbotron bg-white p-0">
      <p>
        We have sent you an email to reset your password! 
      </p>
      <div *ngIf="toLogin"><a class="nav-link active" routerLink="/login" routerLinkActive="active">Got it!</a></div>
      <div *ngIf="!toLogin"><a class="nav-link active" routerLink="/client" routerLinkActive="active">Got it!</a></div>
      
    </div>
  `,
  styles: []
})
export class ReceivingEmailComponent implements OnInit {
  toLogin=false;
  constructor(private _activate: ActivatedRoute) { }

  ngOnInit(): void {
    const params = this._activate.snapshot.params;
    if(params.id){
      this.toLogin=true;
    }
  }

}
