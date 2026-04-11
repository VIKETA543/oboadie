import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButton } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { Brand, CategoryList, Group, PriceData, Prices, PriceTag } from '../interface/products';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { productservice } from '../services/productservice';;
import { DrawerModule } from 'primeng/drawer';
import { response } from 'express';
import { ToastModule } from 'primeng/toast';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { TextareaModule } from 'primeng/textarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { FluidModule } from 'primeng/fluid';
import { Table, TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Products } from '../admin/products/products';
import { DividerModule } from 'primeng/divider';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
import { Productpriceservice } from '../services/productpriceservice';

@Component({
  selector: 'pricing',
  imports: [CommonModule,
    FormsModule,
    ToolbarModule,
    ButtonModule,
    InputTextModule,
    SelectModule,
    DrawerModule,
    ToastModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputIconModule,
    IconFieldModule,
    TextareaModule,
    InputNumberModule,
    FluidModule,
    TableModule,
    ToggleSwitchModule,
    SplitButtonModule,
    ConfirmDialogModule,
    DividerModule,
    CheckboxModule,
    TooltipModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './pricing.html',
  styleUrl: './pricing.scss',
  changeDetection:ChangeDetectionStrategy.Default
})
export class Pricing implements OnInit {
   loading = signal(false);
  searchValue = signal('');
    activityValues = signal<number[]>([0, 100]);

   
    clear(table: Table) {
        table.clear();
        this.searchValue.set('');
    }

    
switchfixedandPercentage($event: CheckboxChangeEvent) {
console.log($event.checked)
this.fixedvaluerate=false;
this.markuppercentage=$event.checked
this.orderprice=this.supplierprice
}


fixedValuerate($event: CheckboxChangeEvent) {
console.log($event.checked)
this.markuppercentage=false
this.fixedvaluerate=$event.checked
this.orderprice=this.supplierprice
// this.singleItems=false
}
switchToWeightBased($event: CheckboxChangeEvent) {
this.weight=$event.checked
  this.unitCost=false;
  this.markupPricing=false;
  this.yards=false
  this.singleItems=false
    this.fixedPricing=false
    this.orderprice=this.supplierprice
    this.distructor()
}
switchTounitCost(arg0: any) {

this.weight=false;
this.markupPricing=false;
this.yards=false
this.unitCost=arg0.checked
this.singleItems=false
  this.fixedPricing=false
  this.orderprice=this.supplierprice
  this.distructor()
}

switchToyard($event: CheckboxChangeEvent) {
this.yards=$event.checked
  this.unitCost=false;
  this.markupPricing=false;
  this.weight=false
  this.singleItems=false
    this.fixedPricing=false
    this.orderprice=this.supplierprice
    this.distructor()
}
switchToSingle($event: CheckboxChangeEvent) {
this.singleItems=$event.checked
  this.unitCost=false;
  this.markupPricing=false;
  this.weight=false
  this.yards=false
this.orderprice=this.supplierprice
  this.fixedPricing=false
  this.distructor()

}

setFixedPricingMOdule=($event: CheckboxChangeEvent)=>{
this.singleItems=false
  this.unitCost=false;
  this.markupPricing=false;
  this.weight=false
  this.yards=false
  this.distructor()
this.fixedPricing=$event.checked
this.orderprice=this.supplierprice
}
selectedcategory: any;
selectedbrand: any;
unitCost: boolean=false;
weight: boolean=false;
yards:boolean=false;
singleItems:boolean=false
fixedPricing:boolean=false
markupPricing: boolean=false;
fixedvaluerate:boolean=false

markuppercentage: boolean=false;


  authTag(selectedrecord: any, $event: any) {

    let data = {
      auth: $event.checked,
      tagId: selectedrecord.pricetagid
    }
    console.log(data)
    this.productservice.authTag(data).subscribe(async (response: any) => {
      if (response?.message) {
        this.messageService.add({ severity: 'error', summary: 'Message', detail: this.message });
      } else {
        if (response?.success) {


          this.pricetagDetails = await response?.data
           this.cdr.markForCheck()
        } else {
          this.message = "Unknown error occured"
          this.messageService.add({ severity: 'error', summary: 'Message', detail: this.message });
        }
      }
    })
  }
  private confirmationService = inject(ConfirmationService);
  private messageService = inject(MessageService);
  setPricetagParam(arg0: any) {

    this.taggedpriceTag = arg0;
    this.editselectedPricetag = arg0
    this.visibleBottom = true
  
  }
  editpricetagName: any
  pricetagName: any;
  priceQuoteq: any;
  priceQuote: any;
  describepricequote: any;
  checked: any;
  editselectedPricetag: any
  closePane = () => {
    this.newTag = false
  }
  submitQuote = () => {
    let data = {
      quoteID: this.pricetagID,
      priceTag: this.pricetagName,
      quoteDescription: this.describepricequote
    }
    this.productservice.submitQuote(data).subscribe((response: any) => {
      if (response?.success) {
        this.message = response?.success

        this.cdr.markForCheck();
        this.newTag = false;
        this.messageService.add({ severity: 'primary', summary: 'Success', detail: this.message });
      } else {
        this.newTag = false
        this.messageService.add({ severity: 'error', summary: 'Message', detail: this.message });
      }
    })
  }

  getpriceTagDetails = () => {
    this.priceservice.getpriceTagDetails().subscribe(async (response: any) => {
      if (response.data) {
     

          this.pricetagDetails = await response?.data
   this.cdr.markForCheck()
      } else {
        this.message = response?.message
        this.messageService.add({ severity: 'error', summary: 'Message', detail: this.message });
      }
    })
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  genranCode = () => {
    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.pricetagID = "PRCTG-" + randomInteger
  }

  newpriceTag() {
    this.newTag = true
    this.genranCode()
    this.isNewtag.update((isNewtag) => !this.isNewtag);
  }
  refreshPriceTag = () => {
    this.getpriceTagDetails()

  }

listpricesByTag=()=>{
  return this.priceservice.listPricebytag().subscribe((response:any)=>{
    if(response?.message){
      this.message=response?.message
      this.prices=undefined
        this.messageService.add({ severity: 'error', summary: 'Message', detail: this.message });
    }else{
      if(response?.data){
  
          this.prices=response?.data
      this.cdr.markForCheck()
      }else{
             this.prices=undefined
        this.message=response?.message
          this.messageService.add({ severity: 'error', summary: 'Message', detail: this.message });
      }
    }
  })
}

  selectPrice($event: SelectChangeEvent) {

let data={
  pricetagid:$event.value.pricetagid
}
   this.priceservice.searchPricesbyTag(data).subscribe(async (response: any) => {
      if (response.data) {
           
          this.priceDetails = await response?.data
 this.cdr.markForCheck()
      } else {
        this.message = response?.message
        this.messageService.add({ severity: 'error', summary: 'Message', detail: this.message });
      }
    })
  }

  refreshData() {
this.loadproductPrices();
  }
  drawerVisibility: boolean = false;
  visibleBottom: boolean = false
  propricedrawer:boolean=false
  taggedpriceTag: any
  message: any;
  pricetagID: any
  items: MenuItem[] | undefined;
  prices: Prices[] | undefined;
  selectedprice: Prices | undefined

  priceTag: PriceTag[] | undefined;
  selectedTag: PriceTag | undefined;
  pricetagDetails: PriceTag[] | undefined
  selectedpricetagDetail: PriceTag | undefined
  isNewtag = signal(false);
  newTag: boolean = false
  constructor(private cdr: ChangeDetectorRef, private productservice: productservice, private priceservice:Productpriceservice) {
    this.setpricetagOptions()
  }
  listPrices = async () => {
    this.productservice.listPrices().subscribe((response: any) => {
      console.log("Prices objects", response);
    })
  }

  listpriceTag = async () => {
    this.productservice.listPriceTag().subscribe(async (response: any) => {
      if (response?.data) {
         this.priceTag =await response?.data
          this.cdr.markForCheck()
      } else {
        if (response?.message) {
          this.message = response?.message
          // console.log(this.message)
          this.messageService.add({ severity: 'error', summary: 'Message', detail: this.message });
        } else {
          this.message = response?.message
          this.messageService.add({ severity: 'error', summary: 'Message', detail: "Unknwon error has occured" });
        }
      }

    })
  }


  ngOnInit(): void {
    this.listPrices();
    this.loadproducts();
    this.loadproductPrices();
      this.loadCategory()
      this.listpricesByTag()
  }

  setpricetagOptions = () => {
    this.items = [

      {
        label: 'Delete',
        icon: 'pi pi-trash',
        severity: "danger",
        command: () => {
          this.deleteTag();
        }
      },

    ];
  }
  deleteTag = () => {

    let data = {
      taggedID: this.taggedpriceTag
    }

    this.productservice.dropPriceTag(data).subscribe(async (response: any) => {
      if (response?.success) {
        this.message = response?.success
        this.messageService.add({ severity: 'info', summary: 'Success', detail: this.message });

             this.pricetagDetails = await response?.data
          this.cdr.markForCheck()
  
      } else {
        this.messageService.add({ severity: 'error', summary: 'Message', detail: "Unknwon error has occured" });
      }
    })
  }

  addpriceTag = () => {
    this.getpriceTagDetails()
    this.listpriceTag();

    this.drawerVisibility = true
    console.log("Data price tag")
  }
  eventsetter = (data: any) => {
    this.taggedpriceTag = data.pricetagid
    // console.log(this.taggedpriceTag)
  }
  productList: Products[] | undefined
  selectedProduct: Products | undefined
  priceDetails: PriceData[] | undefined
  pricetagList:PriceTag[]|undefined
  selectedPriceTagList:PriceTag|undefined
  categoryList:CategoryList[]=[]
  selectedCategory:CategoryList|undefined
rowcounter:number=0
 categories: CategoryList[] = [];
 priceID:any


 //seleting prices by category

 searchPricebyCategory($event: SelectChangeEvent) {
  let data ={
    cartId:$event.value.serialnumber
  }
  return this.priceservice.searchproductBycategory(data).subscribe((response:any)=>{
if (response?.message) {
          this.message=response?.message
        this.messageService.add({ severity: 'info', summary: 'Success', detail: this.message });
this.priceDetails=undefined
      } else {
        if (response?.data) {

                this.priceDetails=response?.data
                  this.cdr.markForCheck()
                            // this.loading.set(false);
        } else {
          this.messageService.add({ severity: 'error', summary: 'Message', detail: "Unknwon error has occured" });
        }
      }
    
  })
}

loadCategory=()=>{
  return this.priceservice.listcategory().subscribe((response:any)=>{
    if(response?.message){
     this.message = response?.success
          this.messageService.add({ severity: 'info', summary: 'Success', detail: this.message });
    }else{
      if(response?.data){

        this.categoryList=response?.data
         this.cdr.markForCheck()
      }else{
         this.message = response?.success
                  this.messageService.add({ severity: 'info', summary: 'Success', detail: this.message });
      }
    }
  })
}




  loadproducts = () => {
    this.productservice.listproduct().subscribe(async (response: any) => {
      if (response?.data) {
        
            this.productList = response?.data
         this.cdr.markForCheck()
      
      } else {
        if (response?.message) {
          this.message = response?.success
          this.messageService.add({ severity: 'info', summary: 'Success', detail: this.message });



            this.pricetagDetails = await response?.data
           this.cdr.markForCheck()
        } else {
          this.messageService.add({ severity: 'error', summary: 'Message', detail: "Unknwon error has occured" });
        }
      }
    })
  }

  loadproductPrices = () => {
    this.priceservice.loadproductPrices().subscribe((response: any) => {
      if (response?.message) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: this.message });
        this.message=response?.message
      } else {
        if (response?.data) {
              this.priceDetails=response?.data
            this.cdr.markForCheck()  
        } else {
          this.messageService.add({ severity: 'error', summary: 'Message', detail: "Unknwon error has occured" });
        }
      }
    })
  }


    selectedpricedetails(arg0: any) {

    this.taggedpriceTag = arg0;
    this.editselectedPricetag = arg0
    this.visibleBottom = true
  }

    selectedPriceeventsetter = (data: any) => {
    // this.taggedpriceTag = data.pricetagid
    // console.log(this.taggedpriceTag)
  }
  selectproduct($event: SelectChangeEvent) {
    this.productID=$event.value.serialnumber

    let data={
      selectedproduct:$event.value.serialnumber
    }
      this.productservice.listBrandByproductID(data).subscribe((response: any) => {
      if (response?.message) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: this.message });
          this.message=response?.message
      } else {
        if (response?.data) {
                this.brandList=response?.data
                 this.cdr.markForCheck()
        
        } else {
          this.messageService.add({ severity: 'error', summary: 'Message', detail: "Unknwon error has occured" });
        }
      }
    })
  }


  searchPricebyProduct($event: SelectChangeEvent) {
    this.productID=$event.value.serialnumber

    let data={
      selectedproduct:$event.value.serialnumber
    }
      this.priceservice.searchproductPrices(data).subscribe((response: any) => {
      if (response?.message) {
      this.priceDetails=undefined;
         this.message=response?.message
          this.messageService.add({ severity: 'error', summary: 'Message', detail: this.message });

      } else {
        if (response?.data) {

             this.priceDetails=response?.data
              this.cdr.markForCheck()   
        } else {
           this.priceDetails=undefined;
         this.message=response?.message
          this.messageService.add({ severity: 'error', summary: 'Message', detail: this.message });
        }
      }
    })
  }




   runPriceIg = () => {
    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.priceID = "PRC-" + randomInteger
  }
