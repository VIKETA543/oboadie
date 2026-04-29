import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { Popover, PopoverModule } from 'primeng/popover';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Table, TableModule, TablePageEvent } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { Tooltip } from 'primeng/tooltip';
import { Storeinterface, StoreListInterface, StoreProducts } from '../../interface/storeinterface';
import { StoreService } from '../../services/store-service';
import { MessageService } from 'primeng/api';
import { Cartegory, Product, Stockbycategories } from '../../interface/warehouseinterface';
import { Wearehouse } from '../../services/wearehouse';
import { response } from 'express';

@Component({
  selector: 'new-store',
  imports: [
    ButtonModule,
    IconFieldModule, Divider,
    PopoverModule, ToolbarModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    ToolbarModule,
    InputTextModule,
    MenuModule,
    DialogModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PopoverModule,
    Divider,
    Tooltip,
    ToastModule,
    DrawerModule,
    TableModule,
    ToggleSwitchModule,
    PanelModule,
    SelectModule,
    DatePickerModule,
    InputNumberModule,
    TextareaModule,
    AvatarModule, RouterOutlet
  ],
  templateUrl: './new-store.html',
  styleUrl: './new-store.scss',
  providers: [MessageService],
})
export class NewStore implements OnInit {

  // @ViewChild('op') op!: Popover;
 
    storeNumber: any
  StoretypeNumber: any
  stridentityData: Storeinterface[] = []
  selectedStoreType: Storeinterface | any;
  StoreName: any;
  StoreLocation: any
  storeDigitalAddress: any
  storeDescription: any
  message: any
  storelistData: StoreListInterface[] = []
  selectstoreType:StoreListInterface|any
  stockby_by_cartegories: Stockbycategories[] = []
  first: number = 0;
  rows: number = 10;
  isLoadingbyCategories = signal(false)
  searchValue = signal('');
  activityValues = signal<number[]>([0, 100]);
  storeName: any
  storeID: any
  storeType: any
  isNewStore=signal(false)
 isViewingStore=signal(false)
  storeStockNumber:any
isPush=signal(false)
    setStoclopend: boolean = false

isStockOpen:boolean=false
warehouseStockID:any
  cartegory: Cartegory[] = []
  selectedcartegory: any;
 selectedproduct: any;
     product: Product[] = [];
     stockComments:string|undefined
dateOpened:Date | undefined
StoreProducts:StoreProducts[]=[]
selectedStoreProduct:StoreProducts|any
isListingProducts=signal(false)
isStockingActiviated=signal(false)

  constructor(private storeservice: StoreService, private messageservice: MessageService, private warehouseservice:Wearehouse,private cdr:ChangeDetectorRef) {   
    this.liststoretypes()
    this.getAllstores();
  }

  ngOnInit(): void {

  }


setNewStore=()=>{
this.isNewStore.set(true)
 this.createStoreNumber()
}

  liststoretypes = () => {
    this.storeservice.liststoretypes().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.stridentityData = response?.data
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }

  selectStoretype($event: SelectChangeEvent) {
    this.selectedStoreType = $event.value.storeidentityid

  }


  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  genranCode = () => {
    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.StoretypeNumber = "WHSEID-" + randomInteger
  }

  createStoreNumber = () => {
    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.storeNumber = "STR-S-" + new Date().getDay() + randomInteger
    // this.liststoretypes()
  }

  saveStore() {
    let data = {

      storeNumber: this.storeNumber,
      selectedStoreType: this.selectedStoreType,
      StoreName: this.StoreName,
      StoreLocation: this.StoreLocation,
      storeDigitalAddress: this.storeDigitalAddress,
      storeDescription: this.storeDescription,
      date: new Date()
    }
    this.storeservice.saveStore(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });

      } else {
        if (response?.success) {
          this.stridentityData = response?.success
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message

          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }


  getAllstores = () => {
    this.storeservice.listallStores().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.storelistData = response?.data
          console.log('store list', this.storelistData)
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
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
    return this.stockby_by_cartegories ? this.first + this.rows >= this.isLoadingbyCategories.length : true;
  }

  isFirstPage(): boolean {
    return this.stockby_by_cartegories ? this.first === 0 : true;
  }

  clear1(table: Table) {
    table.clear();
    this.searchValue.set('');
  }
  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }

