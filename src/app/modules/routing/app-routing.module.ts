import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiService } from 'src/app/services/api/api.service';
import { ErrorComponent } from '../cms/components/error/error.component';
import { HomeComponent } from '../cms/components/home/home.component';
import { LoginComponent } from '../cms/components/login/login.component';
import { ViewerComponent } from '../viewer/components/viewer/viewer.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sample', component: ViewerComponent, canActivate: [AuthGuard] },
  { path: 'order', component: HomeComponent },
  { path: 'social', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers: [
    ApiService
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
