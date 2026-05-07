import { Component, signal } from '@angular/core';
import { Crmservice } from '../../services/crmservice';
import { response } from 'express';
import { accountData } from '../../interface/crmInterface';
import { MessageService } from 'primeng/api';
import { DatePipe, CurrencyPipe } from '@angular/common';
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
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { Tooltip } from 'primeng/tooltip';

@Component({
  selector: 'deposit-accounts',
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
      CurrencyPipe, NgxBarcode6, NgxPrintDirective,],
  templateUrl: './deposit-accounts.html',
  styleUrl: './deposit-accounts.scss',
  providers: [MessageService]
})
export class DepositAccounts {
showAccountDetails(_t43: any) {
throw new Error('Method not implemented.');
}
isAccountOpened($event: ToggleSwitchChangeEvent,_t40: any) {
throw new Error('Method not implemented.');
}
  message: string = '';
  depositsData:accountData[] = []
  isAccountsLoaded=signal(false);
  loading=signal(false);

      searchValue = signal('');
    activityValues = signal<number[]>([0, 100]);
  constructor(private crmservice:Crmservice, private messageService: MessageService) {
    this.loadDepositAccounts()
  }


  loadDepositAccounts(){
    this.loading.set(true)
    this.crmservice.getDepositAccounts().subscribe((response: any) => {
      if(response?.message){
        this.message = response.message;
        this.loading.set(false)
        this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
      }else{
        if(response?.data){
          this.depositsData = response.data;
          this.isAccountsLoaded.set(true);
             this.loading.set(false)
        }else{
          this.message = 'No data found';
             this.loading.set(false)
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
        }
      }
    })
  }

    clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }

}
