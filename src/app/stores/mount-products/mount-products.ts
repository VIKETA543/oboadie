import { ChangeDetectorRef, Component, inject, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { Users } from '../../interface/Users';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Userservice } from '../../services/userservice';
import { MessageService } from 'primeng/api';
import { StoreService } from '../../services/store-service';
import { SelectModule } from 'primeng/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreListInterface, StoreProducts } from '../../interface/storeinterface';
import { DividerModule } from 'primeng/divider';
import { Table, TableModule, TablePageEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Toast } from "primeng/toast";

@Component({
  selector: 'mount-products',
  imports: [SelectModule,
    TableModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    DividerModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule, Toast],
  templateUrl: './mount-products.html',
  styleUrl: './mount-products.scss',
  providers:[MessageService]
})
export class MountProducts implements OnInit {
  messageservice=inject(MessageService)
  credentials: any
  
      userInfo: Users[] | any
      message: any
StoreProducts:StoreProducts[]=[]
        stores: StoreListInterface[] = []
      selectedStore:StoreListInterface|any
        searchValue = signal('');
  activityValues = signal<number[]>([0, 100]);
    first: number = 0;
  rows: number = 10;
  constructor(private userservice: Userservice, @Inject(PLATFORM_ID) private platformId: Object,private storeservice: StoreService,private cdr:ChangeDetectorRef) {

  if (isPlatformBrowser(this.platformId)) {
        
              try {
                this.credentials = JSON.parse(localStorage.getItem('user') || '{}');
                   this.userInfo = JSON.parse(localStorage.getItem('USER_INFO') || '{}');
              } catch (e) {
                this.message = "Could not parse JSON from storage: " + e
              }
              this.getAllstores()
              this.listAllProducts()
            }

   }


 ngOnInit(): void {

 }
   clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }
 

  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange($event: TablePageEvent) {
    this.first = $event.first;
    this.rows = $event.rows;
  }


  isLastPage(): boolean {
    return this.StoreProducts ? this.first + this.rows >= this.StoreProducts.length : true;
  }

  isFirstPage(): boolean {
    return this.StoreProducts ? this.first === 0 : true;
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

 initPushproduct=()=>{
      let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.storeStockNumber = "STRCKN-" + new Date().getDate() + "-" + randomInteger

}

  getAllstores = () => {
    this.storeservice.listallStores().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.stores = response?.data
          console.log('store list', this.stores)
          this.cdr.markForCheck()
              this.cdr.detectChanges()
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }

listAllProducts=()=>{
  let data={
     
  }
  return this.storeservice.listAllProducts(data).subscribe((response:any)=>{
    if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if(response?.data){
        this.StoreProducts = response?.data
          console.log('Product List',this.StoreProducts)
        this.cdr.markForCheck()
        this.cdr.detectChanges()
        }else{
              this.message = 'Unkwn error has occured'
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
  })
}

storeStockNumber: any
  
pushProductToStore(product:any,index:number){
  if(this.selectedStore===undefined){
  this.message ='Select a store to push the item'
        this.messageservice.add({ severity: 'error', summary: 'warn', detail: this.message, life: 70000 });
  }else{
this.initPushproduct()
    let data = {
      store_stock_id:this.storeStockNumber,
      store_Number:this.selectedStore?.storenumber,
     uac_id: this.userInfo[0]?.uac_id, 
       product_number:product?.serialnumber, 
       date_created:new Date(),
        isopened:true,
         product_category:product.category
    }
    console.log('The selected Store', data)
    this.storeservice.pushProductToStore(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 70000 });
      } else {
        if (response?.success) {

          this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'info', detail: this.message, life: 7000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 7000 });
        }
      }
    })

}
}
}
