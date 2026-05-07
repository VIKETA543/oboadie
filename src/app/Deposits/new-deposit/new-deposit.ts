import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectButtonModule, SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { Crmservice } from '../../services/crmservice';
import { MessageModule } from 'primeng/message';
import { Divider } from "primeng/divider";
import { InputNumberModule } from 'primeng/inputnumber';
import { FluidModule } from 'primeng/fluid';
import { Customer } from '../../interface/posinterface';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { CurrencyPipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  standalone: true,
  selector: 'new-deposit',
  imports: [SelectButtonModule,CurrencyPipe,DialogModule,InputNumberModule, InputTextModule,SelectModule, FluidModule, FormsModule, MessageModule, PanelModule, ButtonModule, RouterOutlet, ToastModule, Divider],
  templateUrl: './new-deposit.html',
  styleUrl: './new-deposit.scss',
  providers: [MessageService],
  changeDetection:ChangeDetectionStrategy.Default
})
export class NewDeposit implements OnInit, OnDestroy {

  getCustomersaved = signal(false)
  customerNumber: any | undefined
  private timerId: any;
  CreditAmount: number = 0;
  sumBalance: number = 0;
  message: any
  customerData: Customer[] | any
  selectedCustomer: Customer | any
  selectedCustomerData:Customer|any
  transactionNumber: any
  isCustomersloaded=signal(false)
  currentBalance: number=0
  isDeposit=signal(false)
  accountNumber:any
  constructor(private router: Router, private routes: ActivatedRoute, private crmservcie: Crmservice, private cdr:ChangeDetectorRef) {
    this.isDeposit.set(true)
  }
cancel=()=>{
  this.isDeposit.set(false)
}
  // startTimer() {
  //   this.timerId = setInterval(() => {
  //     this.crmservcie.isCustomerSaved()
  //     if (this.crmservcie.isCustomerSaved() === true) {
  //       setTimeout(() => {
  //         this.getCustomersaved.set(this.crmservcie.isCustomerSaved())
  //         this.customerNumber = this.crmservcie.getCustomerNumber()
  //         clearInterval(this.timerId);

  //         this.loadSelectedCustomer();

  //       }, this.timerId)



  //     }

  //   }, 1000);
  // }
  ngOnDestroy(): void {

  }
  ngOnInit(): void {

  }
  selectionOption: any
  messageservice = inject(MessageService)
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  contninueFind() {
let data={
  accountNumber:this.accountNumber
}
          this.crmservcie.loadaccount(data).subscribe((response: any) => {
            if (response?.message) {
              this.message = response?.message
              this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            } else {
              if (response?.data) {
                        this.selectedCustomerData = response?.data
                        this.currentBalance=response?.balance[0].balance
                        console.log('the current balance is:',response?.balance[0].balance)
                             this.cdr.markForCheck()
                          let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
                this.transactionNumber = "CDTID" + new Date().getDate() + "-" + randomInteger
                 this.isDeposit.set(false)
           
              } else {
                this.message = response?.message
                 this.isDeposit.set(false)
                this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
              }

            }
          })

  }

  calculateDeposit() {
 this.sumBalance=(this.currentBalance+this.CreditAmount)
}

  submitDeposit() {
    let data={
      accountNumber:this.accountNumber,
      transactionNumber:this.transactionNumber,
      amount:this.CreditAmount,
      sumBalance:this.sumBalance,
      date:new Date(),
      isCurrent:true
    }
 this.crmservcie.postDesposit(data).subscribe((response:any)=>{
  if(response?.message){
    this.message=response?.message
     this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
  }else{
    if(response.success){
      this.message=response?.success
       this.messageservice.add({ severity: 'success', summary: 'success', detail: this.message, life: 5000 });
    }else{
      this.message='Unknown error has occured'
       this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
    }
  }
 })

}
  stateOptions: any[] = [{ label: 'WALK IN CUSTOMER', value: 'WALK IN CUSTOMER' }, { label: 'REGISTGERED CUSTOMER', value: 'REGISTGERED CUSTOMER' }];;
  value: string = 'one-way';



}
