import { Component, inject, OnInit, signal } from '@angular/core';
import { StoreService } from '../../services/store-service';
import { response } from 'express';
import { MessageService } from 'primeng/api';
import { ReceivedStock } from '../../interface/storeinterface';
import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DatePipe } from '@angular/common';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
@Component({
  selector: 'stockreceived',
  imports: [TableModule,ButtonModule,FormsModule,
    ReactiveFormsModule,
    IconFieldModule,InputIconModule,
    InputTextModule,ToggleSwitchModule,
    DatePipe],
  templateUrl: './stockreceived.html',
  styleUrl: './stockreceived.scss',
  providers:[MessageService]
})
export class Stockreceived implements OnInit {
  stockRceivedData:ReceivedStock[]|any
  message:any
  messageservice=inject(MessageService)
  loading=signal(false)
constructor(private storeservice:StoreService){
  this.loadStoreRecivedStock()
  this.loading.set(false)
}
ngOnInit(): void {
  
}

loadStoreRecivedStock=()=>{
  this.storeservice.loadStoreRecivedStock().subscribe((response:any)=>{
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          this.stockRceivedData=response?.data
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 5000 });
        }

      }

  })
}

   searchValue = signal('');
      activityValues = signal<number[]>([0, 100]);
  
     
      clear(table: Table) {
          table.clear();
          this.searchValue.set('');
      }
}
