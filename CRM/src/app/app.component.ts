import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CRM';
  bgimgs = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg'];
  img = '';

  cookieValue: string;

  isLoggedin=false;

  constructor(private _router: Router, private _authService: AuthenticationService, private _cookie: CookieService){
    if(!this.isLoggedin){
      this.img=this.bgimgs[this.getRandomInt(this.bgimgs.length)];
      document.body.style.backgroundImage = "url('/assets/img/"+this.img+"')";
    }else{
      document.body.style.backgroundImage = null;
      document.body.style.backgroundColor = "white";
    }
    
  }

  ngOnInit(){
    if(this._cookie.check('password') && this._cookie.check('username')){
      //get cookie
      this.isLoggedin = true;
      this._authService.isLoggedIn = true;
    }

    this._router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
       this.isLoggedin = this._authService.isLoggedIn;
      }
    })

  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  
}
