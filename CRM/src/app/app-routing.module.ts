import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { HomeComponent } from './components/home/home.component';
import { ClientListComponent } from './components/client-list/client-list.component'; 
import { UserDetailComponent } from './components/user-detail/user-detail.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { TeamComponent } from './components/team/team.component';
import { TeamFormComponent } from './components/team-form/team-form.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { AppointmentDetailComponent } from './components/appointment-detail/appointment-detail.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { ClientDeatilComponent } from './components/client-deatil/client-deatil.component';
import { ContactListComponent } from './components/contact-list/contact-list.component';
import { ContactDetailComponent } from './components/contact-detail/contact-detail.component';
import { ProjectDetailComponent } from './components/project-detail/project-detail.component';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { TaskDetailComponent } from './components/task-detail/task-detail.component';
import { TaskFormComponent } from './components/task-form/task-form.component';
import { PromotionComponent } from './components/promotion/promotion.component';
import { PromotionFormComponent } from './components/promotion-form/promotion-form.component';
import { OfficeComponent } from './components/office/office.component';
import { OfficeFormComponent } from './components/office-form/office-form.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';
import { ReceivingEmailComponent } from './components/receiving-email/receiving-email.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationFormComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserDetailComponent },
  { path: 'clientForm', component: ClientFormComponent },
  { path: 'client', component: ClientListComponent },
  { path: 'clientDetail/:id', component: ClientDeatilComponent },
  { path: 'appointment', component: AppointmentListComponent },
  { path: 'appointmentDetail/:id', component: AppointmentDetailComponent },
  { path: 'appointmentForm', component: AppointmentFormComponent },
  { path: 'contact', component: ContactListComponent },
  { path: 'contact/client/:id', component: ContactListComponent },
  { path: 'contactDetail/:id', component: ContactDetailComponent },
  { path: 'project', component: ProjectListComponent },
  { path: 'project/:id', component: ProjectListComponent },
  { path: 'projectDetail/:id', component: ProjectDetailComponent },
  { path: 'projectForm', component: ProjectFormComponent },
  { path: 'team/:id', component: TeamComponent },
  { path: 'teamForm/:id', component: TeamFormComponent },
  { path: 'task/:id', component: TaskListComponent },
  { path: 'taskDetail/:id', component: TaskDetailComponent },
  { path: 'taskForm/:projectId', component: TaskFormComponent },
  { path: 'taskForm/edit/:id', component: TaskFormComponent },
  { path: 'promotion/:id', component: PromotionComponent },
  { path: 'promotionForm', component: PromotionFormComponent },
  { path: 'office', component: OfficeComponent },
  { path: 'officeForm', component: OfficeFormComponent },
  { path: 'invoice/:id', component: InvoiceComponent },
  { path: 'invoiceForm/:id', component: InvoiceFormComponent },
  { path: 'receivingEmail', component: ReceivingEmailComponent },
  { path: 'receivingEmail/:id', component: ReceivingEmailComponent },
  { path: 'changePass/:id', component: ChangePasswordComponent },
  { path: 'recoverPass', component: RecoverPasswordComponent },
  
  { path: "**", component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
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
                                  TeamFormComponent,
                                  TaskListComponent,
                                  TaskDetailComponent,
                                  TaskFormComponent,
                                  PromotionComponent,
                                  PromotionFormComponent,
                                  OfficeComponent,
                                  OfficeFormComponent,
                                  InvoiceComponent,
                                  InvoiceFormComponent,
                                  ReceivingEmailComponent,
                                  ChangePasswordComponent,
                                  RecoverPasswordComponent,
                                  PageNotFoundComponent
                                  ];