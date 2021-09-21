import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatStepperModule} from '@angular/material/stepper/'
import {TextFieldModule} from '@angular/cdk/text-field';
import { NuevosTicketsComponent } from './nuevos-tickets/nuevos-tickets.component';
import { CompletarTicketComponent } from './completar-ticket/completar-ticket/completar-ticket.component';
import { LoginComponent } from './login/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup/signup.component';
import { LoginComponentJwt } from './auth/login/login.component';import { AuthComponent } from './auth/auth.component';
import { AuthRegisterComponent } from './auth/auth.register.component';
import { AlertComponent } from 'app/_directives/alert.component';
import { TicketsTableComponent } from './tickets-table/tickets-table.component';
import { PasswordComponent } from './password/password/password.component';
 ''
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatSelectModule,
    MatStepperModule,
    TextFieldModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FooterComponent,
    AlertComponent,
    NavbarComponent,
    SidebarComponent,
    NuevosTicketsComponent,
    CompletarTicketComponent,
    LoginComponent,
    SignupComponent,
    LoginComponentJwt,
    AuthComponent,
    AuthRegisterComponent,
    TicketsTableComponent,
    PasswordComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  

})
export class ComponentsModule { }
