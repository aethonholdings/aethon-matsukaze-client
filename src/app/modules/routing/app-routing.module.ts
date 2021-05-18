import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../cms/components/error/error.component';
import { HomeComponent } from '../cms/components/home/home.component';
import { AuthComponent } from '../cms/components/auth/auth.component';
import { ViewerComponent } from '../viewer/components/viewer/viewer.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sample', component: ViewerComponent, canActivate: [AuthGuard] },
  { path: 'auth', children: [
    { path: "login", component: AuthComponent },
    { path: "forgot", component: AuthComponent },
    { path: "create", component: AuthComponent },
    { path: "confirm", component: AuthComponent },
    { path: "reset", component: AuthComponent },
    { path: "checkEmail", component: AuthComponent },
    { path: "**", component: ErrorComponent }
  ]},
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
