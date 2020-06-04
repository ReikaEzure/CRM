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
import { AppointmentDetailComponent } from './components/appointment-detail/appointment-detail.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { ClientDeatilComponent } from './components/client-deatil/client-deatil.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskFormComponent } from './components/task-form/task-form.component';


import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserDetailComponent },
  { path: 'clientForm', component: ClientFormComponent },
  { path: 'client', component: ClientListComponent },
  { path: 'clientDetail', component: ClientDeatilComponent },
  { path: 'appointment', component: AppointmentListComponent },
  { path: 'appointmentDetail', component: AppointmentDetailComponent },
  { path: 'appointmentForm', component: AppointmentFormComponent },
  { path: 'contact', component: ContactListComponent },
  { path: 'contactDetail', component: ContactDetailComponent },
  { path: 'project', component: ProjectListComponent },
  { path: 'projectDetail', component: ProjectDetailComponent },
  { path: 'projectForm', component: ProjectFormComponent },
  { path: 'team', component: TeamComponent },
  { path: 'task', component: TaskListComponent },
  { path: 'taskDetail', component: TaskDetailComponent },
  { path: 'taskForm', component: TaskFormComponent },
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
                                  HomeComponent,
                                  UserDetailComponent,
                                  ClientFormComponent,
                                  ClientListComponent,
                                  ClientDeatilComponent,
                                  AppointmentListComponent,
                                  AppointmentFormComponent,
                                  AppointmentDetailComponent,
                                  ContactListComponent,
                                  ContactDetailComponent,
                                  ProjectListComponent,
                                  ProjectFormComponent,
                                  ProjectDetailComponent,
                                  TeamComponent,
                                  TaskListComponent,
                                  TaskDetailComponent,
                                  TaskFormComponent,
                                  PageNotFoundComponent
                                  ];