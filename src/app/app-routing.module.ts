import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ComponentsComponent} from "../../projects/components/src/lib/components.component"
import {PageComponent} from "./page/page.component"

const routes: Routes = [
  {
    path: 'page',
    component: PageComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
