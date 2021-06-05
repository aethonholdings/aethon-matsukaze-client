import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from "ngx-spinner";

import { AppRoutingModule } from './modules/routing/app-routing.module';
import { AppComponent } from './components/app/app.component';
import { DigenesModule } from './modules/cms/digenes/digenes.module';
import { UserModule } from './modules/user/user.module';
import { ViewerModule } from './modules/viewer/viewer.module';
import { PersistenceService } from './services/persistence/persistence.service';
import { ApiService } from './services/api/api.service';
import { FilesystemService } from './services/filesystem/filesystem.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    UserModule,
    DigenesModule,
    ViewerModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    ApiService,
    PersistenceService,
    FilesystemService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
