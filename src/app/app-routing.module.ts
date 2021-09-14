import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ComponentsComponent} from "../../projects/components/src/lib/components.component"
import {PageComponent} from "./page/page.component"
import { ComponentsModule} from "../../projects/components/src/lib/components.module"

const routes: Routes = [
  {
    path: 'scanbot',
    // component: PageComponent
    loadChildren: () => import('../../projects/components/src/lib/components.module').then(m => m.ComponentsModule)
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
