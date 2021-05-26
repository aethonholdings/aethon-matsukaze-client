import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../cms/components/error/error.component';
import { RootComponent } from '../cms/components/root/root.component';
import { AuthComponent } from '../cms/components/auth/auth.component';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from '../user/components/home/home.component';

const routes: Routes = [
  { path: '', component: RootComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
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
