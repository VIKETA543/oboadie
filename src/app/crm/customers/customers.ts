import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Crmservice } from '../../services/crmservice';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from "primeng/button";
import { ButtonModule } from 'primeng/button';
import { MessageModule } from 'primeng/message';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'customers',
  standalone: true,
  imports: [IconFieldModule, InputIconModule, TableModule, TagModule, InputTextModule, DatePipe, ButtonModule, MessageModule, ToastModule,],
  templateUrl: './customers.html',
  styleUrls: ['./customers.scss'],
 providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Customers implements OnInit {
  private messageService: MessageService = inject(MessageService);
deleteCustomer(_t60: any) {
  console.log('delete customer', _t60);
  let data = {
    customer_number: _t60.customer_number
  }
  return this.crmService.deleteCustomer(data).subscribe((response: any) => {
    if (response?.success) {
      this.message = response.success;
       this.loadcustomers()
      this.messageService.add({ severity: 'info', summary: 'Success', detail:this.message });
    }else{
      this.message = response?.message;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
    }
  })
}
  customers!: Customers[];
  selectedCustomers!: Customers;
  message!: string;
  constructor(private crmService: Crmservice) { }
    private cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
   this.loadcustomers()
  }

loadcustomers=()=>{
  this.crmService.loadcustomers().subscribe((response:any)=>{
    if(response?.data) {
      console.log(response)
      this.customers = response?.data;
      this.cd.markForCheck();
    }else{
      this.message = response?.message;
      console.log('No data found')
    }
  })
}
filterTable(event: Event, table: Table) {
    const inputElement = event.target as HTMLInputElement;
    table.filterGlobal(inputElement.value, 'contains');
  }
  
 getSeverity(status: boolean) {
        switch (status) {
            case false:
                return 'danger';
        
            case true:
                return 'success';
        
            default:
                return 'info';
        }
    }

     getSeverity1(status: string) {
        switch (status) {
            case 'NOT REGISTERED':
                return 'danger';
        
            case 'REGISTERED':
                return 'info';
        
            default:
                return 'warn';
        }
    }
}







