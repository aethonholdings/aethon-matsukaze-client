import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/routing/app-routing.module';
import { RootComponent } from './components/root/root.component';
import { CmsModule } from './modules/cms/cms.module';
import { AuthModule } from './modules/auth/auth.module';
import { ApiModule } from './modules/api/api.module';

@NgModule({
  declarations: [
    RootComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    CmsModule,
    ApiModule
  ],
  bootstrap: [ RootComponent ]
})
export class AppModule { }
