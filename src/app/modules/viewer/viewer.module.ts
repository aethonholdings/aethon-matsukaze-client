import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewerComponent } from './components/viewer/viewer.component';
import { ApiService } from 'src/app/services/api/api.service';
import { UserModule } from '../user/user.module';

@NgModule({
  declarations: [ViewerComponent],
  imports: [
    CommonModule,
    UserModule
  ],
  providers: [ApiService],
  exports: [ViewerComponent]
})
export class ViewerModule { }
