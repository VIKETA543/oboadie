import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { PosServcie } from '../../services/pos-servcie';
import { MenuItem, MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule, CurrencyPipe, isPlatformBrowser } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { Badge } from "primeng/badge";
import { Panel } from "primeng/panel";
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Cashsaletemp } from '../../interface/posinterface';
import { NgxBarcode6 } from 'ngx-barcode6';
import { NgxPrintDirective } from 'ngx-print';
import { DialogModule } from 'primeng/dialog';
import { Users } from '../../interface/Users';
import { StoreService } from '../../services/store-service';
import { BaseIcon } from "primeng/icons/baseicon";
import { SpeedDialModule } from 'primeng/speeddial';
import { TooltipModule } from 'primeng/tooltip';
import { DrawerModule } from 'primeng/drawer';
@Component({
  selector: 'store-home',
  imports: [CardModule, SpeedDialModule,TooltipModule,
    DialogModule,
    ButtonModule,
    NgxBarcode6,
    NgxPrintDirective,
    MessageModule,
    AvatarModule,
    CurrencyPipe,
    DividerModule,
    Badge,
    Panel,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BaseIcon,DrawerModule],
  templateUrl: './store-home.html',
  styleUrl: './store-home.scss',
  providers: [MessageService]
})
export class StoreHome implements OnInit {
  showHistory() {
    this.join_credit_cash_salse()
    this.isSalesdataloaded.set(true)
  }
  closePane(arg0: any) {
    this.SalesData = []
    this.isSalesdataloaded.set(false)
  }
  onPrintComplete() {
    this.is_View.set(false)
  }
     items: MenuItem[] | any;
  isSalesdataloaded = signal(false)
  cashSalesInvoiceNumber: any
  sumTotalCart: number = 0
  cutomerNumber: any
  customerType: any | undefined
  quoteQuantity: number = 0;
  customerName: any;
  telephoneNumber: any;
  emailAddress: any;
  address: any;
  custerAddress: any;
  salesType: any
  invoiceDate: Date = new Date()
  is_View = signal(false)
  USER_CREDENTIALS: Users[] | any
  userInfo: any[] | any
  storeData: any
  is_cash_invoices=signal(false)
    is_credit_invoices=signal(false)

// setSpeedDial=()=>{
//   this.items = [
//             {
//                 icon: 'pi pi-history',
//                   tooltipOptions: { tooltipLabel: 'Load Verified Invoice',position:'left' },
//                 command: () => {
//                    this.showHistory()
//                 }
//             },
//               {
//                 icon: 'pi pi-shop',
//                    tooltipOptions: { tooltipLabel: 'Pending Invoices',position:'left' },
//                 command: () => {
//                    this.join_credit_cash_sale_store_unverified()
//                 }
//             },
          
           
//         ];
//     }



  showInvoice(_t6: any) {
    const type = _t6?.sales_type
    this.salesType = _t6?.sales_type
    console.log('Selected Invoice data', _t6)
    if (type.trim() === "CASH_SALES") {


      this.cashSalesInvoiceNumber = _t6?.invoice_number
      let data = {
        invoceNumber: this.cashSalesInvoiceNumber

      }
      console.log(data)
      this.storeservice.verify_invoice(data).subscribe((response: any) => {
        if (response?.message) {
          this.message = response?.message
          this.cashtempData = []
          this.sumTotalCart = 0
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        } else {
          if (response?.data) {
            this.is_View.set(true)
            this.cashtempData = response?.data
            this.sumTotalCart = response?.sumtotal[0].total
            console.log('Invoice Data: ', response?.invoice)
            this.cutomerNumber = response?.invoice[0]?.customerid
            this.customerType = response?.invoice[0]?.customertype,
              this.customerName = response?.invoice[0]?.customername,
              this.telephoneNumber = response?.invoice[0]?.telephone,
              this.emailAddress = response?.invoice[0]?.emailadress,
              this.address = response?.invoice[0]?.address,
              this.invoiceDate = response?.invoice[0]?.dateposted

            this.cdr.markForCheck()
            this.cdr.detectChanges()
          } else {
            this.cashtempData = []
            this.sumTotalCart = 0
            this.message = response?.message
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
          }

        }
      })
    } else {
      if (type.trim() === "CREDIT_SALES") {

        this.cashSalesInvoiceNumber = _t6?.invoice_number
        let d = {
          invoceNumber: this.cashSalesInvoiceNumber

        }
        console.log(d)
        this.storeservice.verify_credit_invoice(d).subscribe((response: any) => {
          if (response?.message) {
            this.message = response?.message
            this.cashtempData = []
            this.sumTotalCart = 0
            this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
          } else {
            if (response?.data) {
              this.is_View.set(true)
              this.cashtempData = response?.data
              this.sumTotalCart = response?.sumtotal[0].total
              console.log('Invoice Data: ', response?.invoice)
              this.cutomerNumber = response?.invoice[0]?.customerid
              this.customerType = response?.invoice[0]?.customertype,
                this.customerName = response?.invoice[0]?.customername,
                this.telephoneNumber = response?.invoice[0]?.telephone,
                this.emailAddress = response?.invoice[0]?.emailadress,
                this.address = response?.invoice[0]?.address,
                this.invoiceDate = response?.invoice[0]?.dateposted

              this.cdr.markForCheck()
              this.cdr.detectChanges()
            } else {
              this.cashtempData = []
              this.sumTotalCart = 0
              this.message = response?.message
              this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            }

          }
        })
      } else {
        this.message = 'Unknown purchase type'
        console.log(this.message)
      }
    }
  }

