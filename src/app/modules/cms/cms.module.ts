import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../routing/app-routing.module';
import { AuthModule } from '../auth/auth.module';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AppRoutingModule,
    AuthModule
   ],
  providers: [ TranslateService ],
  exports: [ HomeComponent ]
})
export class CmsModule { }
