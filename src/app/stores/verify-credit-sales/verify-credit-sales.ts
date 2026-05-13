import { ChangeDetectorRef, Component, HostListener, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, Subscription, buffer, debounceTime, map, filter } from 'rxjs';
import { PosServcie } from '../../services/pos-servcie';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxBarcode6 } from 'ngx-barcode6';
import { NgxPrintDirective } from 'ngx-print';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FluidModule } from 'primeng/fluid';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { Toolbar, ToolbarModule } from 'primeng/toolbar';
import { StoreService } from '../../services/store-service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { ToggleSwitchChangeEvent } from 'primeng/types/toggleswitch';
import { ToggleSwitchModule } from 'primeng/toggleswitch';

@Component({
  selector: 'verify-credit-sales',
  imports: [NgxPrintDirective,
    FormsModule,
    InputNumberModule,
    FluidModule,
    NgxBarcode6,
    ToastModule,
    ProgressBarModule,
    AvatarModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    TableModule,
    DividerModule,
    CurrencyPipe,
    DatePipe,
    ToolbarModule, ToggleSwitchModule],
  templateUrl: './verify-credit-sales.html',
  styleUrl: './verify-credit-sales.scss',
  providers:[MessageService]
})
export class VerifyCreditSales implements OnInit, OnDestroy {

  messageservice = inject(MessageService)
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
  purchaseInfo: any[] = []
  isDataLoaded = signal(false)
  isStoreVerified: boolean = false;
  constructor(private cdr: ChangeDetectorRef,private storeservcie:StoreService,private router: Router, private route: ActivatedRoute){

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

    ngOnDestroy() {
    this.scanSub.unsubscribe();
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
          this.loadCashSailes()

    setTimeout(() => {
      this.isSuccess = false;

      this.cdr.detectChanges();
    }, 1000);
    // Trigger your API or logic here
  }



  
    loadCashSailes = () => {
      let data = {
        invoiceNumber: this.lastScan,
        storeNumber: 'STR-S-2379493'
      }
      console.log(data)
      this.storeservcie.creditVerification(data).subscribe((response: any) => {
        if (response?.message) {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
        } else {
  
          this.invoiceData = response?.invoiceData
          this.purchaseInfo = response?.data
          console.log('The invoice data',this.invoiceData)
          console.log(this.purchaseInfo)
          this.isDataLoaded.set(true)
          this.cdr.detectChanges()
  
        }
      })
    }
    verifyProduct($event: ToggleSwitchChangeEvent, product: any,invoice:any) {
      console.log('SELECTED PRODUCT: ', invoice)
      let data = {
        invoiceNumber: product.invoice_number,
        productNumber: product.product_number,
        brandNumber: product.product_brand,
        quantity: product.quantity_sold,
        storeNumber:product.store_number,
        purchaseid:product.purchaseid,
        sales_type:invoice[0]?.sales_type
      }
      console.log(data)
      this.storeservcie.submit_credit_for_verification(data).subscribe((response: any) => {
        if (response?.message) {
          this.message = response?.message
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
        } else {
          if (response?.success) {
            this.message=response?.success
               this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
            // this.router.navigate(['../'], { relativeTo: this.route });
          } else {
            this.message = response?.message
            this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
          }
        }
      })
    }
  
    lockInvoice=()=>{
       let data={
         invoiceNumber:this.invoiceData[0].invoice_number,
          storeNumber:this.purchaseInfo[0].store_number
       }
       console.log(data)
       this.storeservcie.closeCreditInVoice(data).subscribe((response:any)=>{
        if (response?.message) {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'error', detail: this.message, life: 5000 });
        } else {
          if (response?.success) {
            this.message=response?.success
               this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
             this.router.navigate(['../'], { relativeTo: this.route });
          } else {
            this.message = response?.message
            this.messageservice.add({ severity: 'error', summary: 'error', detail: this.message, life: 5000 });
          }
        }
       })
    }
}