newproductPrice=()=>{
       this.priceTagData();
    this.loadcartlist();
    this.runPriceIg()
    // this.loadTargetgrpup()
      if(this.propricedrawer===false){

  this.propricedrawer=true;
  this.newTag=true;
  }else{
    if(this.propricedrawer=true){
       this.propricedrawer=false;
         this.newTag=true;
    }else{
        this.propricedrawer=false;
          this.newTag=true;

    }
 
  }


  
}


priceTagData=() => {
    this.productservice.listPriceTag().subscribe(async (response: any) => {
      if (response?.data) {
   
        
         this.pricetagList =await response?.data
          this.cdr.markForCheck()
      } else {
        if (response?.message) {
          this.message = response?.message
          // console.log(this.message)
          this.messageService.add({ severity: 'error', summary: 'Message', detail: this.message });
        } else {
          this.message = response?.message
          this.messageService.add({ severity: 'error', summary: 'Message', detail: "Unknwon error has occured" });
        }
      }

    })
  }

  selectpriceTag($event: SelectChangeEvent) {
    console.log($event.value)
    this.productID=$event.value.serialnumber
    this.pricetagID=$event.value.pricetagid
    const productID=$event.value.serialnumber
      let data={
        productID:productID
      }
      
          this.productservice.listBrandByproductID(data).subscribe((response: any) => {
      if (response?.data) {
        this.brandList = response?.data
        this.cdr.markForCheck()
        
      } else {
        if (response?.message) {
          this.message = response?.success
          this.messageService.add({ severity: 'primary', summary: 'Sucess', detail: this.message, life: 3000 });
        } else {
          this.message = "Unknown Error has occured"
          this.messageService.add({ severity: 'danger', summary: 'Attention', detail: this.message, life: 3000 });
        }
      }
    })
  }
 loadcartlist = () => {
    this.productservice.categoryList().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
      } else {
        if (response?.data) {
                  this.categories = response?.data
                  this.cdr.markForCheck()
        } else {
          if (response?.noactivity) {
            this.message=response?.noactivity
                  this.messageService.add({ severity: 'danger', summary: 'Attention', detail: this.message, life: 3000 });
          } else {
            this.message = "Unknown error has occured"
                  this.messageService.add({ severity: 'danger', summary: 'Attention', detail: this.message, life: 3000 });
          }

        }
      }
    })
  }


    productListByCart: Products[] | undefined
  selectedCart($event: SelectChangeEvent) {

this.carteforyID=$event.value.serialnumber
    // alert(this.carteforyID)
let data={
  cartID:this.carteforyID
}

    this.productservice.listproductBycartID(data).subscribe(async (response: any) => {
      if (response?.data) {
        setTimeout(()=>{
            this.productListByCart = response?.data
        },5000)
      
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageService.add({ severity: 'danger', summary: this.message, detail: this.message });
              this.productListByCart=undefined

            this.pricetagDetails = await response?.data
            this.cdr.markForCheck()
            // console.log(this.pricetagDetails)

        } else {
          this.messageService.add({ severity: 'error', summary: 'Message', detail: "Unknwon error has occured" });
        }
      }
    })

}
carteforyID:any;
    brandList: Brand[] | undefined;
    selectedBrand: Brand | undefined
