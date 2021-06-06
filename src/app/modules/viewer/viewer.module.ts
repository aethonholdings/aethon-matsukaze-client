import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ViewerRoutingModule } from './viewer-routing.module';
import { ViewportComponent } from './components/viewport/viewport.component';
import { PublicationComponent } from './components/publication/publication.component';
import { AssetPackageComponent } from './components/asset-package/asset-package.component';
import { AssetComponent } from './components/asset/asset.component';
import { ControllerComponent } from './components/controller/controller.component';


@NgModule({
  declarations: [
    ViewportComponent,
    PublicationComponent,
    AssetPackageComponent,
    AssetComponent,
    ControllerComponent
  ],
  imports: [
    CommonModule,
    ViewerRoutingModule
  ]
})
export class ViewerModule { }
