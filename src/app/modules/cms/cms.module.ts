import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './components/root/root.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthComponent } from './components/auth/auth.component';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { AppRoutingModule } from '../routing/app-routing.module';
import { UserModule } from '../user/user.module';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    RootComponent,
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
  exports: [ RootComponent ]
})
export class CmsModule { }
