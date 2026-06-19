import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { Button } from "primeng/button";
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { StoreService } from '../services/store-service';
import { MessageService } from 'primeng/api';
import { StoreListInterface } from '../interface/storeinterface';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopup } from "primeng/confirmpopup";
import { Table, TableModule } from 'primeng/table';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { PopoverModule } from 'primeng/popover';
import { InputGroup } from "primeng/inputgroup";
import { FloatLabel } from 'primeng/floatlabel';
import { DividerModule } from 'primeng/divider';


@Component({
  selector: 'price-entry',
  imports: [ToolbarModule,
    FormsModule, DialogModule,
    AvatarModule,
    Button, SelectModule,
    ToastModule,
    IconFieldModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    TableModule,
    DatePipe,
    CurrencyPipe,
    DividerModule,
    FloatLabel,
     PopoverModule,
      InputGroup],
  templateUrl: './price-entry.html',
  styleUrl: './price-entry.scss',
  providers:[MessageService]
})
export class PriceEntry implements OnInit{

onInputChange($event: Event) {
const target = $event.target as HTMLInputElement;
this.priceInput=target.value
    console.log('User typed:', target.value);
}
priceInput:any|undefined
message:any
  storelistData: StoreListInterface[] = []
  selectedStore:StoreListInterface|undefined
  storeProducts:any[]=[]
  PriceGroup:any[]=[]
  PriceData:any[]=[]
  seletedPriceGrup:any
  loading=signal(false)
private messageservice=inject(MessageService)
isPriceInitiated=signal(false)
pricetagID:any
constructor(private storeservice:StoreService,private cdr:ChangeDetectorRef){}
  ngOnInit(): void {
    this.getAllstores()
    this.loadAllprices()
  }


   getAllstores = () => {
    this.storeservice.listallStores().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.storelistData = response?.data
 
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }

initiatePrice=()=>{
  this.loadpriceGroups()
  this.loading.set(true)
let data={
  store_number:this.selectedStore?.storenumber
}
this.storeservice.loadstoreProducts(data).subscribe((response:any)=>{
   if (response?.message) {
        this.message = response?.message
          this.loading.set(false)
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
            this.loading.set(false)
          this.storeProducts = response?.data
            this.isPriceInitiated.set(true)
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
            this.loading.set(false)
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
})
}


loadpriceGroups=()=>{


this.storeservice.loadpriceGroups().subscribe((response:any)=>{
   if (response?.message) {
        this.message = response?.message
          this.loading.set(false)
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {

          this.PriceGroup = response?.data
     
            this.isPriceInitiated.set(true)
            this.cdr.markForCheck();
            this.cdr.detectChanges();
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {

          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
})
}



selectBrand($event: SelectChangeEvent) {
this.selectedStore=$event.value


}

  searchValue = signal('');
      activityValues = signal<number[]>([0, 100]);
  
     
      clear(table: Table) {
          table.clear();
          this.searchValue.set('');
      }

      deleteRow(product: any) {
// console.log(product)
    this.storeProducts = this.storeProducts.filter(p => p.brandid !== product.brandid);
  }


  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  priceGroup:any
  genranCode = () => {
    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.pricetagID = "PRCTG-" + randomInteger
  }

  selectPriceGroup($event: SelectChangeEvent) {
this.priceGroup=$event.value?.pricetagid
}
selectedproduct_item:any;
  addUniprice=(product:any)=>{
    this.genranCode()
    if(this.priceGroup!==undefined){
    let data={
      priceID:this.pricetagID,
      PriceGroup:this.priceGroup,
      product_number:product?.product_number,
      product_cartegory:product?.product_category,
      brandid:product?.brandid,
      price:this.priceInput,

    }
    this.storeservice.addUnitPrice(data).subscribe((response:any)=>{
       if (response?.message) {
        this.message=response?.message
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
            if(response?.success){
              this.message=response?.success
              this.loadstoreprices()
               this.messageservice.add({ severity: 'success', summary: 'Error', detail: this.message, life: 5000 });
            }else{
                this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            }
        
        }
      
    })
  }else{
    this.message='Select price Group'
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
  }
  }



 
  addPackprice=(product:any)=>{
    this.genranCode()
    if(this.priceGroup!==undefined){
    let data={
      priceID:this.pricetagID,
      PriceGroup:this.priceGroup,
      product_number:product?.product_number,
      product_cartegory:product?.product_category,
      brandid:product?.brandid,
      price:this.priceInput,

    }
    this.storeservice.addPackprice(data).subscribe((response:any)=>{
       if (response?.message) {
        this.message=response?.message
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
            if(response?.success){
              this.message=response?.success
              this.loadstoreprices()
               this.messageservice.add({ severity: 'success', summary: 'Error', detail: this.message, life: 5000 });
            }else{
                this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            }
        
        }
      
    })
  }else{
    this.message='Select price Group'
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
  }
  }

  


  
loadstoreprices=()=>{
if(this.selectedStore?.storenumber!==undefined){
  this.loading.set(true)
let data={
  store_number:this.selectedStore?.storenumber
}
this.storeservice.loadstoreprices(data).subscribe((response:any)=>{
   if (response?.message) {
        this.message = response?.message
          this.loading.set(false)
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
            this.loading.set(false)
          this.PriceData = response?.data
       
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
            this.loading.set(false)
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
})
}else{
   this.message = 'Select Store'

        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
}
}


loadAllprices=()=>{

this.storeservice.loadAllprices().subscribe((response:any)=>{
   if (response?.message) {
        this.message = response?.message
          this.loading.set(false)
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
            this.loading.set(false)
          this.PriceData = response?.data
       
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
            this.loading.set(false)
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
})
}
}
