import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, Inject, PLATFORM_ID, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Userservice } from '../../services/userservice';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { Product, Warehouseinterface } from '../../interface/warehouseinterface';
import { Brand } from '../../interface/products';
import { productservice } from '../../services/productservice';
import { MessageModule } from 'primeng/message';
import { ToolbarModule } from 'primeng/toolbar';
import { FluidModule } from 'primeng/fluid';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { ButtonModule } from 'primeng/button';
import { Wearehouse } from '../../services/wearehouse';
import { StoreService } from '../../services/store-service';
import { response } from 'express';
import { DividerModule } from 'primeng/divider';
import { Table, TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Users } from '../../interface/Users';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { TagModule } from 'primeng/tag';
@Component({
  selector: 'stock-request',
  imports: [FormsModule,
    CommonModule,
    ReactiveFormsModule,
    SelectModule,
    MessageModule,
    ToolbarModule,
    ButtonModule,
    DividerModule,
    FluidModule,
    InputTextModule,
    InputNumberModule,
    TableModule, IconFieldModule,
    InputIconModule,
    DialogModule,
    AvatarModule,
    ToastModule,
    ToggleSwitchModule,
    TagModule
  ],
  templateUrl: './stock-request.html',
  styleUrl: './stock-request.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockRequest {



  Retrieve_req_nunmber: any[]|undefined;
  SelectBrand(arg0: any) {
    console.log(arg0)
  }
  messageservice = inject(MessageService)
  message: any

  product: Product[] = []
  productBrand: Brand | any
  selectedProduct: any
  selectedBrand: Brand | any
  quantity: number = 0
  warehouse: Warehouseinterface | any
  selectedwarehouse: any
  requestedData: Request[] | any
  selected_request: Request | any
  requestHistory: Request[] | any
  
  selectedcateory: any
  requestNumber: any
  userData: any
    credentials: any
  description: any
  isFindRequest = signal(false)
  isDropRequest = signal(false)
  isisNewrequest = signal(false)
  itemrowid: any
  randomInteger: number = 0
  pendingRequest: any[] | any
  selected_pending_request: any | any
  starts = signal(false)
 mode:any
 loading=signal(false)
 isAddmore=signal(false)
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private userservice: Userservice,
    private router: Router,
    private routes: ActivatedRoute,
    private deviceService: DeviceDetectorService,
    private productservcie: productservice,
    private warehouseservice: Wearehouse,
    private storeservice: StoreService,
    private cdr: ChangeDetectorRef,) {
    if (isPlatformBrowser(this.platformId)) {
      try {
        this.credentials = JSON.parse(localStorage.getItem('user') || '{}');
        this.userData = JSON.parse(localStorage.getItem('USER_INFO') || '{}');
        console.log('The User Data: ', this.userData)
      } catch (e) {
        console.log(e)
        this.message = "Could not parse JSON from storage: " + e
      }

    }
    this.selectedProduct = '',
      this.selectedBrand = ''
    this.selectedwarehouse = ''
    this.loadingProducts();

    this.loadingwarehouses()
    this.genranCode()

  }
  loadingProducts = () => {
    let data={

    }
    this.productservcie.listproduct(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
      } else {
        if (response?.data) {
          this.product = response?.data
          // this.cdr.detectChanges()
          console.log(this.product)
        } else {
          this.message = 'Unknown error has occurec'
        }
      }
    })
  }

  loadingBrand = (data: any) => {
    let d = {
      selectedproduct: data
    }
    this.productservcie.listBrandByproductID(d).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
      } else {
        if (response?.data) {
          console.log(response?.data)

          this.productBrand = response?.data
          this.cdr.markForCheck()
          // this.cdr.detectChanges()

        } else {
          this.message = 'Unknown error has occurec'
        }
      }
    })
  }


  loadingwarehouses = () => {
    this.warehouseservice.listWarehouses().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
      } else {
        if (response?.data) {

          this.warehouse = response?.data
          this.cdr.markForCheck()
          // this.cdr.detectChanges()
          console.log(this.warehouse)
        } else {
          this.message = 'Unknown error has occurec'
        }
      }
    })
  }

  isInput = signal(false)
  searchValue = signal('');
  activityValues = signal<number[]>([0, 100]);

  showSubmit = () => {
    this.isInput.set(true)
  }


  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  genranCode = () => {
            this.randomInteger = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
        this.requestNumber = "REQ-" + this.randomInteger
  }
  addmoreproduct=signal(false)
  showAddmoreButton=signal(false)
  AddMore=()=>{
this.addmoreproduct.set(true)

  }
  getRequest = () => {
    this.unsubmitted.set(false)
    let data = {
      request_number: this.requestNumber
    }
    this.storeservice.load_store_request(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.isloading.set(false)
      } else {
        if (response?.data) {
          this.requestedData = response?.data
          this.isloading.set(false)
          this.cdr.markForCheck()
          this.cdr.detectChanges()

        } else {
          this.isloading.set(false)
        }
      }
    })
  }

  find_store_request = () => {
    this.unsubmitted.set(false)
    this.isloading.set(true)
    let data = {
      request_number: this.Retrieve_req_nunmber
    }
    this.storeservice.find_store_request(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.isloading.set(false)
      } else {
        if (response?.data) {
          this.requestedData = response?.data
          this.cdr.markForCheck()
          this.cdr.detectChanges()
          this.isloading.set(false)
        } else {
          this.isloading.set(false)
        }
      }
    })
  }

  history = () => {

    this.unsubmitted.set(false)
    this.isFindRequest.set(false)
    let data={
        storeNumber: this.userData[0]?.storenumber
    }
    this.storeservice.requestHistory(data).subscribe((response:any)=>{
        if (response?.message) {
        this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.cdr.markForCheck()
          this.cdr.detectChanges()
          this.isloading.set(false)
          this.requestHistory=response?.data
               this.starts.set(true)
          console.log('the request history', this.requestHistory)
        } else {
          this.message = 'Unknown error has occured'
           this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }
  dropRequest = () => {
    this.unsubmitted.set(false)
    this.isDropRequest.set(true)
  }
  warehouseName:any
  selectWarehouse($event: SelectChangeEvent) {
    this.selectedwarehouse = $event?.value.whse_serialnumber
    this.warehouseName=$event?.value?.warehousename
  }
  selectProduct($event: SelectChangeEvent) {
    this.selectedProduct = $event.value.serialnumber
    this.selectedcateory = $event.value.category
    this.loadingBrand(this.selectedProduct)
  }


  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }
  isloading = signal(false)
  PlaceRequest = () => {
    this.showAddmoreButton.set(true)
    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.itemrowid = "REQ-ITMR" + randomInteger


    let data = {
      productNumber: this.selectedProduct,
      productBrand: this.selectedBrand?.brandid,
      to_warehouse: this.selectedwarehouse,
      category: this.selectedcateory,
      storeNumber: this.userData[0]?.storenumber,
      requestNumber: this.requestNumber,
      quantity: this.quantity,
      reuqestDat: new Date(),
      description: this.description,
      itemrowid: this.itemrowid,

    }
    console.log(data)
    this.storeservice.submitReques(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {

          this.getRequest()
          this.cdr.markForCheck()
          this.cdr.detectChanges()
          this.isloading.set(false)
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = 'Unknown error has occured'
           this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }



  
  addProduct=()=>{
    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.itemrowid = "REQ-ITMR" + randomInteger


    let data = {
      productNumber: this.selectedProduct,
      productBrand: this.selectedBrand?.brandid,
      to_warehouse: this.selectedwarehouse,
      category: this.selectedcateory,
      storeNumber: this.userData[0]?.storenumber,
      requestNumber: this.requestNumber,
      quantity: this.quantity,
      reuqestDat: new Date(),
      description: this.description,
      itemrowid: this.itemrowid,

    }
    console.log(data)
    this.storeservice.addmoreProducts(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {

          this.getRequest()
          this.cdr.markForCheck()
          this.cdr.detectChanges()
          this.isloading.set(false)
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = 'Unknown error has occured'
           this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  
  }
  deleteRequest = () => {
    this.unsubmitted.set(false)
    let data = {
      request_number: this.Retrieve_req_nunmber
    }
    this.storeservice.dropRequest(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.isisNewrequest.set(false)
      } else {
        if (response?.success) {
          this.message = response.success
          this.loadUnsubmitted(this.mode)
          this.messageservice.add({ severity: 'sucess', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }
  openNewRequest(obj:any) {
    this.mode='- Request Number:'+this.requestNumber
    this.isisNewrequest.set(true)
  }
  isPending_request = signal(false)
  ischeckingPending = signal(false)
  getPending = (obj:any) => {
    this.mode=obj
    this.unsubmitted.set(false)
    this.isisNewrequest.set(false)
    let data = {
      storeNumber: this.userData[0]?.storenumber

    }
    this.storeservice.findPending(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.isloading.set(false)
        this.isisNewrequest.set(false)
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        console.log(response)
        this.ischeckingPending.set(true)
        this.isPending_request.set(true)
        this.requestedData = response?.data
        this.Retrieve_req_nunmber = response?.requests
        this.pendingRequest = response?.requests

        this.cdr.markForCheck()
        this.cdr.detectChanges()
        this.isloading.set(false)
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });

      }

    })
  }

  selectPendingRequest($event: SelectChangeEvent) {
    this.Retrieve_req_nunmber = $event.value.request_number
    this.cdr.markForCheck();
    this.cdr.detectChanges()
    console.log('event',)
    let data = {
      request_number: this.Retrieve_req_nunmber,
      store_number: this.userData[0]?.storenumber

    }
    this.storeservice.findPendingItem(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.requestedData = response?.data
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }
  dropRequest_Item(_t134: any) {
    console.log(_t134)
    let data = {
      itemrowid: _t134.itemrowid

    }
    this.storeservice.dropRequest_Item(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.cdr.detectChanges()
      } else {
        if (response?.success) {

          this.message = response.success
          this.getPending(this.mode);
          this.cdr.markForCheck()
          this.cdr.detectChanges()
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = 'Unknown error has occured'
          this.cdr.detectChanges()
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });

        }
      }
    })
  }
  unsubmitted = signal(false)
  loadUnsubmitted = (obj:any) => {
    this.mode=obj
    let data = {
      storeNumber: this.userData[0]?.storenumber,
    }
    this.storeservice.loadUnsubmitted(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.isloading.set(false)
      } else {
        if (response?.data) {
          this.unsubmitted.set(true)
          this.requestedData = response?.data
          this.Retrieve_req_nunmber=response?.req_nos
          console.log('the retrieved numbers: ',this.Retrieve_req_nunmber)

          this.cdr.markForCheck()
          this.cdr.detectChanges()
          this.isloading.set(false)

        } else {
          this.isloading.set(false)
        }
      }
    })
  }
  submitRequest = () => {
    let data = {
      store_number: this.userData[0]?.storenumber,
      request_number: this.Retrieve_req_nunmber,
      submitted: true,
      date_submitted: new Date()
    }
    console.log(data)
    this.storeservice.submitRequest(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
             this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.unsubmitted.set(true)
          this.message = response?.success
               this.messageservice.add({ severity: 'Error', summary: 'Success', detail: this.message, life: 5000 });
          this.cdr.markForCheck()
          this.cdr.detectChanges()
        } else {
          this.isloading.set(false)
        }
      }
    })
  }


  allSignals = () => {
    this.starts.set(false)
    this.isPending_request = signal(false)
    this.ischeckingPending = signal(false)
    this.isloading.set(false)
    this.unsubmitted.set(false)
    this.isisNewrequest.set(false)
  }

  continueRequest(rq: any,) {

this.showAddmoreButton.set(true)  
let data = {
      storeNumber: this.userData[0]?.storenumber,
      request_number:rq?.request_number||this.requestNumber
    }
    this.requestNumber=rq?.request_number
    this.unsubmittedRequestNumber=rq?.request_number
       console.log('The req Number: ',rq?.request_number)
    console.log('Continue Data: ',data)
 this.storeservice.load_selected_Unsubmitted(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.isloading.set(false)
             this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.unsubmitted.set(true)
          this.requestedData = response?.data
          this.Retrieve_req_nunmber=response?.req_nos[0]?.requestNumber
       

          this.cdr.markForCheck()
          this.cdr.detectChanges()
          this.isloading.set(false)

        } else {
          this.isloading.set(false)
        }
      }
    })
}


 is_cart_complete=signal(false) 
 unsubmittedRequestNumber:any
setComplete=()=>{
this.is_cart_complete.set(true)

 let data = {
      store_number: this.userData[0]?.storenumber,
      request_number: this.unsubmittedRequestNumber||this.requestNumber,
      submitted: true,
      date_submitted: new Date()
    }
    console.log(data)
    this.storeservice.submitRequest(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
           this.messageservice.add({ severity: 'error', summary: 'Success', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {

          this.unsubmitted.set(true)
          this.message = response?.success
          this.cdr.markForCheck()
          this.cdr.detectChanges()
             this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.isloading.set(false)
        }
      }
    })
}
}
