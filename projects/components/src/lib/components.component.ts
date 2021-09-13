import { Component } from '@angular/core';
import {ScanbotSdkService} from "./service/scanbot-sdk-service"
import {Router} from "@angular/router"
import {NavigationUtils} from "./service/navigation-utils"
import {RoutePaths} from "./model/RoutePaths"

@Component({
  selector: 'lib-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss']
})
export class ComponentsComponent {

  SDK: ScanbotSdkService;

  router: Router;

  constructor(_router: Router, _sdk: ScanbotSdkService) {
    this.router = _router;
    this.SDK = _sdk;
  }
  async onBackButtonClick() {

    let destination = "/";
    if (NavigationUtils.isAtPath(RoutePaths.DocumentScanner)) {
      this.SDK.disposeDocumentScanner();
    }

    if (NavigationUtils.isAtPath(RoutePaths.BarcodeScanner)) {
      this.SDK.disposeBarcodeScanner();
    }

    if (NavigationUtils.isAtPath(RoutePaths.ImageDetails)) {
      destination = RoutePaths.ImageResults;
    }

    if (NavigationUtils.isAtPath(RoutePaths.Cropping)) {
      destination = RoutePaths.ImageDetails;
    }

    await this.router.navigateByUrl(destination);
  }
}
