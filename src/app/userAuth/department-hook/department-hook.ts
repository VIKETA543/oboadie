import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Divider } from "primeng/divider";
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext'; 
import { SelectModule } from 'primeng/select';
import { Store } from '../../interface/storeinterface';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TextareaModule } from 'primeng/textarea';
import { ButtonModule } from 'primeng/button';
import { StoreService } from '../../services/store-service';
import { Departments } from '../../services/departments';
import { response } from 'express';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentInterface } from '../../interface/Departmet';

@Component({
  selector: 'department-hook',
  imports: [Divider,InputTextModule,FormsModule,SelectModule,ToastModule,TextareaModule,ButtonModule],
  templateUrl: './department-hook.html',
  styleUrl: './department-hook.scss',
   providers:[MessageService],
    changeDetection:ChangeDetectionStrategy.OnPush
})
export class DepartmentHook implements OnInit {
  messageservice=inject(MessageService)
departemtnId:any
departementName: any;
stores:Store[]=[]
departments:DepartmentInterface[]=[]
selectedstore:Store|undefined
departmentDescription: any;
message:any
deptLocation: any;
constructor(private storeservice:StoreService,private cdr:ChangeDetectorRef, private departmentservice:Departments,private router:Router,private routes:ActivatedRoute){
  this.createDepartemntID()
  this.listStores()
}
ngOnInit(): void {
  
}

createDepartemntID=()=>{
      let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.departemtnId = "ONDPT" + new Date().getDate() + "-" + randomInteger
}
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
  
createDepartment=()=>{
  let data={
    hoid:this.departemtnId,
    deptName:this.departementName,
    hoockedstore:this.selectedstore?.storenumber,
    location:this.deptLocation,
    deptDesc:this.departmentDescription
  }
  console.log(data)
  return this.departmentservice.submitNewDepartment(data).subscribe((response:any)=>{
         if(response?.message){
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
      }else{
        if(response?.success){
           this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'Info', detail: this.message, life: 5000 });
          this.cdr.detectChanges()
         this.router.navigate(['../'],{relativeTo:this.routes})
        }else{
           this.message = 'unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
        }
      }
    
  })
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
}
