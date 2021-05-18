import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../routing/app-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";

import { LoginComponent } from './components/login/login.component';
import { CreateComponent } from './components/create/create.component';
import { ValidateService } from './services/validate/validate.service';
import { ConfirmComponent } from './components/confirm/confirm.component';
import { PasswordCheckerComponent } from './components/password-checker/password-checker.component';
import { UsernameComponent } from './components/username/username.component';
import { PasswordComponent } from './components/password/password.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { ResetComponent } from './components/reset/reset.component';

@NgModule({
  declarations: [
    LoginComponent,
    CreateComponent,
    ConfirmComponent,
    PasswordCheckerComponent,
    UsernameComponent,
    PasswordComponent,
    ForgotComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AppRoutingModule,
    NgxSpinnerModule
  ],
  providers: [
    ValidateService
  ],
  exports: [
    LoginComponent,
    ConfirmComponent,
    CreateComponent,
    ForgotComponent,
    ResetComponent
  ]
})
export class UserModule { }
