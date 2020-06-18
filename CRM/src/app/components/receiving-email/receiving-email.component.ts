import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-receiving-email',
  template: `
    <p>
      We have sent you an email to reset your password! 
    </p>
    <a class="nav-link active" routerLink="/home" routerLinkActive="active">Got it!</a>
  `,
  styles: []
})
export class ReceivingEmailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
