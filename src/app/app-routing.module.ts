import { HomeComponent } from './home/home.component';
import { GnommeListComponent } from './gnommes/gnomme-list/gnomme-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path:  '', pathMatch:  'full', redirectTo:  'home' },
  { path: 'home', component: HomeComponent },
  { path: 'list', component: GnommeListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
