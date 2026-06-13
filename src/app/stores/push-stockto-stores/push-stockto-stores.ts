import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Inject, PLATFORM_ID, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { StoreService } from '../../services/store-service';
import { Userservice } from '../../services/userservice';
import { MessageService } from 'primeng/api';
import { StoreProducts, StoreListInterface } from '../../interface/storeinterface';
import { Users } from '../../interface/Users';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { InputGroupModule } from 'primeng/inputgroup';
import { PopoverModule } from 'primeng/popover';
import { AvatarModule } from 'primeng/avatar';
import { Wearehouse } from '../../services/wearehouse';
@Component({
  selector: 'push-stockto-stores',
  imports: [SelectModule,
      TableModule,
      FormsModule,
      CommonModule,
      ReactiveFormsModule,
      DividerModule,
      ButtonModule,
      IconFieldModule,
      InputIconModule,
      InputTextModule, 
      BadgeModule,
      OverlayBadgeModule,
      AvatarModule,
      Toast, PopoverModule,InputGroupModule],
  templateUrl: './push-stockto-stores.html',
  styleUrl: './push-stockto-stores.scss',
  providers:[MessageService]
})
export class PushStocktoStores {

loadRecords($event: SelectChangeEvent) {
       this.loading.set(true)
  this.storename=this.selectedStore?.storename
  let data={
    store_number:this.selectedStore?.storenumber
  }
  this.storeservice.liststoreproduct_dtock(data).subscribe((response:any)=>{
    if(response?.message){
      this.message=response?.message
         this.loading.set(false)
       this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
    }else{
      if(response?.data){
        this.StoreProducts=response?.data
        this.loading.set(false)
      }else{
        this.message='Unknown Error has occured'
           this.loading.set(false)
         this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      }
    }
  })
}
    messageservice=inject(MessageService)
  credentials: any
  
      userInfo: Users[] | any
      message: any
StoreProducts:StoreProducts[]=[]
        stores: StoreListInterface[] = []
      selectedStore:StoreListInterface|any
      storename:any
      counter:number=0;
  loading = signal(false);
    searchValue = signal('');
      // productList:Products[]=[];
    activityValues: number[] = [0, 5];
  quantity:any
  constructor(private warehouseservice:Wearehouse, private userservice: Userservice, @Inject(PLATFORM_ID) private platformId: Object,private storeservice: StoreService,private cdr:ChangeDetectorRef){
      if (isPlatformBrowser(this.platformId)) {
              try {
                this.credentials = JSON.parse(localStorage.getItem('user') || '{}');
                   this.userInfo = JSON.parse(localStorage.getItem('USER_INFO') || '{}');
              } catch (e) {
                this.message = "Could not parse JSON from storage: " + e
              }
              this.getAllstores()
              // this.listAllProducts()
            }
  }


    getAllstores = () => {
    this.storeservice.listallStores().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          setTimeout(()=>{
                   this.stores = response?.data
          console.log('store list', this.stores)

          this.cdr.markForCheck()
              this.cdr.detectChanges()
          })
   
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }



  onInputChange($event: Event) {
const element = $event.target as HTMLInputElement;
    const inputValue: string = element.value;
    this.quantity=inputValue
    console.log('User typed:', inputValue);
}
   
  
      clear(table: Table) {
          table.clear();
          this.searchValue.set('');
      }
  onGlobalFilter(table: Table, event: Event) {
  table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  console.log(table.value)
  }

  stockID:any
  is_stock_added=signal(false)
    getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  submitToStore = (product:any,element:HTMLInputElement) => {
   

    console.log('The Element',element.value=this.quantity)


    let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.stockID = "STKDID" + new Date().getDate() + "-" + randomInteger

      let data = {
        stock_to_storeid: this.stockID,
        warehouseproductstockproductid: 'ADMIN_PUSH',
        stockedSelectedProduct:product?.product_number,
        stockoperationid: 'ADMIN_STOCK_PUSH',
        store_id:product?.store_number,
        withdrwanbrand: product?.brandid,
        previousQty: 0,
        drawal_quantity: this.quantity,
        warehouse_stock_id:'NO_WAREHOUSE_AUTO_PUSH',
        comments: 'Stock pushed by admin',
        warehouseNumber: 'ADMIN_STOCK_PUSH_',
        store_request_id: 'NO_REQ_AUTO_PUSH'
      }
      // console.log('Submitting Data=>: ',data)
      this.storeservice.from_storemanager_to_Store(data).subscribe((response: any) => {
        if (response?.message) {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        } else {
          if (response?.success) {
             element.value=this.quantity
             this.quantity=0
             this.is_stock_added.set(true)
            this.message = response?.success
            this.messageservice.add({ severity: 'success', summary: 'SUCCESS', detail: this.message, life: 3000 });
          } else {
            this.message = 'Unknown error has occured'
            this.messageservice.add({ severity: 'danger', summary: 'Success', detail: this.message, life: 3000 });
          }
        }
      })
  }

    onDelete=(product:any,element:HTMLInputElement)=>{
    let data={
    product_number:product.product_number,
  brandid:product.brandid,
  store_number:product?.store_number
    }
    console.log(data)
    this.storeservice.dropPush(data).subscribe((response:any)=>{
      if(response?.message){
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      }else{
        if(response?.success){
          this.message = response?.success
           element.value='';
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        }else{
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }
  }
  

