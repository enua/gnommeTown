import { GnommeComponent } from './gnommes/gnomme/gnomme.component';
import { GnommeListComponent } from './gnommes/gnomme-list/gnomme-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
 /*  { path:  '', pathMatch:  'full', redirectTo:  'list' },
  { path: 'list', component: GnommeListComponent },
  { path: 'details/:id', component: GnommeComponent }, */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