storetypeName:any
  visitStore = (selectedstore: StoreListInterface) => {
    console.log(selectedstore)
    this.storeName = selectedstore.storename
    this.storeNumber = selectedstore.storenumber
    this.storeType = selectedstore.storetype
    this.storetypeName=selectedstore.storeidentityname
    this.isViewingStore.set(true)
  }


 initPushproduct=()=>{
      let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.storeStockNumber = "STRCKN-" + new Date().getDate() + "-" + randomInteger
  this.AddProduct()
this.isPush.set(true)
}
 

isAddingproduct=signal(false)

  AddProduct() {
    this.isAddingproduct.set(true)
    this.warehouseservice.loadProductInfoCart().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
        this.warehouseStockID = "WHSE-STCKID" + new Date().getDate() + "-" + randomInteger

        this.cartegory = response?.productCart
        // 
        //
        this.cdr.markForCheck()
        // console.log('@Brand' ,response?.productBrand)
      }
    })
  }

  
  selecteCartegory($event: SelectChangeEvent) {
    this.selectedcartegory = $event.value
    // console.log(this.selectedcartegory)
    let data = {
      productCartegory: this.selectedcartegory.serialnumber,
    }
    this.warehouseservice.loadProductInfoProd(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {

        response?.Product
        this.product = response?.Product
        this.cdr.markForCheck()
      }
    })


  }

  

  selectStoreProduct($event: SelectChangeEvent) {
    this.selectedproduct = $event.value
console.log('selected product', this.selectedproduct)
    let data = {
      productid: this.selectedproduct.serialnumber,
    }

  }
  
    openStock($event: ToggleSwitchChangeEvent) {
    this.setStoclopend = $event.checked
  }

  

pushProductToStore(){

    let data = {
      store_stock_id:this.storeStockNumber,
      storetype:this.storeType,
      store_Number:this.storeNumber,
       product_number:this.selectedproduct.serialnumber, 
       date_created:this.dateOpened,
        details:this.stockComments, 
        isopened:this.isStockOpen,
         product_category:this.selectedcartegory.serialnumber
    }

    this.storeservice.pushProductToStore(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 70000 });
      } else {
        if (response?.success) {
                 this.storeStockNumber=undefined,
      this.selectstoreType=undefined,
      this.selectedproduct=undefined, 
      this.stockComments=undefined, 
      this.isStockOpen=false,
      this.selectedcartegory=undefined

        this.isPush.set(false)
          this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'info', detail: this.message, life: 7000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 7000 });
        }
      }
    })

}
cancelpush(){
  this.isPush.set(false)
             this.storeStockNumber=undefined,
      this.selectstoreType=undefined,
      this.selectedproduct=undefined, 
      this.stockComments=undefined, 
      this.isStockOpen=false,
      this.selectedcartegory=undefined
}
listAllProducts=()=>{
  let data={
      storeNumber : this.storeNumber
  }
  return this.storeservice.listAllProducts(data).subscribe((response:any)=>{
    if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if(response?.data){
        this.StoreProducts = response?.data
        this.isListingProducts.set(true)
        this.cdr.markForCheck()
        }else{
              this.message = 'Unkwn error has occured'
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
  })
}

dropProduct(_t354: any) {

this.storeNumber=_t354.store_number
let data={
  productNumber:_t354.product_number,
  storeNumber:this.storeNumber
}
this.storeservice.dropStoreproduct(data).subscribe((response:any)=>{
  if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });

      } else {
        if (response?.success) {
          this.message = response?.success
          this.listAllProducts()
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message ='Unknown error has occured'

          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
})
}

StockProducts=()=>{
this.isStockingActiviated.set(true)

}
}
