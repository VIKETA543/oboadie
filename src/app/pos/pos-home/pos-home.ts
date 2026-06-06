import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { PosServcie } from '../../services/pos-servcie';
import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { Badge } from "primeng/badge";
import { Panel } from "primeng/panel";
import { TableModule } from 'primeng/table';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'pos-home',
  imports: [CardModule, ButtonModule, MessageModule, AvatarModule, CurrencyPipe, DividerModule, Badge, Panel,TableModule,IconFieldModule,InputIconModule,InputTextModule,CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './pos-home.html',
  styleUrl: './pos-home.scss',
  providers: [MessageService]
})
export class PosHome implements OnInit {
showInvoice(_t6: any) {
throw new Error('Method not implemented.');
}
  prepared_invoices:any = []
  prepared_credit_invoice:any
  message:any
  loading=signal(false)
  SalesData:any=[];
constructor(private posservice: PosServcie, private messageService: MessageService,private cdr:ChangeDetectorRef){

}

ngOnInit(): void {
this.preparedInvoices()
this.prepared_credit_invoices()
this.join_credit_cash_salse()
}
preparedInvoices=()=>{
  let data={
    dateposted:new Date()
  }
  return this.posservice.prepared_invoices(data).subscribe((response:any)=>{
    if(response?.message){
      this.message = response.message
         this.cdr.markForCheck()
        this.cdr.detectChanges()
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
    }else{
      if(response.data){
        this.prepared_invoices = response.data
        this.cdr.markForCheck()
        this.cdr.detectChanges()
      }else{
        this.message = "No prepared invoices found"
        this.cdr.markForCheck()
        this.cdr.detectChanges()
      }
    }
  })
}

prepared_credit_invoices=()=>{
  let data={
    dateposted:new Date()
  }
  return this.posservice.prepared_credit_invoices(data).subscribe((response:any)=>{
    if(response?.message){
      this.message = response.message
         this.cdr.markForCheck()
        this.cdr.detectChanges()
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
    }else{
      if(response.data){
        this.prepared_credit_invoice = response.data
        this.cdr.markForCheck()
        this.cdr.detectChanges()
      }else{
        this.message = "No prepared invoices found"
        this.cdr.markForCheck()
        this.cdr.detectChanges()
      }
    }
  })
}



join_credit_cash_salse=()=>{
  let data={
    dateposted:new Date()
  }
  return this.posservice.join_credit_cash_salse(data).subscribe((response:any)=>{
    if(response?.message){
      this.message = response.message
         this.cdr.markForCheck()
        this.cdr.detectChanges()
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
    }else{
      if(response.data){
        this.SalesData = response.data
        this.cdr.markForCheck()
        this.cdr.detectChanges()
      }else{
        this.message = "No prepared invoices found"
        this.cdr.markForCheck()
        this.cdr.detectChanges()
      }
    }
  })
}

}
