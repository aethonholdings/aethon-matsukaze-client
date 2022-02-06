import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeamComponent } from '../cms/digenes/components/team/team.component';
import { BooksComponent } from '../cms/digenes/components/books/books.component';
import { RootComponent } from '../cms/digenes/components/root/root.component';
import { RedirectComponent } from '../cms/digenes/components/redirect/redirect.component';
import { EpicComponent } from '../cms/digenes/components/epic/epic.component';
import { EagleComponent } from '../cms/digenes/components/eagle/eagle.component';
import { SketchesComponent } from '../cms/digenes/components/sketches/sketches.component';
import { PinupsComponent } from '../cms/digenes/components/pinups/pinups.component';
import { ProcessComponent } from '../cms/digenes/components/process/process.component';
// import { FamilyTreeComponent } from '../cms/digenes/components/family-tree/family-tree.component';

const routes: Routes = [
  { path: '', component: RootComponent },
  { path: 'team', component: TeamComponent },
  { path: 'books', component: BooksComponent },
  { path: 'history/about', component: EpicComponent },
  { path: 'history/eagle', component: EagleComponent },
  // { path: 'history/families', component: FamilyTreeComponent },
  { path: 'artwork/sketches', component: SketchesComponent },
  { path: 'artwork/pinups', component: PinupsComponent },
  { path: 'artwork/process', component: ProcessComponent },
  { path: 'order', component: RedirectComponent },
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
