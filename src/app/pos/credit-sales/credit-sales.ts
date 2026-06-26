import { ChangeDetectorRef, Component, Inject, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Divider } from "primeng/divider";
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
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
import { Cashsaletemp, Creditsales, Creditsaletemp, Customer } from '../../interface/posinterface';
import { response } from 'express';
import { Customers } from '../../interface/crmInterface';
import { Crmservice } from '../../services/crmservice';
import { AvatarModule } from 'primeng/avatar';
import { PanelModule } from 'primeng/panel';

@Component({
  selector: 'credit-sales',
  imports: [ToolbarModule,
    ToastModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    InputTextModule,
    Tooltip,
    TableModule,
    ToggleSwitchModule,
    FormsModule,
    Divider,
    DialogModule,
    TextareaModule,
    CheckboxModule,
    DatePipe,
    SelectModule,
    InputNumberModule,
    FluidModule,
    CurrencyPipe, PanelModule,
    CommonModule,
    ReactiveFormsModule,
    NgxBarcode6,
    NgxPrintDirective,
    AvatarModule],
  templateUrl: './credit-sales.html',
  styleUrl: './credit-sales.scss',
})
export class CreditSales {


  invoiceDate: Date = new Date()
  isCashsalse = signal(false)
  isInput = signal(false)
  isInputInvoice = signal(false)
  SalesData: Creditsales[] | any
  creditTempData: Creditsaletemp[] | any
  selectedProduct: boolean = false

  loading = signal(false)

