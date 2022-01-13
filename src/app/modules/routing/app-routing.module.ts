import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from '../cms/digenes/components/team/team.component';
import { BooksComponent } from '../cms/digenes/components/books/books.component';
import { RootComponent } from '../cms/digenes/components/root/root.component';
import { SocialComponent } from '../cms/digenes/components/social/social.component';
import { RedirectComponent } from '../cms/digenes/components/redirect/redirect.component';
import { ArtworkComponent } from '../cms/digenes/components/artwork/artwork.component';

const routes: Routes = [
  { path: '', component: RootComponent },
  { path: 'team', component: TeamComponent },
  { path: 'books', component: BooksComponent },
  { path: 'social', component: SocialComponent },
  { path: 'artwork', component: ArtworkComponent},
  { path: 'preorder', component: RedirectComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'}),
  ],
  providers: [ ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
