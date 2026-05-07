import { DatePipe, CurrencyPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxBarcode6 } from 'ngx-barcode6';
import { NgxPrintDirective } from 'ngx-print';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Table, TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { Tooltip } from 'primeng/tooltip';
import { DepositSummary } from '../../interface/crmInterface';
import { Crmservice } from '../../services/crmservice';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'deposit-details',
  imports: [ToolbarModule,
        ToastModule, ButtonModule,
        IconFieldModule,
        InputIconModule,
        SplitButtonModule,
        InputTextModule, Tooltip,
        TableModule,
        ToggleSwitchModule,
        FormsModule, Divider,
        DialogModule,
        TextareaModule,
        CheckboxModule,
        DatePipe, SelectModule,
        InputNumberModule, FluidModule,
        CurrencyPipe, NgxBarcode6, NgxPrintDirective],
  templateUrl: './deposit-details.html',
  styleUrl: './deposit-details.scss',
  providers: [MessageService]
})
export class DepositDetails {
  messageservcie = inject(MessageService)
message: string = '';
constructor(private crmservice:Crmservice){
  this.loadDepositSummeries()
}
isAccountsLoaded=signal(false)
loading=signal(false);
depositsData:DepositSummary[]=[]
      searchValue = signal('');
    activityValues = signal<number[]>([0, 100]);

  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }


  loadDepositSummeries=()=>{
    this.loading.set(true)
    return this.crmservice.loadDepositSummeries().subscribe((response:any) => {
      if(response?.message){
        this.message = response.message;
        this.loading.set(false)
          this.isAccountsLoaded.set(false);
        this.messageservcie.add({ severity: 'error', summary: 'Error', detail: this.message });
      }else{
      if(response?.data){
           this.depositsData = response.data;
           this.isAccountsLoaded.set(true);
      this.loading.set(false);
      }else{
          this.isAccountsLoaded.set(false);
        this.depositsData = [];
        this.loading.set(false);
        this.message='No deposit records found.'
        this.messageservcie.add({ severity: 'info', summary: 'Info', detail: 'No deposit records found.' });
      }
      }
   
    })
  }
  showAccountDetails(_t44: any) {

}
}
