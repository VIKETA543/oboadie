import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BarcodeFormat } from '@zxing/library';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ProgressBarModule } from 'primeng/progressbar';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';
import { Subject, Subscription } from 'rxjs';
import { PosServcie } from '../../services/pos-servcie';
import { NgxBarcode6 } from 'ngx-barcode6';
import { NgxPrintDirective } from 'ngx-print';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Toolbar } from 'primeng/toolbar';
@Component({
  standalone:true,
  selector: 'mobile-scanner',
  imports: [ZXingScannerModule,FormsModule,ReactiveFormsModule,CommonModule,ButtonModule,ProgressBarModule,MessageModule,
    NgxPrintDirective, FormsModule, InputNumberModule, FluidModule, NgxBarcode6, ToastModule, ProgressBarModule, AvatarModule, 
    ButtonModule, DialogModule, InputTextModule, TableModule, DividerModule, CurrencyPipe, Toolbar
  ],
  templateUrl: './mobile-scanner.html',
  styleUrl: './mobile-scanner.scss',
  providers:[MessageService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MobileScanner implements OnInit {
  isMobile=signal(false)
  constructor(private cd: ChangeDetectorRef,private breakpointObserver: BreakpointObserver, private posservice: PosServcie) { }
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

  messageservice = inject(MessageService)
  message: any
 
  public lastScan: string = '';
  public isSuccess: boolean = false;
  public isResults = signal(false)
  onInvoiceLoad = signal(false)
  invoiceData: any[] = []
  invoicesum: any[] = []
  salesType: any
  AmountPaid: number = 0;
  PaidBalance: number = 0;
  balanceData: any[] = []
  previousBalance: number = 0
  paymentNumber: any
  sumamountPaidData:any[]=[]

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
    this.loadSales()

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




  loadSales = () => {
    let data = {
      invoinceNumber: this.lastResult
    }
    this.posservice.loadInvoiceQuote(data).subscribe((response: any) => {
      if (response?.message) {
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: response.message, life: 5000 });
      } else {
        if (response?.isQuote) {
          console.log('Invoice data loaded successfully:', response)
          console.log('Checking progress',response?.invoicesum[0].payment_progress)
          const paystatus = response?.invoicesum[0].payment_progress.trim()
        
          switch (paystatus) {
            case 'FULL_PAYMENT':
              this.isPaymentcomplete.set(true)
              this.loadPaymentReceipt()
              break;
            case 'PART_PAYMENT':
               
              this.isResults.set(response?.isQuote)
              this.invoiceData = response?.invoiceitems
              this.invoicesum = response?.invoicesum
              this.salesType = response?.rws
            
              if (response?.balance[0].balance === "undefined") {
                    this.balanceData =  response?.invoicesum
                this.previousBalance = response?.invoicesum[0].invoice_total
              } else {
                 console.log(paystatus)
                  this.balanceData = response?.balance
                this.previousBalance = response?.balance[0].balance
              }
              this.cd.detectChanges()
              break;
            default:
              this.isResults.set(response?.isQuote)
              this.invoiceData = response?.invoiceitems
              this.invoicesum = response?.invoicesum
              this.salesType = response?.rws
              if (response?.balance[0].balance === "undefined") {
                this.previousBalance = response?.invoicesum[0].invoice_total
                  this.balanceData =  response?.invoicesum
                       console.log('balance Data,' ,  this.balanceData )
              } else {
                 this.balanceData = response?.balance
            
                this.previousBalance = response?.balance[0].balance
              }
                   this.cd.detectChanges()
              break;
          }
          let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
          this.paymentNumber = "ONPMT-" + new Date().getDate() + "-" + randomInteger
         this.cd.detectChanges()
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }
  payment_progress: any
  isFullpayment: boolean = false
  onAmountInput($event: InputNumberInputEvent) {

    this.PaidBalance = this.previousBalance - this.AmountPaid
    if (this.PaidBalance <= 0) {
      this.payment_progress = 'FULL_PAYMENT'
      this.isFullpayment = true
    } else {
      this.payment_progress = 'PART_PAYMENT'
      this.isFullpayment = false
    }
  }


  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }



  makePayment = () => {
    let data = {
      invoinceNumber: this.lastScan,
      salesType: this.salesType,
      amountPaid: this.AmountPaid,
      balance: this.PaidBalance,
      payment_progress: this.payment_progress,
      isFullpayment: this.isFullpayment,
      paymentNumber: this.paymentNumber
    }
    console.log('Checking data for full payment', data)
    this.posservice.makePayment(data).subscribe((response: any) => {
      if (response?.message) {
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: response.message, life: 5000 });
      } else {
        if (response?.success) {
          this.loadPaymentReceipt()
          this.isResults.set(false)
          this.isPaymentcomplete.set(true)
          this.cd.detectChanges()
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: response.success, life: 5000 });
        } else {
          this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }
  verySale = () => {
    let data = {
      invoinceNumber: this.lastScan,
      salesType: this.salesType,
    payment_progress: 'NO_PAYMENT_MADE'
    }
    this.posservice.makePayment(data).subscribe((response: any) => {
      if (response?.message) {
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: response.message, life: 5000 });
      } else {
        if (response?.success) {
          this.isResults.set(false)
          this.loadPaymentReceipt()
          this.isPaymentcomplete.set(true)
          this.cd.detectChanges()
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: response.success, life: 5000 });
        } else {
          this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })

  }



  isPaymentcomplete = signal(false)
  loadPaymentReceipt = () => {
    let data = {
      invoinceNumber: this.lastScan
    }
  
    this.posservice.loadPaymentReceipt(data).subscribe((response: any) => {
      if (response?.message) {
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: response.message, life: 5000 });
      } else {
        if (response?.isQuote) {
            console.log('loading receipt: ', response)
             this.isPaymentcomplete.set(response?.isQuote)
          this.invoiceData = response?.invoiceitems
          this.invoicesum = response?.invoicesum
          this.salesType = response?.rws
              this.balanceData = response?.balance
       
              this.sumamountPaidData=response?.sumpaid
console.log('sum paid',  this.sumamountPaidData)
          this.cd.detectChanges()

        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }
  onPrintComplete = () => {
    this.isPaymentcomplete.set(false)
  }
}

