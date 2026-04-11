import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { Supplierservce } from '../../services/supplierservce';
import { MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Products } from '../../interface/suppliers';
import { TooltipModule } from 'primeng/tooltip';



@Component({
  selector: 'supplierprices',
  imports: [ToastModule,
    TagModule,
    RippleModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
IconFieldModule,
InputIconModule,
TooltipModule
  ],
  templateUrl: './supplierprices.html',
  styleUrl: './supplierprices.scss',
  providers: [MessageService],
  changeDetection:ChangeDetectionStrategy.Default
})
export class Supplierprices implements OnInit {

message:any
// productList:any
counter:number=0;
  loading: boolean = true;
    searchValue = signal('');
      productList:Products[]=[];
    activityValues: number[] = [0, 5];


  constructor(private supplierservce:Supplierservce,private messageservice:MessageService,private cdr:ChangeDetectorRef){}

  ngOnInit(): void {
    this.listProducts()
  }
listProducts=()=>{
  this.supplierservce.listProducts().subscribe((response:any)=>{
if(response?.message){
  if (response?.message) {
          this.message = response?.message
          this.messageservice.add({ severity: 'info', summary: 'Info', detail: this.message, life: 3000 });
        }
}else{
  if(response?.data){

this.productList=response?.data

//  this.productList.forEach((product: Products) => (product.title = product.title?.toUpperCase()));
            this.loading = false;
this.cdr.markForCheck()

  }else{
       this.message = response?.message
          this.messageservice.add({ severity: 'info', summary: 'Info', detail: this.message, life: 3000 });
  }
}
})

}
    clear(table: Table) {
        table.clear();
        this.searchValue.set('');
    }
onGlobalFilter(table: Table, event: Event) {
table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
console.log(table.value)
}
saveEdit=(product:any)=>{
  let data={
  productid:product.serialnumber,
marketprice:product.marketprice,
brandid:product.brandid,
date:new Date()
  }
this.supplierservce.savePrice(data).subscribe((response:any)=>{
  if(response?.message){
    this.message = response?.message
    this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
  }else{
    if(response?.success){
      this.message = response?.success
    this.listProducts()
    this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 })
  
}else{
    this.message = response?.message
    this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
}
  }
})
}
  onDelete=(product:any)=>{
  let data={
  productid:product.serialnumber,
brandid:product.brandid,
  }
  this.supplierservce.deletePrice(data).subscribe((response:any)=>{
    if(response?.message){
      this.message = response?.message
      this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
    }else{
      if(response?.success){
        this.message = response?.success
        this.listProducts()
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 });
      }else{
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      }
    }
  })
}
}
