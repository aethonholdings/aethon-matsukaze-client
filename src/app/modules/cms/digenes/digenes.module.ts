import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';

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
import { PublicationModule } from '../../publication/publication.module';
import { MailingComponent } from './components/mailing/mailing.component';
import { RedirectComponent } from './components/redirect/redirect.component';
import { FacebookComponent } from './components/facebook/facebook.component';
import { SocialComponent } from './components/social/social.component';
import { ArtworkComponent } from './components/artwork/artwork.component';
import { OrderComponent } from './components/order/order.component';
import { CallToActionComponent } from './components/call-to-action/call-to-action.component'

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
    SplashComponent,
    MailingComponent,
    RedirectComponent,
    FacebookComponent,
    SocialComponent,
    ArtworkComponent,
    OrderComponent,
    CallToActionComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    AppRoutingModule,
    PublicationModule,
    UserModule
   ],
  providers: [ TranslateService ],
  exports: [ RootComponent ]
})
export class DigenesModule {}
