import { Component, OnInit } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
@Component({
  selector: 'mobile-scanner',
  imports: [ZXingScannerModule],
  templateUrl: './mobile-scanner.html',
  styleUrl: './mobile-scanner.scss',
})
export class MobileScanner implements OnInit {
  ngOnInit(): void {
  }
    allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128];
  
  onCodeResult(resultString: string) {
    console.log('Scanned Data:', resultString);
    // Add logic here to lookup product in POS
  }
}
