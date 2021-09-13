import {Injectable} from "@angular/core";

// Import SDK from webpack directory to ensure web assembly binary and worker and bundled with webpack
import ScanbotSDK from "scanbot-web-sdk/webpack";

// Other typings should be imported from @types
import {
  IDocumentScannerHandle,
  ICroppingViewHandle,
  DocumentScannerConfiguration,
  CroppingViewConfiguration,
  BinarizationFilter,
  ColorFilter,
  ImageFilter,
  PdfGenerationOptions,
  PdfGenerator,
  TiffGenerationOptions,
  TiffGenerator, BarcodeScannerConfiguration, IBarcodeScannerHandle
} from "scanbot-web-sdk/@types";

@Injectable({ providedIn: 'root' })
export class ScanbotSdkService {

  static CONTAINER_ID = "scanbot-camera-container";
  static BARCODE_SCANNER_CONTAINER_ID = "barcode-scanner-container";

  private instance: ScanbotSDK;

  onReady: any;

  private documentScanner: IDocumentScannerHandle;
  private barcodeScanner: IBarcodeScannerHandle;
  private cropper: ICroppingViewHandle;

  isReady(): boolean {
    return this.instance !== undefined;
  }

  constructor() {
    const options = {licenseKey: 'MEMFXoUmO8I50Us8b8QbiSTyj2mtVgRYLdizWc7He7o/6PHmcvSdbb+aLCmfouEkoNJZPvGyFh+mYWSjggZ5eLbbMEO9olOmAAofweIFjoMcm5I/qLYOFAnfETCm1YIAz69/Y7FJrR2+J4J7RYjNrfQ6UxCWgGQIDyVvwSEjuAiuwY5HzWy7XhLjeEGX1e/VTE5Z810JscQr0XO4Rk7P9zwy2vje4vctXAyxD/7zPjp9L+sx3N0GIxK+DQdmPveYEV/NEboCVHo18CSBQlaz+jmcqnQSdZrM9CiIkjZGGq+R27rHPaM6uKyMbaLNdHMnBDBvLKnKf1GeWh1KG7F7Sg==\nU2NhbmJvdFNESwpodHRwczovL2RhdGVudHVyYm8uZW50d2lja2x1bmcuZHZhZ3xsb2NhbGhvc3R8ZGF0ZW50dXJiby5lbnR3aWNrbHVuZy5kdmFnCjE2MzMwNDYzOTkKNTkwCjg=\n'};
    ScanbotSDK.initialize(options).then(result => {
      this.instance = result;
      if (this.onReady) {
        this.onReady();
      }
    });
  }

  async scanDocuments(configuration: DocumentScannerConfiguration) {
    this.documentScanner = await this.instance.createDocumentScanner(configuration);
  }

  async scanBarcodes(configuration: BarcodeScannerConfiguration) {
    this.barcodeScanner = await this.instance.createBarcodeScanner(configuration);
  }

  delayAutoCapture() {
    this.documentScanner.disableAutoCapture();
    setTimeout(() => {
      this.documentScanner.enableAutoCapture();
    }, 3000);
  }

  disposeDocumentScanner() {
    this.documentScanner.dispose();
  }
  disposeBarcodeScanner() {
    this.barcodeScanner.dispose();
  }

  async crop(configuration: CroppingViewConfiguration) {
    this.cropper = await this.instance.openCroppingView(configuration);
  }

  async detectInCropper() {
    await this.cropper.detect();
  }

  async rotateInCropper() {
    await this.cropper.rotate(1);
  }

  async applyCrop() {
    return await this.cropper.apply();
  }

  async toDataUrl(page: any) {
    return await this.instance.toDataUrl(page.filtered ?? page.cropped ?? page.original);
  }

  async licenseInfoString() {
    return JSON.stringify(await this.instance.getLicenseInfo());
  }

  async generatePDF(pages: any[]) {
    const options: PdfGenerationOptions = {standardPaperSize: "A4", landscape: true, dpi: 100};
    const generator: PdfGenerator = await this.instance!.beginPdf(options);
    for (const page of pages) {
      await generator.addPage(page.filtered ?? page.cropped ?? page.original);
    }
    return await generator.complete();
  }
  async generateTIFF(pages: any[]) {
    const options: TiffGenerationOptions = {binarizationFilter: "deepBinarization", dpi: 123};
    const generator: TiffGenerator = await this.instance.beginTiff(options);
    for (const page of pages) {
      await generator.addPage(page.cropped ?? page.original);
    }
    return await generator.complete();
  }

  public async applyFilter(image: ArrayBuffer, filter: ImageFilter) {
    return await this.instance.applyFilter(image, filter);
  }

  public binarizationFilters(): BinarizationFilter[] {
    return [
      'binarized',
      'otsuBinarization',
      'pureBinarized',
      'lowLightBinarization',
      'lowLightBinarization2',
      'deepBinarization'
    ];
  }

  public colorFilters(): ColorFilter[] {
    return [
      'color',
      'gray',
      'colorDocument',
      'blackAndWhite',
      'edgeHighlight'
    ];
  }

  public availableFilters(): string[] {
    return ["none"].concat(this.binarizationFilters()).concat(this.colorFilters());
  }

  filterByIndex(value: string) {
    return this.availableFilters()[parseInt(value)];
  }
}
