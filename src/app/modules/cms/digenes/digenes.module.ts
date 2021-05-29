import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { UserModule } from '../../user/user.module';
import { AppRoutingModule } from '../../routing/app-routing.module';

import { RootComponent } from './components/root/root.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AuthComponent } from './components/auth/auth.component';
import { ErrorComponent } from './components/error/error.component';
import { PublicationsComponent } from './components/publications/publications.component';
import { TeamComponent } from './components/team/team.component';
import { BooksComponent } from './components/books/books.component';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { SplashComponent } from './components/splash/splash.component';

@NgModule({
  declarations: [
    RootComponent,
    NavbarComponent,
    AuthComponent,
    ErrorComponent,
    PublicationsComponent,
    TeamComponent,
    BooksComponent,
    CopyrightComponent,
    SplashComponent
  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    TranslateModule,
    AppRoutingModule,
    UserModule
   ],
  providers: [ TranslateService ],
  exports: [ RootComponent ]
})
export class DigenesModule { }
