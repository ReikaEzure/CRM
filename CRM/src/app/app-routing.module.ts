import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'clientForm', component: ClientFormComponent },
  { path: 'home', component: HomeComponent },
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
                                  LoginComponent,
                                  RegistrationFormComponent,
                                  ClientFormComponent,
                                  HomeComponent,
                                  PageNotFoundComponent
                                  ];