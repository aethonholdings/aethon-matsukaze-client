import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './components/auth/auth.component';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateService } from '@ngx-translate/core';
import { AppRoutingModule } from '../routing/app-routing.module';

@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    AppRoutingModule
  ],
  providers: [ TranslateService ],
  exports: [
    AuthComponent
  ]
})
export class AuthModule { }