supplierprice:number=0;
 
  selectpriceBrand($event: SelectChangeEvent) {
this.selectedBrand=$event.value
console.log(this.selectedBrand)
let data={
brandid:$event.value.brandid

}
this.priceservice.loadSupplierPriceByBrand(data).subscribe((response:any)=>{
  if(response?.message){
    this.message=response?.message
        this.messageService.add({ severity: 'danger', summary: 'error', detail: this.message, life: 3000 });
  }else{
    if(response?.data){
      this.supplierprice=response?.data[0].marketprice
      console.log(this.supplierprice)
      

    }else{
      this.message=response?.message
        this.messageService.add({ severity: 'danger', summary: 'error', detail: this.message, life: 3000 });
    }
  }
})
}

  groupList: Group[]|undefined;
    selectesgroup: Group|undefined;
  loadTargetgrpup = () => {
    this.productservice.loadTargetgrpup().subscribe((response: any) => {
      if (response?.data) {
              this.groupList = response?.data
                     this.cdr.markForCheck();
        // console.log(this.groupList)
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageService.add({ severity: 'danger', summary: 'error', detail: this.message, life: 3000 });
        }
      }
    })
  }
  selectionGroup($event: SelectChangeEvent) {
    // console.log($event.value)
    this.productGroup=$event.value.groupid
           this.cdr.markForCheck();
}
productGroup:any
productID:any
 markuppercent:number=0;
