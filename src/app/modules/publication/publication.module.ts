import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicationService } from './services/publication.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [ PublicationService ]
})
export class PublicationModule { }
