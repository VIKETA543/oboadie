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

@Component({
  selector: 'uacgenerator',
  imports: [Divider,InputTextModule,FormsModule,SelectModule,ToastModule,TextareaModule,ButtonModule],
  templateUrl: './uacgenerator.html',
  styleUrl: './uacgenerator.scss',
     providers:[MessageService],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class UACGenerator {
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
constructor(private storeservice:StoreService,
  private cdr:ChangeDetectorRef,
   private departmentservice:Departments,
   private router:Router,
   private routes:ActivatedRoute){

    this.generateHook()
    this.listDepartments()
    this.listStores()
   }


   generateHook=()=>{
    let date =new Date()

      let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.uacpNumber = "UAC" + date.getMonth()+ "-" + randomInteger
}
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

 listDepartments=()=>{
    return this.departmentservice.getDepartments().subscribe((response:any)=>{
      if(response?.message){
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
      }else{
        if(response?.success){
          this.departments=response?.data
          this.cdr.detectChanges()
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
          this.cdr.detectChanges()
          console.log(this.stores)
        }
      }
    })
  }
  
  createHook=()=>{

  }
}
