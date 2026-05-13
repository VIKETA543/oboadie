import { CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, HostListener, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxBarcode6 } from 'ngx-barcode6';
import { NgxPrintDirective } from 'ngx-print';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FluidModule } from 'primeng/fluid';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Toolbar } from 'primeng/toolbar';
import { Subject, Subscription, Observable } from 'rxjs';
import { buffer, map, filter, debounceTime } from 'rxjs/operators';
import { PosServcie } from '../../services/pos-servcie';

@Component({
  standalone:true,
  selector: 'pay-credit',
  imports: [
    NgxPrintDirective,
    FormsModule,
    InputNumberModule, FluidModule,
    NgxBarcode6, ToastModule,
    ProgressBarModule, AvatarModule,
    ButtonModule, DialogModule,
    InputTextModule, TableModule, DividerModule,
    CurrencyPipe, Toolbar
  ],
    providers:[MessageService],
  templateUrl: './pay-credit.html',
  styleUrl: './pay-credit.scss',
})
export class PayCredit implements OnInit {

  messageservice = inject(MessageService,)
  message: any
  private keyStrokes$ = new Subject<string>();
  private scanSub: Subscription;
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
  sumamountPaidData: any[] = []

  constructor(private posservice: PosServcie, private cdr: ChangeDetectorRef) {
    this.scanSub = this.keyStrokes$.pipe(
      // 1. Group keys together
      buffer(this.keyStrokes$.pipe(debounceTime(50))),
      // 2. Convert array of keys to a string
      map(keys => keys.join('')),
      // 3. Only process if it looks like a barcode (usually > 3 chars)
      filter(code => code.length > 2)
    ).subscribe(barcode => {
      this.handleScan(barcode);
    });
  }

  ngOnInit(): void {
    this.cdr.detectChanges()
  }
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Ignore functional keys like Shift, Alt, etc.

    if (event.key.length === 1) {
      this.keyStrokes$.next(event.key);
    } else if (event.key === 'Enter') {
      // Scanners usually end with 'Enter'
      // This helps trigger the buffer immediately
      this.keyStrokes$.next('');
    }
  }

  private handleScan(code: string) {
    this.lastScan = code.trim();
    this.isSuccess = true;
    this.cdr.detectChanges();
    console.log('Hardware Scan Success:', this.lastScan);
    this.loadSales()

    setTimeout(() => {
      this.isSuccess = false;
      this.cdr.detectChanges();
    }, 1000);
    // Trigger your API or logic here
  }

  ngOnDestroy() {
    this.scanSub.unsubscribe();
  }
  loadSales = () => {
    let data = {
      invoinceNumber: this.lastScan
    }
    this.posservice.loadcreditInvoices(data).subscribe((response: any) => {
             let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
          this.paymentNumber = "OINV" + new Date().getDate() + "-" + randomInteger
      if (response?.message) {
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: response.message, life: 5000 });
      } else {
        if (response?.isQuote) {
          console.log('Invoice data loaded successfully:', response)
          console.log('Checking progress', response?.invoicesum[0].payment_progress)
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
              this.sumamountPaidData=response?.sumpaid
              if (response?.balance[0].balance === "undefined") {
                this.balanceData = response?.invoicesum
                this.previousBalance = response?.invoicesum[0].invoice_total
              } else {
                console.log(paystatus)
                this.balanceData = response?.balance
                this.previousBalance = response?.balance[0].balance
              }
              this.cdr.detectChanges()
              break;
            default:
              this.isResults.set(response?.isQuote)
              this.invoiceData = response?.invoiceitems
              this.invoicesum = response?.invoicesum
              this.salesType = response?.rws
                    this.sumamountPaidData=response?.sumpaid
              if (response?.balance[0].balance === "undefined") {
                this.previousBalance = response?.invoicesum[0].invoice_total
                this.balanceData = response?.invoicesum
                console.log('balance Data,', this.balanceData)
              } else {
                this.balanceData = response?.balance

                this.previousBalance = response?.balance[0].balance
              }
              this.cdr.detectChanges()
              break;
          }
   
          this.cdr.detectChanges()
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
    this.posservice.makeCreditPayment(data).subscribe((response: any) => {
      if (response?.message) {
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: response.message, life: 5000 });
      } else {
        if (response?.success) {
          this.loadPaymentReceipt()
          this.isResults.set(false)
          this.AmountPaid=0
          this.isPaymentcomplete.set(true)
          this.cdr.detectChanges()
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: response.success, life: 5000 });
        } else {
          this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }
  // verySale = () => {
  //   let data = {
  //     invoinceNumber: this.lastScan,
  //     salesType: this.salesType,
  //     payment_progress: 'NO_PAYMENT_MADE'
  //   }
  //   this.posservice.makePayment(data).subscribe((response: any) => {
  //     if (response?.message) {
  //       this.messageservice.add({ severity: 'error', summary: 'Error', detail: response.message, life: 5000 });
  //     } else {
  //       if (response?.success) {
  //         this.isResults.set(false)
  //         this.loadPaymentReceipt()
  //         this.isPaymentcomplete.set(true)
  //         this.cdr.detectChanges()
  //         this.messageservice.add({ severity: 'success', summary: 'Success', detail: response.success, life: 5000 });
  //       } else {
  //         this.message = 'Unknown error has occured'
  //         this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
  //       }
  //     }
  //   })

  // }



  isPaymentcomplete = signal(false)
  loadPaymentReceipt = () => {
    let data = {
      invoinceNumber: this.lastScan
    }

    this.posservice.loadCreditPaymentReceipt(data).subscribe((response: any) => {
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

          this.sumamountPaidData = response?.sumpaid
          console.log('sum paid', this.sumamountPaidData)
          this.cdr.detectChanges()

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