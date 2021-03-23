import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from '../auth/components/auth/auth.component';
import { HomeComponent } from '../cms/components/home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'sample', component: HomeComponent },
  { path: 'order', component: HomeComponent },
  { path: 'social', component: HomeComponent },
  { path: 'login', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
