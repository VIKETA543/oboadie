import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'mobile-scanner',
  imports: [ZXingScannerModule,FormsModule,ReactiveFormsModule,CommonModule,ButtonModule],
  templateUrl: './mobile-scanner.html',
  styleUrl: './mobile-scanner.scss',
})
export class MobileScanner implements OnInit {
  constructor(private cd: ChangeDetectorRef) { }
  ngOnInit(): void {
  
  }
    allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.CODE_128];
    currentDevice: MediaDeviceInfo | null = null;
    availableDevices: MediaDeviceInfo[] = [];
  scannerEnabled = signal(false);
  transports: any[] = [];
  debugInfo: string = '';
  lastResult: string | null = null;


  onCamerasFound(devices: MediaDeviceInfo[]): void {
  this.availableDevices = devices;
  if (devices.length > 0) {
    // Default to the back camera (usually the last one in the array)
    this.currentDevice = devices[devices.length - 1];
  }
}

  // // Success handler
  onCodeResult(resultString: string) {
    this.lastResult = resultString;
    console.log('Scan Result:', resultString);
    

    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    this.stopScanner()
  }

  // Handle permission errors
  onHasPermission(has: boolean) {
    if (!has) {
      this.debugInfo = "Camera permission denied.";
    }
  }

  // Toggle camera
  toggleScanner() {
    this.scannerEnabled.set(true);
  }
stopScanner() {
  this.scannerEnabled.set(false);
  this.currentDevice = null;
  this.cd.detectChanges();
}
}
