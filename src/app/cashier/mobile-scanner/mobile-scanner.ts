import { Component, OnInit } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'mobile-scanner',
  imports: [ZXingScannerModule,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './mobile-scanner.html',
  styleUrl: './mobile-scanner.scss',
})
export class MobileScanner implements OnInit {
  ngOnInit(): void {
  
  }
    allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128];
    currentDevice: MediaDeviceInfo | null = null;
  scannerEnabled = true;
  transports: any[] = [];
  debugInfo: string = '';
  lastResult: string | null = null;

  // // Success handler
  onCodeResult(resultString: string) {
    this.lastResult = resultString;
    console.log('Scan Result:', resultString);
    
  this.toggleScanner();
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  }

  // Handle permission errors
  onHasPermission(has: boolean) {
    if (!has) {
      this.debugInfo = "Camera permission denied.";
    }
  }

  // Toggle camera
  toggleScanner() {
    this.scannerEnabled = !this.scannerEnabled;
  }

}
