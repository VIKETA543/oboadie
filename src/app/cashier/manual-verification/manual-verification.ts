import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputIconModule } from 'primeng/inputicon';
import { InputText } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Subject, Subscription, buffer, debounceTime, map, filter } from 'rxjs';
import { PosServcie } from '../../services/pos-servcie';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';
import { NgxBarcode6 } from "ngx-barcode6";
import { Toolbar } from "primeng/toolbar";
import { FluidModule } from 'primeng/fluid';
import { DividerModule } from 'primeng/divider';
import { ActivatedRoute, Router } from '@angular/router';
import { Crmservice } from '../../services/crmservice';
import { Users } from '../../interface/Users';
import { NgxPrintDirective } from 'ngx-print';

@Component({
  selector: 'manual-verification',
  imports: [NgxPrintDirective,ButtonModule, AvatarModule, CommonModule, FormsModule, ReactiveFormsModule, ToastModule, TableModule, DialogModule, InputText, InputIconModule, NgxBarcode6,
    FluidModule, Toolbar,InputNumberModule,DividerModule],
  templateUrl: './manual-verification.html',
  styleUrl: './manual-verification.scss',
  providers:[MessageService]
})
export class ManualVerification  implements OnInit{
dialogVisible=signal(false)
isResults=signal(false)

  private keyStrokes$ = new Subject<string>();

message:any
  public isSuccess: boolean = false;

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
  invoince_number:any
private messageservice=inject(MessageService)
  USER_CREDENTIALS:Users[]|any
constructor(@Inject(PLATFORM_ID) private platformId: Object,private posservice: PosServcie, private crmservcie: Crmservice,  private cdr:ChangeDetectorRef, private router:Router, private routes:ActivatedRoute){


 if (isPlatformBrowser(this.platformId)) {
                      try {
                  // this.userInfo = JSON.parse(localStorage.getItem('user') || '{}');
                  this.USER_CREDENTIALS=JSON.parse(localStorage.getItem('USER_CREDENTIALS') || '{}');
                   console.log('User',this.USER_CREDENTIALS)
                } catch (e) {
                  this.message = "Could not parse JSON from storage: " + e
                }
              }
}
  ngOnInit(): void {
  }

StartVeririfation=()=>{

  this.dialogVisible.set(true)
}
verifyInvoice=()=>{
  this.dialogVisible.set(false)
  this.loadSales()
}

  
  loadSales = () => {
    let data = {
      invoinceNumber: this.invoince_number
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
              this.cdr.detectChanges()
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
                   this.cdr.detectChanges()
              break;
          }
          let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
          this.paymentNumber = "ONPMT-" + new Date().getDate() + "-" + randomInteger
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
      invoinceNumber: this.invoince_number,
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
          this.cdr.detectChanges()
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
      invoinceNumber: this.invoince_number,
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
          this.cdr.detectChanges()
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
      invoinceNumber: this.invoince_number
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
  onExit=()=>{
      this.dialogVisible.set(false)
        this.isPaymentcomplete.set(false)
        

  }
}