  prepared_invoices: any = []
  prepared_credit_invoice: any
  message: any
  loading = signal(false)
  SalesData: any = [];
  generalData:any = [];
  sumProducts:number=0

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private storeservice: StoreService, private messageService: MessageService, private cdr: ChangeDetectorRef) {
    // this.setSpeedDial()
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.userInfo = JSON.parse(localStorage.getItem('user') || '{}');
        this.USER_CREDENTIALS = JSON.parse(localStorage.getItem('USER_CREDENTIALS') || '{}');
        console.log('User', this.userInfo)

        this.storeData = JSON.parse(localStorage.getItem('storeData') || '{}');
        console.log('Store Data', this.storeData)
      } catch (e) {
        this.message = "Could not parse JSON from storage: " + e
      }
    }
  }

  ngOnInit(): void {
    this.preparedInvoices()
    this.prepared_credit_invoices_data()
    this.general_joint_transaction()
  }
  preparedInvoices = () => {
    let data = {
      dateposted: new Date(),
      store_number: this.storeData[0]?.storenumber
    }
    return this.storeservice.prepared_invoices(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response.message
        this.cdr.markForCheck()
        this.cdr.detectChanges()
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
      } else {
        if (response.data) {
          this.prepared_invoices = response.data
          this.cdr.markForCheck()
          this.cdr.detectChanges()
        } else {
          this.message = "No prepared invoices found"
          this.cdr.markForCheck()
          this.cdr.detectChanges()
        }
      }
    })
  }

  prepared_credit_invoices_data = () => {
    let data = {
      dateposted: new Date(),
        store_number: this.storeData[0]?.storenumber
    }
  console.log('The data ')
    return this.storeservice.prepared_credit_invoices(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response.message
        this.cdr.markForCheck()
        this.cdr.detectChanges()
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
      } else {
        if (response?.data) {
          this.prepared_credit_invoice = response?.data
          console.log('Credit invoices',this.prepared_credit_invoice)
          this.cdr.markForCheck()
          this.cdr.detectChanges()
        } else {

          this.message = "No prepared invoices found"
            console.log('Credit invoices',this.message)
          this.cdr.markForCheck()
          this.cdr.detectChanges()
        }
      }
    })
  }



  join_credit_cash_salse = () => {
    let data = {
      dateposted: new Date(),
      store_number: this.storeData[0]?.storenumber
    }
    console.log('The Data: ', data)
    return this.storeservice.join_credit_cash_salse(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response.message
        this.cdr.markForCheck()
        this.cdr.detectChanges()
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
      } else {
        if (response.data) {
          this.SalesData = response.data
          console.log('The Data: ', this.SalesData)
          this.isSalesdataloaded.set(true)
          this.cdr.markForCheck()
          this.cdr.detectChanges()
        } else {
          this.message = "No prepared invoices found"
          this.cdr.markForCheck()
          this.cdr.detectChanges()
        }
      }
    })
  }


  


  general_joint_transaction = () => {
    let data = {
      dateposted: new Date(),
      store_number: this.storeData[0]?.storenumber
    }
    console.log('The Data: ', data)
    return this.storeservice.general_joint_transaction(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response.message
        this.cdr.markForCheck()
        this.cdr.detectChanges()
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
      } else {
        if (response.data) {
          this.generalData = response?.data
          this.sumProducts= response?.total
          console.log('total Products: ',response?.total)


          this.cdr.markForCheck()
          this.cdr.detectChanges()
        } else {
          this.message = "No prepared invoices found"
          this.cdr.markForCheck()
          this.cdr.detectChanges()
        }
      }
    })
  }




  join_credit_cash_sale_store_unverified = () => {
    let data = {
      dateposted: new Date(),
      store_number: this.storeData[0]?.storenumber
    }
    console.log('The Data: ', data)
    return this.storeservice.join_credit_cash_sale_store_unverified(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response.message
        this.cdr.markForCheck()
        this.cdr.detectChanges()
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
      } else {
        if (response.data) {
          this.SalesData = response.data
          this.cdr.markForCheck()
          this.cdr.detectChanges()
        } else {
          this.message = "No prepared invoices found"
          this.cdr.markForCheck()
          this.cdr.detectChanges()
        }
      }
    })
  }


  

  cashtempData: Cashsaletemp[] | any


}
