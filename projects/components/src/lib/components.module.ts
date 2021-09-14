import {NgModule} from '@angular/core';
import {ComponentsComponent} from './components.component';
import {HomeComponent} from "./home/home.component"
import {DocumentScannerComponent} from "./document-scanner/document-scanner.component"
import {ImageResultsComponent} from "./image-results/image-results.component"
import {ImageDetailsComponent} from "./image-details/image-details.component"
import {CroppingComponent} from "./cropping/cropping.component"
import {CommonModule} from "@angular/common"
import {ToastrModule} from "ngx-toastr"
import {RouterModule, Routes} from "@angular/router"
import {ScanbotSdkService} from "./service/scanbot-sdk-service"
import {DocumentRepository} from "./service/document-repository"

const routes: Routes = [{
  path: '',
  component: ComponentsComponent,
  children: [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'scanner',
      component: DocumentScannerComponent
    },
    {
      path: 'results',
      component: ImageResultsComponent
    },
    {
      path: 'crop',
      component: CroppingComponent
    },
    {
      path: 'details',
      component: ImageDetailsComponent
    }]
}];

@NgModule({
  declarations: [
    ComponentsComponent,
    HomeComponent,
    DocumentScannerComponent,
    ImageResultsComponent,
    ImageDetailsComponent,
    CroppingComponent
  ],
  imports: [
    CommonModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes)
  ],
  exports: [
    ComponentsComponent
  ],
  providers: [ScanbotSdkService, DocumentRepository]
})
export class ComponentsModule {
}
