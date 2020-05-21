import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CRM';
  bgimgs = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg'];
  img = '';

  isLoggedin=false;

  constructor(private _router: Router, private _authService: AuthenticationService){
    if(!this.isLoggedin){
      this.img=this.bgimgs[this.getRandomInt(this.bgimgs.length)];
      document.body.style.backgroundImage = "url('/assets/img/"+this.img+"')";
    }else{
      document.body.removeAttribute("style");
    }
    
  }

  ngOnInit(){
    this._router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
       this.isLoggedin = this._authService.isLoggedIn;
      }
    })
    console.log(this.isLoggedin);
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

  
}
