import { Component, inject, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { StoreService } from '../../services/store-service';
import { DatePipe, isPlatformBrowser } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Table, TableModule } from 'primeng/table';
import { MessageModule } from 'primeng/message';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Avatar } from 'primeng/avatar';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'store-stock-balances',
  imports: [ToastModule,DatePipe,Avatar,
    ButtonModule,IconFieldModule,InputIconModule,TableModule,MessageModule,FormsModule,InputTextModule],
  templateUrl: './store-stock-balances.html',
  styleUrl: './store-stock-balances.scss',
  providers:[MessageService]
})
export class StoreStockBalances implements OnInit {
  private messageservice=inject(MessageService)
  message:any
   userData: any
    credentials: any
    stockData:any[]=[]
         searchValue = signal('');
       activityValues = signal<number[]>([0, 100]);
constructor(private storeservce:StoreService,@Inject(PLATFORM_ID) private platformId: Object){
 
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
  ngOnInit(): void {
    this.stockbalances()
  }

  stockbalances=()=>{
          let data = {
      storeNumber:  this.userData[0]?.storenumber
    }
    this.storeservce.stockbalances(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });

      } else {
        if (response?.data) {
          this.stockData = response?.data
          console.log('STOCK DATA, ',this.stockData)
           this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.Norecords
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }

 clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }
}
