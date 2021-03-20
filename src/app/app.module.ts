import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './modules/routing/app-routing.module';
import { RootModule } from './modules/root/root.module';
import { RootComponent } from './modules/root/components/root/root.component';

@NgModule({
  declarations: [

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RootModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
