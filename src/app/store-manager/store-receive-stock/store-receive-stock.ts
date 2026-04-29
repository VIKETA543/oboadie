
import { Component, OnInit, Signal, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SelectModule } from 'primeng/select';
import { FileUploadModule } from 'primeng/fileupload';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { StoreService } from '../../services/store-service';
import { MessageService } from 'primeng/api';
import { ReceivedStock } from '../../interface/storeinterface';
import { DialogModule } from 'primeng/dialog';
import { Table, TableModule } from 'primeng/table';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { CommonModule } from '@angular/common';
import { Tooltip } from "primeng/tooltip";



@Component({
  selector: 'store-receive-stock',
  imports: [DialogModule,
    ToggleSwitchModule,
    TableModule,
    InputIconModule,
    IconFieldModule,
    RatingModule,
    TagModule,
    ButtonModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    ConfirmDialogModule,
    ToastModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputTextModule, Tooltip]
    ,
  templateUrl: './store-receive-stock.html',
  styleUrl: './store-receive-stock.scss',
  providers: [MessageService]
})
export class StoreReceiveStock implements OnInit {

loading=signal(false);
     searchValue = signal('');
       activityValues = signal<number[]>([0, 100]);

  storeNumber: any | undefined
  message: any | undefined
  messageservice = inject(MessageService)
  receivedStockData: ReceivedStock[] = []
  constructor(private storeservice: StoreService) { }


  ngOnInit(): void {
    this.receive_stock()
   this. loading.set(true)

  }
  receive_stock = () => {
    let data = {
      storeNumber: 'STR-S-2379493'
    }
    this.storeservice.receive_stock(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
          this. loading.set(false)
      } else {
        if (response?.data) {
          this.receivedStockData = response?.data
          console.log('tHE RECEIVED STOCK, ',this.receivedStockData)
          this. loading.set(false)
           this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.Norecords
            this. loading.set(false)
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }
  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }
  postToSummaeries($event: ToggleSwitchChangeEvent,d:ReceivedStock) {
    let data={
      store_id:d.store_id,
      product_number:d.received_productid,
      stock_brandd:d.received_brand,
      transation_date:d.date_received,
      transaction_details:'none',
      is_stock_opened:true,
      new_quantity:d.quantity_received,
      date_opened:new Date(),
    }
    console.log(data)
   this.storeservice.poststocksummeries(data).subscribe((response:any)=>{
    if(response?.message){
      this.message=response?.message
         this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
    }else{
      if(response?.success){
        this.message=response?.success
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
      }else{
           this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      }
    }
   })
}
}
