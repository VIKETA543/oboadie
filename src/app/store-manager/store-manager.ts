import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { DialogModule } from 'primeng/dialog';
import { DividerModule, Divider } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Popover, PopoverModule } from 'primeng/popover';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { AvatarModule } from 'primeng/avatar';
import { DatePickerModule } from 'primeng/datepicker';
import { DrawerModule } from 'primeng/drawer';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { Table, TableModule, TablePageEvent } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { Tooltip } from 'primeng/tooltip';
import { StoreService } from '../services/store-service';
import { MessageService } from 'primeng/api';
import { Storeinterface, StoreListInterface } from '../interface/storeinterface';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Wearehouse } from '../services/wearehouse';
import { Cartegory, Product, Stockbycategories } from '../interface/warehouseinterface';

@Component({
  standalone:true,
  selector: 'store-manager',
  imports: [ButtonModule,
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
    AvatarModule, RouterOutlet],
  templateUrl: './store-manager.html',
  styleUrl: './store-manager.scss',
    providers: [MessageService],
 
})
export class StoreManager implements OnInit {



constructor(private warehouseservice :Wearehouse, private router:Router,private  routes:ActivatedRoute,  private storeservice:StoreService,private messageservice: MessageService, private cdr: ChangeDetectorRef){}

ngOnInit(): void {
  
}
getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

recieveStock=()=>{
  
this.router.navigate(['store-receive-stock'],{relativeTo:this.routes})

}
// 
createStore=()=>{
  this.router.navigate(['new-store'],{relativeTo:this.routes})

  // this.isNewstore.set(true)
}

storeType=()=>{
  this.router.navigate(['store-type'],{relativeTo:this.routes})

  // this.isNewstore.set(true)
}

isNewstore=signal(false);
storeNumber:any
selectedStoreType:Storeinterface|any;
StoreName: any;
StoreLocation: any;
storeDigitalAddress: any;
storeDescription: any;
message:any
warehouseStockID:any
  cartegory: Cartegory[] = []
  selectedcartegory: any;
 selectedproduct: any;



selectStoretype($event:SelectChangeEvent ) {
this.selectedStoreType=$event.value.storeidentityid
console.log(this.selectedStoreType)
}








isStoremanager=signal(false)
openStoreManager=()=>{
 }

isViewingStore=signal(false)
isPush=signal(false)

storeStockNumber:any;



 


  isLoadingbyCategories = signal(false)
  isstockhistroyLoading = signal(false)




}
