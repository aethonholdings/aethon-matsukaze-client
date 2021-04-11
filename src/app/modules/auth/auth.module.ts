import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { AppRoutingModule } from '../routing/app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { CreateComponent } from './components/create/create.component';
import { ValidateService } from './services/validate/validate.service';
import { ConfirmComponent } from './components/confirm/confirm.component';

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    CreateComponent,
    ConfirmComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AppRoutingModule
  ],
  providers: [
    TranslateService,
    ValidateService
  ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
