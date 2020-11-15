import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receiving-email',
  template: `
    <div class="jumbotron bg-white p-0">
      <p>
        We have sent you an email to reset your password! 
      </p>
      <a class="nav-link active" routerLink="/home" routerLinkActive="active">Got it!</a>
    </div>
  `,
  styles: []
})
export class ReceivingEmailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
