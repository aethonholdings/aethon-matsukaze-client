import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from '../user/components/home/home.component';
import { TeamComponent } from '../cms/digenes/components/team/team.component';
import { BooksComponent } from '../cms/digenes/components/books/books.component';
import { ErrorComponent } from '../cms/digenes/components/error/error.component';
import { RootComponent } from '../cms/digenes/components/root/root.component';
import { AuthComponent } from '../cms/digenes/components/auth/auth.component';

const routes: Routes = [
  { path: '', component: RootComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'team', component: TeamComponent },
  { path: 'books', component: BooksComponent },
  { path: 'viewer', loadChildren: () => import('../viewer/viewer.module').then(m => m.ViewerModule) },
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
