import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GnommeComponent } from './gnommes/gnomme/gnomme.component';
import { GnommeListComponent } from './gnommes/gnomme-list/gnomme-list.component';

@NgModule({
  declarations: [
    AppComponent,
    GnommeComponent,
    GnommeListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