fixedvalue:number=0;
cartonquantity:number=0
misselaneouscost:number=0
orderprice:number=0;
sellingUnitPrice:number=0;
totalQuantityPrice:number=0
itemWeight:number=0;
itemlength:number=0;
//setting parameters for price objects
totalCost:number=0;
markuppricevalue:number=0;
unitsellingPrice:number=0
cartsellingPrice:number=0;
totalordercost:number=0;
calculateMarkup=(()=>{

 this.totalCost=(this.orderprice+this.misselaneouscost)

 this.markuppricevalue=(this.markuppercent/100) *this.totalCost
 this.unitsellingPrice=(this.totalCost+this.markuppricevalue)/this.cartonquantity
 this.cartsellingPrice=this.totalCost+this.markuppricevalue



})

calculateFixedMarkup=()=>{
 
 this.totalCost=(this.orderprice+this.misselaneouscost)
//  this.markuppricevalue=(this.markuppercent/100) *this.totalCost
 this.unitsellingPrice=(this.totalCost+this.fixedvalue)/this.cartonquantity
 this.cartsellingPrice=this.totalCost+this.fixedvalue


}

savePrice() {
let data={
  orderPrice:this.orderprice,
  marupPrice:this.markuppricevalue,
  unitSellingPrice:this.unitsellingPrice,
  totalordercost:this.totalCost,
  cartsellingPrice:this.cartsellingPrice,
  misslaneousecost:this.misselaneouscost,
   pricetagID:this.pricetagID,
  carteforyID:this.carteforyID,
  selectedBrand:this.selectedBrand?.brandid,
  productID:this.productID,
  priceid:this.priceID
}
console.log(data)
this.priceservice.savePrice(data).subscribe((response:any)=>{
   if (response?.success) {
 
              this.groupList = response?.data
                     this.cdr.markForCheck();
                this.newTag=false;
      this.message = response?.success
      this.distructor();this.loadproductPrices()
          this.messageService.add({ severity: 'info', summary: 'Info', detail: this.message, life: 3000 });  
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageService.add({ severity: 'info', summary: 'Danger', detail: this.message, life: 3000 });
        }
      }
})
}

