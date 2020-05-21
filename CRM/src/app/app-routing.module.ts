import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { HomeComponent } from './components/home/home.component';
import { ClientListComponent } from './components/client-list/client-list.component'; 
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { TeamComponent } from './components/team/team.component';
import { TaskListComponent } from './components/task-list/task-list.component';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'clientForm', component: ClientFormComponent },
  { path: 'client', component: ClientListComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserDetailComponent },
  { path: 'contact', component: ContactListComponent },
  { path: 'project', component: ProjectListComponent },
  { path: 'appointment', component: AppointmentListComponent },
  { path: 'team', component: TeamComponent },
  { path: 'task', component: TaskListComponent },
  
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
                                  ClientListComponent,
                                  HomeComponent,
                                  UserDetailComponent,
                                  ContactListComponent,
                                  ProjectListComponent,
                                  AppointmentListComponent,
                                  TeamComponent,
                                  TaskListComponent,
                                  PageNotFoundComponent
                                  ];