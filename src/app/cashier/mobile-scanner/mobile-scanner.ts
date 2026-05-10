import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
@Component({
  standalone:true,
  selector: 'mobile-scanner',
  imports: [ZXingScannerModule,FormsModule,ReactiveFormsModule,CommonModule,ButtonModule,ProgressBarModule,MessageModule],
  templateUrl: './mobile-scanner.html',
  styleUrl: './mobile-scanner.scss',
  providers:[],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MobileScanner implements OnInit {
  isMobile=signal(false)
  constructor(private cd: ChangeDetectorRef,private breakpointObserver: BreakpointObserver) { }
  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]).subscribe(result => {
      this.isMobile.set(result.matches);
      this.cd.detectChanges();
    });
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
        this.stopScanner()
    }else{
         this.stopScanner()
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

    this.scannerEnabled.set(true);
    this.lastResult = null;
    this.cd.detectChanges();
  }
stopScanner() {
  this.scannerEnabled.set(false);
  this.currentDevice = null;
  this.cd.detectChanges();
}
}
