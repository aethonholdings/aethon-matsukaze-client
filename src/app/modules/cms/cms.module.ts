import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthComponent } from './components/auth/auth.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../routing/app-routing.module';
import { UserModule } from '../user/user.module';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    HomeComponent,
    NavbarComponent,
    AuthComponent,
    ErrorComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AppRoutingModule,
    UserModule
   ],
  providers: [ TranslateService ],
  exports: [ HomeComponent ]
})
export class CmsModule { }
