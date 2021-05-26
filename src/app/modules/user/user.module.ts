import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../routing/app-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";

import { FlowComponent } from './components/flow/flow.component';
import { LoginComponent } from './components/flowStates/login/login.component';
import { CreateComponent } from './components/flowStates/create/create.component';
import { ForgotComponent } from './components/flowStates/forgot/forgot.component';
import { ResetComponent } from './components/flowStates/reset/reset.component';
import { ConfirmComponent } from './components/flowStates/confirm/confirm.component';
import { PasswordCheckerComponent } from './components/widgets/password-checker/password-checker.component';
import { UsernameComponent } from './components/widgets/username/username.component';
import { PasswordComponent } from './components/widgets/password/password.component';
import { HomeComponent } from './components/home/home.component';



@NgModule({
  declarations: [
    LoginComponent,
    CreateComponent,
    ConfirmComponent,
    PasswordCheckerComponent,
    UsernameComponent,
    PasswordComponent,
    ForgotComponent,
    ResetComponent,
    FlowComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AppRoutingModule,
    NgxSpinnerModule
  ],
  providers: [],
  exports: [
    FlowComponent,
    HomeComponent
  ]
})
export class UserModule { }
