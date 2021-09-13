import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageComponent } from './page/page.component';
import {ComponentsModule} from "../../projects/components/src/lib/components.module"

@NgModule({
  declarations: [
    AppComponent,
    PageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ComponentsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
