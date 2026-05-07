import { DatePipe, CurrencyPipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { NgxBarcode6 } from 'ngx-barcode6';
import { NgxPrintDirective } from 'ngx-print';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { Tooltip } from 'primeng/tooltip';
import { PosServcie } from '../../services/pos-servcie';
import { PanelModule } from 'primeng/panel';
import { Crmservice } from '../../services/crmservice';
import { Cashsales, Cashsaletemp, Customer } from '../../interface/posinterface';
@Component({
  selector: 'create-customer',
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
    SelectModule,
    PanelModule,
    // DatePipe, NgxPrintDirective,CurrencyPipe,NgxBarcode6,
    InputNumberModule, FluidModule,
  ],
  templateUrl: './create-customer.html',
  styleUrl: './create-customer.scss',
})
export class CreateCustomer implements OnInit {

  invoiceDate: Date = new Date()
  isCashsalse = signal(false)
  isInput = signal(false)
  isInputInvoice = signal(false)
  cashSalesData: Cashsales[] | any
  cashtempData: Cashsaletemp[] | any
  selectedProduct: boolean = false
  message: any
  loading = signal(false)
  searchValue = signal('');
  cashSalesInvoiceNumber: any
  walkinCustomer: boolean = false
  registeredCustomer: boolean = false
  custerAddress: any
  activityValues = signal<number[]>([0, 100]);
  messageservice = inject(MessageService)
  size: any = null;
  customers: Customer[] | any
  selectedSelectedBustomer: Customer | any
  customerName: any;
  telephoneNumber: any;
  emailAddress: any;
  address: any;
  customerType: any | undefined
  quoteQuantity: number = 0;
  SelectedProduct: Cashsales | any
  totalCost: number = 0
  sumTotalCart: number = 0
  submitOnSuccess = signal(false)
  cutomerNumber: any
  mobileNumber: any
  remarks: any
  isCustomerSaved=signal(false)
  constructor(private posservice: PosServcie, private cdr: ChangeDetectorRef, private crmservcie: Crmservice) { }
  ngOnInit(): void {
    this.genranCode()
  }
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  genranCode = () => {
    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.cutomerNumber = "CIN-" + randomInteger
  }


  addCustomer = () => {
    let data = {
      cutomerNumber: this.cutomerNumber,
      customerType: 'REGISTERED',
      customername: this.customerName,
      telephone: this.telephoneNumber,
      emailadress: this.emailAddress,
      addresss: this.custerAddress,
      dateposted: this.invoiceDate,
      mobileNumber: this.mobileNumber,
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
          this.crmservcie.setCustomerSaved(true)
          this.crmservcie.setCustomerNumber(this.cutomerNumber)
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }

      }
    })
  }

}