calculatepriceInKg=()=>{
this.totalCost=(this.orderprice+this.misselaneouscost)
this.markuppricevalue=(this.markuppercent/100)*this.totalCost
 this.unitsellingPrice=(this.totalCost+this.markuppricevalue)/this.itemWeight
  this.cartsellingPrice=this.totalCost+this.markuppricevalue

}

calulateperKgusingFixValue=()=>{
 this.totalCost=(this.orderprice+this.misselaneouscost)
this.markuppricevalue=this.fixedvalue
 this.unitsellingPrice=(this.totalCost+this.markuppricevalue)/this.itemWeight
  this.cartsellingPrice=this.totalCost+this.markuppricevalue
   
}

calculatepriceInYards=()=>{
this.totalCost=(this.orderprice+this.misselaneouscost)
this.markuppricevalue=(this.markuppercent/100)*this.totalCost
 this.unitsellingPrice=(this.totalCost+this.markuppricevalue)/this.itemlength
  this.cartsellingPrice=this.totalCost+this.markuppricevalue

}

calulateperYardusingFixValue=()=>{
 this.totalCost=(this.orderprice+this.misselaneouscost)
this.markuppricevalue=this.fixedvalue
 this.unitsellingPrice=(this.totalCost+this.markuppricevalue)/this.itemlength
  this.cartsellingPrice=this.totalCost+this.markuppricevalue
   
}
// //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CALCULATE THE PRICE OF ITEMS IN UNITS 


