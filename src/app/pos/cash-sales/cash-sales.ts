import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { Tooltip } from 'primeng/tooltip';
import { PosServcie } from '../../services/pos-servcie';

import { MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { Divider } from "primeng/divider";
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { FluidModule } from 'primeng/fluid';
import { CurrencyPipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { NgxBarcode6 } from 'ngx-barcode6';
import { NgxPrintDirective } from 'ngx-print';
import { RouterOutlet, RouterLinkWithHref, Router, ActivatedRoute } from "@angular/router";
import { Cashsales, Cashsaletemp, Customer } from '../../interface/posinterface';
import { response } from 'express';
import { Customers } from '../../interface/crmInterface';
import { Crmservice } from '../../services/crmservice';


@Component({
  selector: 'cash-sales',
  imports: [ToolbarModule,
    ToastModule, ButtonModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    InputTextModule, Tooltip,
    TableModule,
    ToggleSwitchModule,
    FormsModule, Divider,
    DialogModule,
    TextareaModule,
    CheckboxModule,
    DatePipe, SelectModule,
    InputNumberModule, FluidModule,
    CurrencyPipe, NgxBarcode6, NgxPrintDirective,],
  templateUrl: './cash-sales.html',
  styleUrl: './cash-sales.scss',
})
export class CashSales {

  invoiceDate: Date = new Date()
  isCashsalse = signal(false)
  isInput = signal(false)
  isInputInvoice=signal(false)
  cashSalesData: Cashsales[] | any
  cashtempData:Cashsaletemp[]|any
  selectedProduct: boolean = false
  message: any
  loading = signal(false)
  searchValue = signal('');
  cashSalesInvoiceNumber: any
  walkinCustomer:boolean=false
  registeredCustomer:boolean=false
  custerAddress:any
  activityValues = signal<number[]>([0, 100]);
  messageservice = inject(MessageService)
     size: any = null;
     customers:Customer[]|any
     selectedSelectedBustomer:Customer|any
customerName: any;
telephoneNumber: any;
emailAddress: any;
address: any;
customerType:any|undefined
quoteQuantity: number=0;
SelectedProduct:Cashsales|any
totalCost:number=0
sumTotalCart:number=0
submitOnSuccess=signal(false)
customerData:Customers[]|any;
selectedCustomer:Customers|any
mobile_number:any
remarks:any
cutomerNumber:any
isAddtoCustomerList=signal(false)

  constructor(private posservice: PosServcie, private crmservcie: Crmservice,  private cdr:ChangeDetectorRef, private router:Router, private routes:ActivatedRoute) { 
       this.isCashsalse.set(true)
    this.getAllproducts()
  }
  ngOnInit(): void {

  }
  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }

  getAllproducts = () => {
    this.loading.set(true)
    this.posservice.getAllproducts().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.cashSalesData = response?.data
        
          this.loading.set(false)
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }

      }
    })
  }
  cashSales() {
    this.isCashsalse.set(true)
  
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  iniCashSales = () => {
    let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.cashSalesInvoiceNumber = "CINV" + new Date().getDate() + "-" + randomInteger
    this.isInput.set(true)
    this.isInputInvoice.set(true)


    let customerid: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.cutomerNumber = "CIN" + new Date().getDate() + "-" + customerid
  }
checked:boolean=false
storeNumber:any
  addToCart($event: ToggleSwitchChangeEvent, _t77: any) {
    this.isaddingCart.set(true)
    this.SelectedProduct=_t77
    this.storeNumber=_t77.store_id
    console.log(_t77)
  }

  selectecustomerType($event: CheckboxChangeEvent,arg1: string) {
    const selected=arg1
    this.customerType=selected
    this.customerType=selected;
    switch(selected){
      case 'WALK-IN':
        this.walkinCustomer=$event.checked
        this.registeredCustomer=false
        break;
        case 'REGISTERED':
        this.crmservcie.loadcustomers().subscribe((response:any)=>{
          if(response?.message){
            this.message=response?.message
                  this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
          }else{
            if(response?.data){
              this.customerData=response?.data
              this.cdr.markForCheck()
            }else{
              this.message='Unknown error has occured'
                  this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            }
          }

        })
          this.registeredCustomer=$event.checked
          this.walkinCustomer=false
          break;
          default :
            this.message = 'Invalid Selection'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
          break;
    }
}

getSelectedCustomer($event: SelectChangeEvent) {
const data=$event.value
this.customerName=data.customername,
this.telephoneNumber=data.telephone
this.emailAddress=data.emailadress,
this.custerAddress=data.addresss,
this.mobile_number=data.mobile_number,
this.customerType=data.customertype
this.remarks=data.remarks
}



calcTotal=()=>{
 this.totalCost=this.quoteQuantity*this.SelectedProduct?.unitesellingprice
 console.log(this.totalCost)
}
isaddingCart=signal(false)

AddCart(){

    let randomInteger: number = this.getRandomInt(1, 100000); // Generates a random integer between 1 and 10
    const purchaseId = "PID" + new Date().getDate() + "-" + randomInteger
  let data={
    invoiceNumber:this.cashSalesInvoiceNumber,
    productId:this.SelectedProduct?.serialnumber,
    brandId:this.SelectedProduct?.brandid,
    quantity:this.quoteQuantity,
    uniPrice:this.SelectedProduct?.unitesellingprice,
    totalCost:this.totalCost,
    purchaseId:purchaseId,
    customerType:this.customerType,
    storeNumber:this.storeNumber,
    salesObject:'CASH_SALES'
  }
  
 return this.posservice.AddCart(data).subscribe((response:any)=>{
  switch(this.customerType){
    case undefined:
      alert('Select Customer type')
      break;
      default :
    if (response?.message) {
        this.message = response?.message
          this.isaddingCart.set(false)
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.message=response?.success
                    this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
                    this.loadCart()
                     this.isaddingCart.set(false)
                  this.quoteQuantity=0;
        } else {
          this.message = response?.message
            this.isaddingCart.set(false)
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }

      }
      break;
  }  
 }) 

}

