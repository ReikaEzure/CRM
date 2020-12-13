import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

import { LoginNavComponent } from './components/login-nav/login-nav.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { NavigationClientComponent } from './components/navigation-client/navigation-client.component';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { AvatarComponent } from './components/avatar/avatar.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    LoginNavComponent,
    NavigationComponent,
    NavigationClientComponent,
    AvatarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [
    AuthenticationService,
    UserService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
