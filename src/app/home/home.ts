import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DrawerModule } from 'primeng/drawer';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Popover, PopoverModule } from 'primeng/popover';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { Toolbar } from 'primeng/toolbar';
import { ProductsList, ProductCategory, ProductsTrends } from '../interface/products';
import { productservice } from '../services/productservice';
import { Router } from '@angular/router';
import { DividerModule } from 'primeng/divider'; 
@Component({
  standalone:true,
  selector: 'home',
  imports: [CommonModule,
    DividerModule,
    DrawerModule,
    Toolbar,
    PopoverModule,
    InputTextModule,
    InputIcon, 
    IconField,
    SplitButtonModule,
    ToastModule,
    CarouselModule,
    ButtonModule,
    TagModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
showSelectedCart(arg0: string) {
throw new Error('Method not implemented.');
}

    @ViewChild('op') op!: Popover;
//   protected readonly title = signal('premierprime');
  items:any
 visible1: boolean = false;
  products: ProductsList[]=[];
  productTrend:ProductsTrends[]=[];
  productcart:ProductCategory[]=[]
    responsiveOptions: any[] | undefined;
    message:any
  constructor(private productService: productservice, private router:Router,  private mfc:ChangeDetectorRef){
      
  }
  setResponsiveOptions(){
     this.responsiveOptions = [
            {
                breakpoint: '1400px',
                numVisible: 4,
                numScroll: 1
            },
            {
                breakpoint: '1199px',
                numVisible: 3,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '575px',
                numVisible: 1,
                numScroll: 1
            }
        ]
  }
  setButtonItems(){
    this.items = [
            {
                label: 'Login',
                icon: 'pi pi-login',
                command: () => {
                    // this.messageService.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
                },
            },
            {
                label: 'Delete',
                icon: 'pi pi-times',
                command: () => {
                    // this.messageService.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
                },
            },
            {
                separator: true,
            },
           
        ];
  }
  ngOnInit(): void {
         this.setProducts();
   
          this.cartegories();
        this.setResponsiveOptions();

        this.setTrending()  
  }
  
  setProducts=()=>{
    this.productService.getProductsData().subscribe((response:any)=>{
        if(response?.message){
             this.message=response?.message
             setTimeout(()=>{this.message=undefined},5000)
        }else{
            if(response?.arrival){

        
                   setTimeout(()=>{
                            this.products=response?.arrival
        this.mfc.markForCheck()
        // 
    },1000)
                // console.log(  this.products)
            }else{
                 this.message="unknown error has occured"
                 setTimeout(()=>{this.message=undefined},5000)
            }
        }
       
      })
  }     
    
setTrending=()=>{
    this.productService.getTrendingData().subscribe((response:any)=>{
        if(response?.message){
             this.message=response?.message
             setTimeout(()=>{this.message=undefined},5000)
        }else{
            if(response?.trending){
                this.productTrend=response?.trending
            }else{
                 this.message="unknown error has occured"
                 setTimeout(()=>{this.message=undefined},5000)
            }
        }
       
      })
  }

  
  cartegories=()=>{
     this.productService.cartegories().subscribe((response:any)=>{
        if(response?.message){
          this.message=response?.message
            //  console.log(response?.message)
            setTimeout(()=>{this.message=undefined},5000)
        }else{
            if(response?.data){
             
                setTimeout(()=>{
              this.productcart=response?.data
                },5000)
            }else{
              setTimeout(()=>{this.message=undefined},5000)
                 this.message="unknown error has occured"
            }
        }
       
      })
  }
      getSeverity=(status: string)=>{
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
        }
        return
    }
   
    toggle(event:any) {
        this.op.toggle(event);
    }

    Login=()=> {
      this.router.navigate(['admhome'])
    }
    signup=()=>{

    }
}