loadCart=()=>{
  let data={
    invoceNumber:this.cashSalesInvoiceNumber
  
  }
  return this.posservice.getTemp(data).subscribe((response:any)=>{
    if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.cashtempData = response?.data
          this.sumTotalCart=response?.sumtotal[0].total
          console.log(response?.sumtotal)
          this.cdr.markForCheck()
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }

      }
  })
}
submitInvoice=()=>{
  if(!this.cashSalesInvoiceNumber){
    alert('Invalid Invoice')
  }else{
    let data={
      invoceNumber:this.cashtempData[0].invoice_number,
      sumInvoiceTotal:this.sumTotalCart,
          salesObject:'CASH_SALES'
    }
    this.posservice.submitInvoice(data).subscribe((response:any)=>{
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
             this.message = response?.success
             this.submitOnSuccess.set(true)
          //


        this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }

      }
    })
  }
}


addInvoice=()=>{
  let data={
          cutomerNumber: this.cutomerNumber,
      invoiceNumber:this.cashSalesInvoiceNumber,
        customerType:this.customerType,
        customername:this.customerName,
        telephone:this.telephoneNumber,
        emailadress:this.emailAddress,
        addresss:this.address,
        dateposted:this.invoiceDate
  }
  this.posservice.openInvoice(data).subscribe((response:any)=>{
     if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.message=response?.success
          this.isInputInvoice.set(false)
          if(this.isAddtoCustomerList()){
            this.addCustomer()
          }
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }

      }
  })
}



  addCustomer = () => {
     
    console.log('Adding ',this.isAddtoCustomerList())
    let data = {
      cutomerNumber: this.cutomerNumber,
      customerType: 'REGISTERED',
      customername: this.customerName,
      telephone: this.telephoneNumber,
      emailadress: this.emailAddress,
      addresss: this.custerAddress,
      dateposted: this.invoiceDate,
      mobileNumber: this.mobile_number,
      remarks: this.remarks
    }
    this.crmservcie.addCustomer(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.message = response?.success
          this.isInputInvoice.set(false)
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }

      }
    })
  }
onPrintComplete() {
 this.cashSales()
}
}
