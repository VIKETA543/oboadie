import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
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
import { TableModule } from 'primeng/table';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Products } from '../admin/products/products';
import { DividerModule } from 'primeng/divider';
import { CheckboxModule } from 'primeng/checkbox';
import { TooltipModule } from 'primeng/tooltip';
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

selectedcategory: any;
selectedbrand: any;
unitCost: boolean=false;
marginPrices: boolean=false;
markupPricing: boolean=false;
orderprice: number=0.0;
variableCost: number=0.0;
totalincarton: number=0;
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
          // console.log(this.pricetagDetails)

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
    //       this.cdr.detectChanges();
    // this.zone.run(()=>{

    // })

    // this.editpricetagName="hjopss"

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
        this.getpriceTagDetails()
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
    this.productservice.getpriceTagDetails().subscribe((response: any) => {
      if (response.data) {
        setTimeout(async () => {

          this.pricetagDetails = await response?.data
          this.cdr.markForCheck()
          // console.log(this.pricetagDetails)
        }, 5000)
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
    this.pricetagID = "PRCT-" + randomInteger
  }
  newpriceTag() {
    this.newTag = true
    this.genranCode()
    this.isNewtag.update((isNewtag) => !this.isNewtag);
  }
  refreshPriceTag = () => {
    this.getpriceTagDetails()
    this.cdr.markForCheck()
  }



  selectPrice($event: SelectChangeEvent) {

  }

  refreshData() {

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
  constructor(private cdr: ChangeDetectorRef, private productservice: productservice, private zone: NgZone,) {
    this.setpricetagOptions()
    cdr.markForCheck()


  }
  listPrices = async () => {
    this.productservice.listPrices().subscribe((response: any) => {
      console.log("Prices objects", response);
    })
  }

  listpriceTag = async () => {
    this.productservice.listPriceTag().subscribe(async (response: any) => {
      if (response?.data) {
        console.log("Price Tag", response?.data)
        
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

    this.productservice.dropPriceTag(data).subscribe((response: any) => {
      if (response?.success) {
        this.message = response?.success
        this.messageService.add({ severity: 'info', summary: 'Success', detail: this.message });

        setTimeout(async () => {

          this.pricetagDetails = await response?.data
          this.cdr.markForCheck()
          // console.log(this.pricetagDetails)
        }, 5000)
      } else {
        this.messageService.add({ severity: 'error', summary: 'Message', detail: "Unknwon error has occured" });
      }
    })
  }

  addpriceTag = () => {
    this.getpriceTagDetails()
    this.listpriceTag();

    this.drawerVisibility = true
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
rowcounter:number=0
 categories: CategoryList[] = [];
  loadproducts = () => {
    this.productservice.listproduct().subscribe((response: any) => {
      if (response?.data) {
        setTimeout(()=>{
            this.productList = response?.data
        },5000)
      
      } else {
        if (response?.message) {
          this.message = response?.success
          this.messageService.add({ severity: 'info', summary: 'Success', detail: this.message });

          setTimeout(async () => {

            this.pricetagDetails = await response?.data
            this.cdr.markForCheck()
            // console.log(this.pricetagDetails)
          }, 5000)
        } else {
          this.messageService.add({ severity: 'error', summary: 'Message', detail: "Unknwon error has occured" });
        }
      }
    })
  }

  loadproductPrices = () => {
    this.productservice.loadproductPrices().subscribe((response: any) => {
      if (response?.message) {
        this.messageService.add({ severity: 'info', summary: 'Success', detail: this.message });
        setTimeout(async () => {
          this.message=response?.message
          this.cdr.markForCheck()
        }, 5000)
      } else {
        if (response?.data) {
               setTimeout(async () => {
        this.priceDetails=response?.data
          this.cdr.markForCheck()
        }, 5000)


    
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
    //       this.cdr.detectChanges();
    // this.zone.run(()=>{

    // })

    // this.editpricetagName="hjopss"

  }

    selectedPriceeventsetter = (data: any) => {
    // this.taggedpriceTag = data.pricetagid
    // console.log(this.taggedpriceTag)
  }
  selectproduct($event: SelectChangeEvent) {
    let data={
      selectedproduct:$event.value.serialnumber
    }
      this.productservice.searchproductPrices(data).subscribe((response: any) => {
      if (response?.message) {
        console.log(response?.message)
        this.messageService.add({ severity: 'info', summary: 'Success', detail: this.message });
        setTimeout(async () => {
          this.message=response?.message
          this.cdr.markForCheck()
        }, 5000)
      } else {
        if (response?.data) {
          this.priceDetails=response?.data
        } else {
          this.messageService.add({ severity: 'error', summary: 'Message', detail: "Unknwon error has occured" });
        }
      }
    })
  }

newproductPrice=()=>{
       this.priceTagData();
    this.loadcartlist();
    this.loadBrandList();
    this.loadTargetgrpup()
  
      if(this.propricedrawer===false){

  this.propricedrawer=true;
  }else{
    if(this.propricedrawer=true){
       this.propricedrawer=false;
    }else{
        this.propricedrawer=false;

    }
 
  }


  
}


priceTagData=() => {
    this.productservice.listPriceTag().subscribe(async (response: any) => {
      if (response?.data) {
   
        
         this.pricetagList =await response?.data
              console.log("Price Tag",this.pricetagList)
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

  }
 loadcartlist = () => {
    this.productservice.categoryList().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
      } else {
        if (response?.data) {
          console.log("Category", response.data)
          // setTimeout(()=>{

                  this.categories = response?.data
                  this.cdr.markForCheck()
          // },5000)
        } else {
          if (response?.noactivity) {
            console.log(response?.data)
          } else {
            this.message = "Unknown error has occured"
          }

        }
      }
    })
  }

  selectedCart($event: SelectChangeEvent) {
throw new Error('Method not implemented.');
}
    brandList: Brand[] | undefined;
    selectedBrand: Brand | undefined

      loadBrandList = () => {
    this.productservice.listBrand().subscribe((response: any) => {
      if (response?.data) {
        this.brandList = response?.data
              console.log("brand data ",this.brandList)
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
  selectpriceBrand($event: SelectChangeEvent) {
this.selectedBrand=$event.value
}

  groupList: Group[]|undefined;
    selectesgroup: Group|undefined;
  loadTargetgrpup = () => {
    this.productservice.loadTargetgrpup().subscribe((response: any) => {
      if (response?.data) {
        setTimeout(()=>{
              this.groupList = response?.data
        },5000)
        // console.log(this.groupList)
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageService.add({ severity: 'info', summary: 'Info', detail: this.message, life: 3000 });
        }
      }
    })
  }
  selectionGroup($event: SelectChangeEvent) {
// throw new Error('Method not implemented.');
}

}
