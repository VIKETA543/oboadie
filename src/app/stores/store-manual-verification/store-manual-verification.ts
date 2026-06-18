import { CommonModule, CurrencyPipe, DatePipe, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToastModule } from 'primeng/toast';
import { NgxBarcode6 } from 'ngx-barcode6';
import { NgxPrintDirective } from 'ngx-print';
import { AvatarModule } from 'primeng/avatar';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FluidModule } from 'primeng/fluid';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { StoreService } from '../../services/store-service';
import { Users } from '../../interface/Users';

@Component({
  selector: 'store-manual-verification',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    ToolbarModule,
    InputTextModule, SpeedDialModule, ToastModule,
    RouterOutlet,
    NgxPrintDirective,
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
    ToolbarModule, ToggleSwitchModule
  ],
  templateUrl: './store-manual-verification.html',
  styleUrl: './store-manual-verification.scss',
  providers: [MessageService]
})
export class StoreManualVerification {
  private messageservice = inject(MessageService);
  message: any
  items: MenuItem[] = [];
  isDataLoaded = signal(false)
  iscashDataLoaded = signal(false)
  iscashDialogVisible = signal(false)
  invoiceData: any[] = []
  invoicesum: any[] = []
  salesType: any
  purchaseInfo: any[] = []
  // isStoreVerified: boolean = false;
  dialogVisible = signal(false)
  invoince_number: any
  USER_CREDENTIALS: Users[] | any
  userInfo: any[] | any
  storeData: any

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private storeservice: StoreService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.items = [
      {
        icon: 'pi pi-wallet',
        tooltipOptions: {
          tooltipLabel: 'Cash Sales Verification',
          tooltipPosition: 'right' // Options: 'top', 'bottom', 'left', 'right'
        },
        command: () => {
          this.iscashDialogVisible.set(true)
        }
      },
      {
        icon: 'pi pi-credit-card',
        tooltipOptions: {
          tooltipLabel: 'Credit Sales Verification',
          tooltipPosition: 'left' // Options: 'top', 'bottom', 'left', 'right'
        },
        command: () => {
          this.dialogVisible.set(true)

        }
      }

    ];


    if (isPlatformBrowser(this.platformId)) {
      try {
        this.userInfo = JSON.parse(localStorage.getItem('user') || '{}');
        this.USER_CREDENTIALS = JSON.parse(localStorage.getItem('USER_CREDENTIALS') || '{}');
        console.log('User', this.userInfo)

        this.storeData = JSON.parse(localStorage.getItem('storeData') || '{}');
        console.log('User', this.storeData)
      } catch (e) {
        this.message = "Could not parse JSON from storage: " + e
      }
    }
  }



  getCredit = () => {
    this.dialogVisible.set(false)
    let data = {
      invoiceNumber: this.invoince_number,
      storeNumber: this.storeData[0]?.storenumber
    }
    // console.log(data)
    this.storeservice.creditVerification(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
      } else {
        this.invoiceData = response?.invoiceData
        this.purchaseInfo = response?.data
        console.log('The invoice data', this.invoiceData)
        console.log(this.purchaseInfo)
        this.isDataLoaded.set(true)
        this.cdr.detectChanges()
        this.invoince_number = undefined
      }
    })
  }
  verifyProduct($event: ToggleSwitchChangeEvent, product: any, invoice: any) {
    console.log('SELECTED PRODUCT: ', invoice)
    let data = {
      invoiceNumber: product.invoice_number,
      productNumber: product.product_number,
      brandNumber: product.product_brand,
      quantity: product.quantity_sold,
      storeNumber: product.store_number,
      purchaseid: product.purchaseid,
      sales_type: invoice[0]?.sales_type,
   
    }
    console.log(data)
    this.storeservice.submit_credit_for_verification(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
          // this.router.navigate(['../'], { relativeTo: this.route });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
        }
      }
    })
  }

  lockInvoice = () => {
    let data = {
      invoiceNumber: this.invoiceData[0].invoice_number,
      storeNumber: this.purchaseInfo[0].store_number
    }
    console.log(data)
    this.storeservice.closeCreditInVoice(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.message = response?.success
          this.invoiceData = []
          this.purchaseInfo = []
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
          this.router.navigate(['../'], { relativeTo: this.route });
        } else {
          this.invoiceData = []
          this.purchaseInfo = []
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'error', detail: this.message, life: 5000 });
        }
      }
    })
  }



  // Cashe sales verificattion







  loadCashSailes = () => {
    this.iscashDialogVisible.set(false)
    let data = {
      invoiceNumber: this.invoince_number,
      storeNumber: this.storeData[0]?.storenumber
    }
    console.log(data)
    this.storeservice.loadsalseforVerification(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
      } else {

        this.invoiceData = response?.invoiceData
        this.purchaseInfo = response?.data
        console.log('The invoice data', this.invoiceData)
        console.log(this.purchaseInfo)
        this.iscashDataLoaded.set(true)
        this.cdr.detectChanges()

      }
    })
  }
  verifyCashProduct($event: ToggleSwitchChangeEvent, product: any, invoice: any) {
    console.log('SELECTED PRODUCT: ', invoice)
    let data = {
      invoiceNumber: product.invoice_number,
      productNumber: product.product_number,
      brandNumber: product.product_brand,
      quantity: product.quantity_sold,
      storeNumber: product.store_number,
      purchaseid: product.purchaseid,
      sales_type: invoice[0]?.sales_type
    }
    console.log(data)
    this.storeservice.submitProductVerification(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
          // this.router.navigate(['../'], { relativeTo: this.route });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
        }
      }
    })
  }

  lockCashInvoice = () => {
    let data = {
      invoiceNumber: this.invoiceData[0].invoice_number,
      storeNumber: this.purchaseInfo[0].store_number
    }
    console.log(data)
    this.storeservice.closeInVoice(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.message = response?.success
          this.invoiceData = []
          this.purchaseInfo = []
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
          this.router.navigate(['../'], { relativeTo: this.route });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'error', detail: this.message, life: 5000 });
        }
      }
    })
  }

  closeCash = () => {
    this.invoiceData = []
    this.purchaseInfo = []
    this.iscashDataLoaded.set(false)
  }

  closeCreadit = () => {
    this.invoiceData = []
    this.purchaseInfo = []
    this.isDataLoaded.set(false)
  }
}
