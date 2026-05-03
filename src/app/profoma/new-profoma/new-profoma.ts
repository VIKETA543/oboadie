import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxBarcode6 } from 'ngx-barcode6';
import { NgxPrintDirective } from 'ngx-print';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { FluidModule } from 'primeng/fluid';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { Tooltip } from 'primeng/tooltip';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { Crmservice } from '../../services/crmservice';
import { PosServcie } from '../../services/pos-servcie';
import { Creditsales, Creditsaletemp, Customer } from '../../interface/posinterface';
import { Customers } from '../../interface/crmInterface';
import { DatePickerModule } from 'primeng/datepicker';
@Component({
  selector: 'new-profoma',
  imports: [
    ToolbarModule,
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
    CurrencyPipe, NgxBarcode6, NgxPrintDirective,DatePickerModule
  ],
  templateUrl: './new-profoma.html',
  styleUrl: './new-profoma.scss',
  providers:[MessageService]
})
export class NewProfoma {
  constructor(private posservice: PosServcie, private crmservcie: Crmservice, private cdr: ChangeDetectorRef) { 
    this.getAllproducts()
  }
  message: any
  loading = signal(false)

  searchValue = signal('');
  activityValues = signal<number[]>([0, 100]);
  messageservice = inject(MessageService)
  size: any = null;
  SalesData: Creditsales[] | any
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
          this.SalesData = response?.data

          this.loading.set(false)
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }

      }
    })
  }
InvoiceNumber:any
isInput=signal(false)
isInputInvoice=signal(false)
isaddingCart=signal(false)
SelectedProduct:Creditsales|any
quoteQuantity: number=0;
totalCost:number=0
  customerType:any|undefined
    creditTempData:Creditsaletemp[]|any
sumTotalCart:number=0
  invoiceDate: Date = new Date()
  expiryDate:Date|any
  isCashsalse = signal(false)
  selectedProduct: boolean = false
  registeredCustomer:boolean=false
  custerAddress:any
     customers:Customer[]|any
     selectedSelectedBustomer:Customer|any
customerName: any;
telephoneNumber: any;
emailAddress: any;
address: any;

submitOnSuccess=signal(false)
customerData:Customers[]|any;
selectedCustomer:Customers|any
mobile_number:any
remarks:any
cutomerNumber:any
isAddtoCustomerList=signal(false)
  walkinCustomer:boolean=false
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


    iniCashSales = () => {
    let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.InvoiceNumber = "PROINV" + new Date().getDate() + "-" + randomInteger
    this.isInput.set(true)
    this.isInputInvoice.set(true)

  }
checked:boolean=false
  addToCart($event: ToggleSwitchChangeEvent, _t77: any) {
    this.isaddingCart.set(true)
    this.SelectedProduct=_t77

  }

calcTotal=()=>{
 this.totalCost=this.quoteQuantity*this.SelectedProduct?.unitesellingprice
//  console.log(this.totalCost)
}

AddCart(){
  let data={
    invoiceNumber:this.InvoiceNumber,
    productId:this.SelectedProduct?.serialnumber,
    brandId:this.SelectedProduct?.brandid,
    quantity:this.quoteQuantity,
    uniPrice:this.SelectedProduct?.unitesellingprice,
    totalCost:this.totalCost,
    customerType:this.customerType
  }
  
 return this.posservice.profomacart(data).subscribe((response:any)=>{
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
    invoceNumber:this.InvoiceNumber
  
  }
  return this.posservice.profomatemp(data).subscribe((response:any)=>{
    if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.creditTempData = response?.data
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
  if(!this.InvoiceNumber){
    alert('Invalid Invoice')
  }else{
    let data={
      invoceNumber:this.creditTempData[0].invoice_number,
      sumInvoiceTotal:this.sumTotalCart
    }
    this.posservice.profomainvoice(data).subscribe((response:any)=>{
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


addInvoice=()=>{
  let data={
          cutomerNumber: this.cutomerNumber,
      invoiceNumber:this.InvoiceNumber,
        customerType:this.customerType,
        customername:this.customerName,
        telephone:this.telephoneNumber,
        emailadress:this.emailAddress,
        addresss:this.address,
        dateposted:this.invoiceDate
  }
  this.posservice.submit_profoma_Invoice(data).subscribe((response:any)=>{
     if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.message=response?.success
          this.isInputInvoice.set(false)
          // if(this.isAddtoCustomerList()){
          //   // this.addCustomer()
          // }
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }

      }
  })
}



  // addCustomer = () => {
     
  //   console.log('Adding ',this.isAddtoCustomerList())
  //   let data = {
  //     cutomerNumber: this.cutomerNumber,
  //     customerType: 'REGISTERED',
  //     customername: this.customerName,
  //     telephone: this.telephoneNumber,
  //     emailadress: this.emailAddress,
  //     addresss: this.custerAddress,
  //     dateposted: this.invoiceDate,
  //     mobileNumber: this.mobile_number,
  //     remarks: this.remarks
  //   }
  //   this.crmservcie.addCustomer(data).subscribe((response: any) => {
  //     if (response?.message) {
  //       this.message = response?.message
  //       this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
  //     } else {
  //       if (response?.success) {
  //         this.message = response?.success
  //         this.isInputInvoice.set(false)
  //         this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
  //       } else {
  //         this.message = response?.message
  //         this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
  //       }

  //     }
  //   })
  // }
onPrintComplete() {
      this.isCashsalse.set(false)
}
}
