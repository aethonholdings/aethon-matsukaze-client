import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../cms/components/error/error.component';
import { HomeComponent } from '../cms/components/home/home.component';
import { LoginComponent } from '../cms/components/login/login.component';
import { ViewerComponent } from '../viewer/components/viewer/viewer.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sample', component: ViewerComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  providers: [ ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
