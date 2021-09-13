import { NgModule } from '@angular/core';
import { ComponentsComponent } from './components.component';
import {HomeComponent} from "./home/home.component"
import {DocumentScannerComponent} from "./document-scanner/document-scanner.component"
import {ImageResultsComponent} from "./image-results/image-results.component"
import {ImageDetailsComponent} from "./image-details/image-details.component"
import {CroppingComponent} from "./cropping/cropping.component"
import {BrowserModule} from "@angular/platform-browser"
import {CommonModule} from "@angular/common"
import {BrowserAnimationsModule} from "@angular/platform-browser/animations"
import {ToastrModule} from "ngx-toastr"
import {ComponentsRoutingModule} from "./components-routing.module"
import {RouterModule} from "@angular/router"
import {ScanbotSdkService} from "./service/scanbot-sdk-service"



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
    BrowserModule,
    ComponentsRoutingModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    RouterModule
  ],
  bootstrap: [ComponentsComponent],
  exports: [
    ComponentsComponent
  ],
  providers: [ScanbotSdkService]
})
export class ComponentsModule { }
