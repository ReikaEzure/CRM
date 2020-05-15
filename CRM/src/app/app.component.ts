import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'CRM';
  bgimgs = ['bg1.jpg', 'bg2.jpg', 'bg3.jpg'];
  img = '';

  constructor(){
    this.img=this.bgimgs[this.getRandomInt(this.bgimgs.length)];
    document.body.style.backgroundImage = "url('/assets/img/"+this.img+"')";
    document.body.style.backgroundSize = 'cover';
  }

  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  
}
