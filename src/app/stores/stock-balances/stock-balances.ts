import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { StoreService } from '../../services/store-service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { response } from 'express';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { stockBalanceData } from '../../interface/storeinterface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'stock-balances',
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
    TagModule],
  templateUrl: './stock-balances.html',
  styleUrl: './stock-balances.scss',
  providers:[MessageService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class StockBalances implements OnInit{

  constructor(private storeservice:StoreService,@Inject(PLATFORM_ID) private platformId: Object,private cdr: ChangeDetectorRef){
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
  }
    credentials: any
      userData: any
      message:any
      stockBalance:stockBalanceData[]=[]
      transaction:stockBalanceData[]=[]

       searchValue = signal('');
  activityValues = signal<number[]>([0, 100]);
   loading=signal(false)
ngOnInit(): void {
  this.loadcurrentStocklevel()
}
loadcurrentStocklevel=()=>{
  let data={
    store_number:this.userData[0].storenumber
  }
  console.log(data)
  this.storeservice.loadcurrentStocklevel(data).subscribe((response:any)=>{
    if(response?.message){
      this.message=response?.message
    }else{
      if(response?.data){
        setTimeout(()=>{
            this.stockBalance=response?.data
          this.cdr.markForCheck()
          this.cdr.detectChanges()
        },250)
      
      }else{
        this.message='Unknown error has occured'
      }
    }
  })
}
 clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }

is_showing_transaction=signal(false)
  showTransaction(_t39: any) {
    this.is_showing_transaction.set(true)
    console.log(_t39)
    let data={
      store_number:_t39?.store_number,
      product_brand:_t39.product_brand,
      product_number:_t39.product_number
    }
    this.storeservice.loadtransactions(data).subscribe((response:any)=>{
      if(response?.message){
        this.message=response?.message
      }else{
        if(response?.data){
          this.transaction=response?.data
        }else{
          this.message='Unknown error has occured'
        }
      }
    })
}

}
