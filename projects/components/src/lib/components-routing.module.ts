import {RouterModule, Routes} from "@angular/router"
import {RoutePaths} from "./model/RoutePaths"
import {HomeComponent} from "./home/home.component"
import {DocumentScannerComponent} from "./document-scanner/document-scanner.component"
import {ImageResultsComponent} from "./image-results/image-results.component"
import {ImageDetailsComponent} from "./image-details/image-details.component"
import {CroppingComponent} from "./cropping/cropping.component"
import {NgModule} from "@angular/core"
import {ScanbotSdkService} from "./service/scanbot-sdk-service"
import {DocumentRepository} from "./service/document-repository"

const routes: Routes = [
  { path: '', redirectTo: RoutePaths.Home, pathMatch: 'full' },

  { path: RoutePaths.Home,              component: HomeComponent },
  { path: RoutePaths.DocumentScanner,   component: DocumentScannerComponent },
  { path: RoutePaths.ImageResults,      component: ImageResultsComponent },
  { path: RoutePaths.ImageDetails,      component: ImageDetailsComponent },
 // { path: RoutePaths.BarcodeScanner,    component: BarcodeScannerComponent },
  { path: RoutePaths.Cropping,          component: CroppingComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ScanbotSdkService, DocumentRepository]
})
export class ComponentsRoutingModule {}