calculateMarkupforUnitItem=(()=>{

 this.totalCost=(this.orderprice+this.misselaneouscost)

 this.markuppricevalue=(this.markuppercent/100) *this.totalCost
 this.unitsellingPrice=(this.totalCost+this.markuppricevalue)
 this.cartsellingPrice=this.totalCost+this.markuppricevalue



})
calculateUnitPrices=(()=>{

 this.totalCost=(this.orderprice+this.misselaneouscost)

 this.markuppricevalue=(this.markuppercent/100) *this.totalCost
 this.unitsellingPrice=(this.totalCost+this.markuppricevalue)/this.cartonquantity
 this.cartsellingPrice=0
})

calulateUnitPriceusingFixValue=()=>{
 this.totalCost=(this.orderprice+this.misselaneouscost)
this.markuppricevalue=this.fixedvalue
 this.unitsellingPrice=this.totalCost+this.markuppricevalue
  this.cartsellingPrice=0
  console.log(this.unitsellingPrice)
   
}
// Pricing fixed items in the modules

// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
fixedPricePack:boolean=false
fixedPriceweight:boolean=false
fixedPriceLenght:boolean=false
fixedPriceperItem:boolean=false


setfixedPricePack($event: CheckboxChangeEvent) {
this.fixedPricePack=$event.checked
this.fixedPriceweight=false
this.fixedPriceLenght=false
this.fixedPriceperItem=false
this.orderprice=this.supplierprice
}

setfixedPriceweight($event: CheckboxChangeEvent) {
this.fixedPricePack=false
this.fixedPriceweight=$event.checked
this.fixedPriceLenght=false
this.fixedPriceperItem=false
this.orderprice=this.supplierprice
}

setfixedPriceLenght($event: CheckboxChangeEvent) {
this.fixedPricePack=false
this.fixedPriceweight=false
this.fixedPriceLenght=$event.checked
this.fixedPriceperItem=false
this.orderprice=this.supplierprice
}
setfixedPriceperItem($event: CheckboxChangeEvent) {
this.fixedPricePack=false
this.fixedPriceweight=false
this.fixedPriceLenght=false
this.fixedPriceperItem=$event.checked
this.orderprice=this.supplierprice
}



// Calculating prices of items in cart
calculateFixedModulePrice=()=>{
  this.totalCost=(this.orderprice+this.markuppricevalue)
  this.unitsellingPrice=this.totalCost/this.cartonquantity
  this.cartsellingPrice=this.totalCost
}

calculatepriceByWeightinKG=()=>{
this.totalCost=(this.orderprice+this.markuppricevalue)
 this.unitsellingPrice=(this.totalCost+this.markuppricevalue)/this.itemWeight
  this.cartsellingPrice=this.totalCost

}

calculatepriceByLengthinYard=()=>{
this.totalCost=(this.orderprice+this.markuppricevalue)
 this.unitsellingPrice=(this.totalCost+this.markuppricevalue)/this.itemlength
  this.cartsellingPrice=this.totalCost

}

distructor=()=>{
  this.totalCost=0;
this.markuppricevalue=0;
this.unitsellingPrice=0
this.cartsellingPrice=0;
this.totalordercost=0;
this.itemWeight=0;
this.orderprice=0;
this.misselaneouscost=0;

this.brandList=undefined
this.productList=undefined
this.productList=undefined
this.productListByCart=undefined
this.priceTag=undefined
this.pricetagDetails=undefined
this.selectedPriceTagList=undefined
}
}