  SalesInvoiceNumber: any
  walkinCustomer: boolean = false
  registeredCustomer: boolean = false
  custerAddress: any
  message: any
  searchValue = signal('');
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
  SelectedProduct: Creditsales | any
  totalCost: number = 0
  sumTotalCart: number = 0
  submitOnSuccess = signal(false)
  customerData: Customers[] | any;
  selectedCustomer: Customers | any
  mobile_number: any
  remarks: any
  cutomerNumber: any
  product_name: any
  product_type: any
  price_for_carton: number = 0;
  price_for_unit: number = 0;
  selected_price: number = 0
  available_quantity: number = 0
  store_name: any
  is_pack: boolean = false
  is_unit: boolean = false
  is_kg: boolean = false
  is_yard: boolean = false
  isAddtoCustomerList = signal(false)
  USER_CREDENTIALS: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private posservice: PosServcie, private crmservcie: Crmservice, private cdr: ChangeDetectorRef, private router: Router, private routes: ActivatedRoute) {

    if (isPlatformBrowser(this.platformId)) {
      try {
        // this.userInfo = JSON.parse(localStorage.getItem('user') || '{}');
        this.USER_CREDENTIALS = JSON.parse(localStorage.getItem('USER_CREDENTIALS') || '{}');
        console.log('User', this.USER_CREDENTIALS)
      } catch (e) {
        this.message = "Could not parse JSON from storage: " + e
      }
    }


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
          this.SalesData = response?.data
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
    this.SalesInvoiceNumber = "CINV" + new Date().getDate() + "-" + randomInteger
    this.isInput.set(true)
    this.isInputInvoice.set(true)


    let customerid: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.cutomerNumber = "CIN" + new Date().getDate() + "-" + customerid
  }
  checked: boolean = false
  storeNumber: any
  addToCart(_t77: any) {

    if (this.customerType === undefined) {
      alert('Add Customer information!')
    } else {
      if (_t77.unitesellingprice > 0 || _t77.cartsellingprice > 0) {
        this.isaddingCart.set(true)
        this.SelectedProduct = _t77
        this.storeNumber = _t77.store_number
        this.product_name = _t77.name
        this.product_type = _t77.title
        this.price_for_unit = _t77.unitesellingprice
        this.price_for_carton = _t77.cartsellingprice
        this.available_quantity = _t77.stock_balance
        this.store_name = _t77.storename

        console.log('The selected', this.SelectedProduct)
      } else {
        this.message = 'The selected Product has no mounted price'
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      }
    }
  }



  selectedType: any

  selectPacktype(value: any) {
    const s = value
    this.otherPrice = 0
    this.selectedType = s
    switch (s) {
      case 'UNIT':
        this.is_pack = false
        this.is_yard = false,
          this.is_kg = false;
        this.selected_price = this.price_for_unit
        console.log(this.selected_price)
        break;
      case 'PACK':
        this.is_unit = false
        this.is_yard = false,
          this.is_kg = false;
        this.selected_price = this.price_for_carton
        console.log(this.selected_price)
        break;

      default:
        this.message = 'select package type'
        break
    }
  }


  selectecustomerType($event: CheckboxChangeEvent, arg1: string) {
    const selected = arg1
    this.customerType = selected
    this.customerType = selected;
    switch (selected) {
      case 'WALK-IN':
        this.walkinCustomer = $event.checked
        this.registeredCustomer = false
        break;
      case 'REGISTERED':
        this.crmservcie.loadcustomers().subscribe((response: any) => {
          if (response?.message) {
            this.message = response?.message
            this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
          } else {
            if (response?.data) {
              this.customerData = response?.data
              this.cdr.markForCheck()
            } else {
              this.message = 'Unknown error has occured'
              this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            }
          }

        })
        this.registeredCustomer = $event.checked
        this.walkinCustomer = false
        break;
      default:
        this.message = 'Invalid Selection'
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        break;
    }
  }

  getSelectedCustomer($event: SelectChangeEvent) {
    const data = $event.value
    this.customerName = data.customername,
      this.telephoneNumber = data.telephone
    this.emailAddress = data.emailadress,
      this.custerAddress = data.addresss,
      this.mobile_number = data.mobile_number,
      this.customerType = data.customertype
    this.remarks = data.remarks
  }



  calcTotal = () => {
    switch (this.selectedType) {
      case 'UNIT':
        switch (this.selected_price) {
          case 0:
            this.totalCost = 0.0
            this.quoteQuantity = 0.0
            this.message = 'The sales type does not have price associated'
            this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            break
          default:
            this.totalCost = (this.selected_price * this.quoteQuantity)
            break;
        }
        break;
      case 'PACK':
        switch (this.selected_price) {
          case 0:
            this.totalCost = 0.0
            this.quoteQuantity = 0.0
            this.message = 'The sales type does not have price associated'
            this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            break
          default:
            this.totalCost = (this.selected_price * this.quoteQuantity)
            break;
        }
        break;
      case 'OTHER_PURCHASE':
        console.log('testing others', this.otherPrice)
        switch (this.otherPrice) {
          case 0:
            this.totalCost = 0.0
            this.quoteQuantity = 0.0
            this.message = 'The sales type does not have price associated'
            this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            break;
          default:
            if (this.quoteQuantity <= 0) {
              this.totalCost = 0.0
              this.quoteQuantity = 0.0
              this.message = 'Enter a valid quantity'
              this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            } else {
              if (this.quoteQuantity > 0 && this.quoteQuantity < 1) {
                this.totalCost = this.otherPrice
              } else {
                console.log('test invalid')
                this.totalCost = 0.0
                this.quoteQuantity = 0.0
                this.message = 'Enter a valid quantity'
                this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
              }

            }

            break;
        }
        break;
      default:
        this.totalCost = 0.0
        this.quoteQuantity = 0.0
        this.message = 'Select item type'
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        break

    }


  }
  isaddingCart = signal(false)

  AddCart() {

    let randomInteger: number = this.getRandomInt(1, 100000); // Generates a random integer between 1 and 10
    const purchaseId = "CPID" + new Date().getDate() + "-" + randomInteger
    let data = {
      invoiceNumber: this.SalesInvoiceNumber,
      productId: this.SelectedProduct?.product_number,
      brandId: this.SelectedProduct?.product_brand,
      quantity: this.quoteQuantity,
      uniPrice: this.selected_price | this.otherPrice,
      totalCost: this.totalCost,
      purchaseId: purchaseId,
      customerType: this.customerType,
      storeNumber: this.storeNumber,
      salesObject: 'CREDIT_SALES'
    }
    console.log('The sales Data', data)
    return this.posservice.AddCreditCart(data).subscribe((response: any) => {
      switch (this.customerType) {
        case undefined:
          alert('Select Customer type')
          break;
        default:
          if (response?.message) {
            this.message = response?.message
            this.isaddingCart.set(false)
            this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
          } else {
            if (response?.success) {
              this.message = response?.success
              this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
              this.loadCart()
              this.isaddingCart.set(false)
              this.quoteQuantity = 0;
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

  loadCart = () => {
    let data = {
      invoceNumber: this.SalesInvoiceNumber

    }
    return this.posservice.getCreditTemp(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.creditTempData = []
        this.sumTotalCart = 0
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.creditTempData = response?.data
          this.sumTotalCart = response?.sumtotal[0].total
          console.log(response?.sumtotal)
          this.cdr.markForCheck()
        } else {
          this.message = response?.message
          this.creditTempData = []
          this.sumTotalCart = 0
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }

      }
    })
  }
  submitInvoice = () => {
    if (!this.SalesInvoiceNumber) {
      alert('Invalid Invoice')
    } else {
      let data = {
        invoceNumber: this.creditTempData[0].invoice_number,
        sumInvoiceTotal: this.sumTotalCart,
        salesObject: 'CREDIT_SALES',


      }
      this.posservice.submitCreditInvoice(data).subscribe((response: any) => {
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


  addInvoice = () => {
    let data = {
      cutomerNumber: this.cutomerNumber,
      invoiceNumber: this.SalesInvoiceNumber,
      customerType: this.customerType,
      customername: this.customerName,
      telephone: this.telephoneNumber,
      emailadress: this.emailAddress,
      addresss: this.address,
      dateposted: this.invoiceDate,
      preparedBy: this.USER_CREDENTIALS?.uac_id
    }
    this.posservice.openOpenInvoice(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.message = response?.success
          this.isInputInvoice.set(false)
          if (this.isAddtoCustomerList()) {
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

    console.log('Adding ', this.isAddtoCustomerList())
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
    this.isCashsalse.set(false)
    this.router.navigate(['../'], { relativeTo: this.routes })
    this.cashSales()
  }


  is_invoice_update = signal(false)
  invoiceList: any[] | undefined
  selected_invoice_from_list: any | undefined

  updateInvoice = () => {
    this.is_invoice_update.set(true)
    this.posservice.getAll_CREDIT_invoice().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.invoiceList = response?.data
        } else {
          this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }




  getInvoiceDetails = () => {
    this.is_invoice_update.set(false)
    this.SalesInvoiceNumber = this.selected_invoice_from_list?.invoice_number
    let data = {
      invoceNumber: this.selected_invoice_from_list?.invoice_number

    }

    return this.posservice.load_credit_invoice_for_update(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.creditTempData = []
        this.sumTotalCart = 0
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.creditTempData = response?.data
          this.sumTotalCart = response?.sumtotal[0].total
          console.log(response?.invoice)



          // cutomerNumber: this.cutomerNumber,

          this.customerType = response?.invoice[0]?.customertype,
            this.customerName = response?.invoice[0]?.customername,
            this.telephoneNumber = response?.invoice[0]?.telephone,
            this.emailAddress = response?.invoice[0]?.emailadress,
            this.address = response?.invoice[0]?.address,
            this.invoiceDate = response?.invoice[0]?.dateposted
          this.isInput.set(true)
          this.cdr.markForCheck()
        } else {
          this.creditTempData = []
          this.sumTotalCart = 0
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }

      }
    })

  }



  removeCart = (item: any) => {
    console.log('the cart remove', item)
    let data = {
      purchaseId: item?.purchaseid,
      invoice_number: item?.invoice_number
    }
    this.posservice.remove_credit_urchase(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.loadCart()
          this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }

  otherPriceData: any[] = []
  loadotherprices(_t85: any) {
    console.log(_t85)
    let data = {
      product_number: _t85?.product_number,
      btandid: _t85?.product_brand
    }
    this.posservice.loadotherprices(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.otherPriceData = response?.data
          console.log(this.otherPriceData)
        } else {
          this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }
  otherPrice: number = 0
  itemTpe: any
  itemvalue: number = 0
  otherSelected: any
  selectedOtherPrice($event: SelectChangeEvent) {
    console.log($event.value)
    this.selectedType = 'OTHER_PURCHASE'
    this.otherSelected = $event.value
    this.otherPrice = $event.value?.price
    this.itemTpe = $event.value?.item_type
    this.itemvalue = $event?.value?.item_value
    this.selected_price = 0
    this.is_unit = false
    this.is_pack = false

  }
}
