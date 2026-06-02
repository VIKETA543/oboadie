import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Divider } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { Departments } from '../../services/departments';
import { StoreService } from '../../services/store-service';
import { MessageService } from 'primeng/api';
import { Store } from '../../interface/storeinterface';
import { DepartmentInterface } from '../../interface/Departmet';
import { Usercredentials } from '../../interface/Users';
import { Userservice } from '../../services/userservice';
import { response } from 'express';
import { environment } from '../../../environments/environment';
import * as CryptoJS from 'crypto-js';
import { SelectButtonModule, SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
@Component({
  selector: 'uacgenerator',
  imports: [Divider,InputTextModule,FormsModule,SelectModule,SelectButtonModule,ToastModule,TextareaModule,ButtonModule,FormsModule,CommonModule,ToggleSwitchModule],
  templateUrl: './uacgenerator.html',
  styleUrl: './uacgenerator.scss',
     providers:[MessageService],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class UACGenerator {
isAllstores($event: ToggleSwitchChangeEvent,arg1: string) {
  let data={
    storeNumber:arg1
  }
  this.departmentservice.hookAllStores(data).subscribe((response:any)=>{
    if(response?.message){
      this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
    }else{
      if(response?.success){
        this.message = response?.success
        this.selectedstore=response?.data
        console.log(this.selectedstore)
      }
    }
  }) 
}
isAlldepartments($event: ToggleSwitchChangeEvent,arg1: string) {
  let data={
    hoid:arg1
}
  this.departmentservice.isAlldepartments(data).subscribe((response:any)=>{
    if(response?.message){
      this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
    }else{
      if(response?.success){
        this.message = response?.success
        this.selecteddepartment=response?.data
        console.log(this.selecteddepartment)
          this.messageservice.add({ severity: 'success', summary: 'Info', detail: this.message, life: 5000 });
      }
    }
})
}

  messageservice=inject(MessageService)
  stores:Store[]=[]
  selectedstore:Store|undefined
  departments:DepartmentInterface[]=[]
  selecteddepartment:DepartmentInterface|undefined
  uacpNumber:any
  message:any
hookDescription: any;
users:Usercredentials[]=[];
selecteduser:Usercredentials|undefined
uac_id:any
selectedOption:any
redirectObject:any
private k=environment.uacp_enc_key
encryptedUAC:any
selectedBrand:any
hook_to:boolean=false
hook_to_all_departments:boolean=false
hook_to_all_stores:boolean=false

brandOptions: any[] = [
    { label: 'STORE', value: 'MAIN STORE' },
    { label: 'POS', value: 'POINT OF SALES' },
    { label: 'CASHIER', value: 'CASH AND PAYMENT' },
    { label: 'WAREHOUSE MANAGER', value: 'WAREHOUSE MANAGER' },
    { label: 'ADMINISTRATOR', value: 'ADMINISTRATOR' }
  ];

constructor(private storeservice:StoreService,
  private cdr:ChangeDetectorRef,
   private departmentservice:Departments,
   private router:Router,
   private routes:ActivatedRoute,
  private userservice:Userservice){

    this.generateHook()
    this.listDepartments()
    this.listStores()
    this.getUsers();
    
   }

    generateHook(length: number = 16): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const code=Array.from({ length }, () => chars[Math.floor(Math.random() * 16)]).join('');
    return this.uacpNumber= code.match(/.{1,4}/g)?.join('-') || "";
  }
 




 listDepartments=()=>{
    return this.departmentservice.getDepartments().subscribe((response:any)=>{
      if(response?.message){
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
      }else{
        if(response?.success){
          this.departments=response?.data
          // this.cdr.detectChanges()
          console.log(this.stores)
        }
      }
    })
  }

  
  listStores=()=>{
    return this.storeservice.listallStores().subscribe((response:any)=>{
      if(response?.message){
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
      }else{
        if(response?.data){
          this.stores=response?.data
          // this.cdr.detectChanges()
          console.log(this.stores)
        }
      }
    })
  }
  
getUsers=()=>{
  this.userservice.userredentials().subscribe((response:any)=>{
    if(response?.message){
        this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
    }else{
      if(response?.data){
        this.users=response?.data
        console.log(this.users)
        // this.uac_id=this.users[0]?.uac_id
      }
    }
  })
}
  createHook=()=>{
this.encryptedUAC=CryptoJS.AES.encrypt(this.uacpNumber, this.k).toString();
console.log(this.selectedOption)
let data={
hrid:this.encryptedUAC,
 departement:this.selecteddepartment?.hoid, 
 storeMumber:this.selectedstore?.storenumber,
   login_redirect:this.selectedBrand, 
  description:this.hookDescription, 
  postedDate:new Date(), 
  user:this.selecteduser?.uac_id, 
  access:true

}
console.log(data)
this.userservice.submitUac(data).subscribe((response:any)=>{
if(response?.message){
   this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
}else{
  if(response?.success){
   this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'Info', detail: this.message, life: 5000 });
  }else{
   this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
  }
}
})
  }

 
  
}
