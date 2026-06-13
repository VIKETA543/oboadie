import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { PosServcie } from '../../services/pos-servcie';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule, CurrencyPipe } from '@angular/common';
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
@Component({
  selector: 'pos-home',
  imports: [CardModule, DialogModule, ButtonModule, NgxBarcode6, NgxPrintDirective, MessageModule, AvatarModule, CurrencyPipe, DividerModule, Badge, Panel, TableModule, IconFieldModule, InputIconModule, InputTextModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pos-home.html',
  styleUrl: './pos-home.scss',
  providers: [MessageService]
})
export class PosHome implements OnInit {
  onPrintComplete() {
this.is_View.set(false)
  }
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
  salesType:any
  invoiceDate: Date = new Date()
  is_View = signal(false)

  showInvoice(_t6: any) {
        const type=_t6?.sales_type
        this.salesType=_t6?.sales_type
    if(type.trim()==="CASH_SALES"){

         console.log(type)
    this.cashSalesInvoiceNumber = _t6?.invoice_number
    let data = {
      invoceNumber: this.cashSalesInvoiceNumber

    }
    console.log(data)
     this.posservice.verify_invoice(data).subscribe((response: any) => {
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
          console.log('Invoice Data: ',response?.invoice)
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
  }else{
    if(type.trim()==="CREDIT_SALES"){

       this.cashSalesInvoiceNumber = _t6?.invoice_number
    let d = {
      invoceNumber: this.cashSalesInvoiceNumber

    }
    console.log(d)
     this.posservice.verify_credit_invoice(d).subscribe((response: any) => {
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
          console.log('Invoice Data: ',response?.invoice)
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
  }else{
 this.message='Unknown purchase type'
 console.log(this.message)
  }
}
  }

  prepared_invoices: any = []
  prepared_credit_invoice: any
  message: any
  loading = signal(false)
  SalesData: any = [];

  constructor(private posservice: PosServcie, private messageService: MessageService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.preparedInvoices()
    this.prepared_credit_invoices()
    this.join_credit_cash_salse()
  }
  preparedInvoices = () => {
    let data = {
      dateposted: new Date()
    }
    return this.posservice.prepared_invoices(data).subscribe((response: any) => {
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

  prepared_credit_invoices = () => {
    let data = {
      dateposted: new Date()
    }
    return this.posservice.prepared_credit_invoices(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response.message
        this.cdr.markForCheck()
        this.cdr.detectChanges()
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
      } else {
        if (response.data) {
          this.prepared_credit_invoice = response.data
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



  join_credit_cash_salse = () => {
    let data = {
      dateposted: new Date()
    }
    return this.posservice.join_credit_cash_salse(data).subscribe((response: any) => {
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
