import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import {  MenuModule} from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { DividerModule, Divider } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Popover, PopoverModule } from 'primeng/popover';
import { Tooltip } from "primeng/tooltip";
import { Wearehouse } from '../services/wearehouse';
import { ToastModule } from 'primeng/toast';
import { DrawerModule } from 'primeng/drawer';
import { Table, TableModule } from 'primeng/table';
import { Identity } from '../interface/warehouseinterface';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { response } from 'express';


@Component({
  selector: 'wearhousemanager',
  standalone:true,
  imports: [
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    ToolbarModule,
    InputTextModule,
    MenuModule,
    DialogModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PopoverModule,
    Divider,
    Tooltip,
    ToastModule,
    DrawerModule,
    TableModule,
    ToggleSwitchModule
],

  templateUrl: './wearhousemanager.html',
  styleUrl: './wearhousemanager.scss',
  providers:[MessageService],
  changeDetection:ChangeDetectionStrategy.Default
})
export class Wearhousemanager implements OnInit {
auth($event: ToggleSwitchChangeEvent,_t131: any) {
let data={
  auth:$event.checked,
  id:_t131.identityid
}
this.warehouseservice.auth(data).subscribe((response:any)=>{
  if(response?.success){
    this.message=response?.success
           this.messageservice.add({ severity: 'info', summary: 'Success', detail: this.message });
           this.listItentities();
  }else{
    this.message=response?.message
  }
})
}


  isIdentity=signal(false)
  isDrawerVisible=signal(false)
  loading=signal(false)
  identityList:Identity[]=[];
  isVisible:boolean=false
  identitydescription:any;
  identityName:any
  identity:any
  message:any;
  rowcounter:number=0

    searchValue = signal('');
    activityValues = signal<number[]>([0, 100]);


  @ViewChild('op') op!: Popover;
  constructor(private warehouseservice:Wearehouse,private messageservice:MessageService,private cdr:ChangeDetectorRef) { }
  ngOnInit(): void {


  }
    toggle(event:any) {
        this.op.toggle(event);
    }
setDrawerVisible=()=>{


this.isDrawerVisible.set(true)
  this.listItentities()
    this.loading.set(true)
}
   clear(table: Table) {
        table.clear();
        this.searchValue.set('');
    }
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  genranCode = () => {
    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.identity = "WHSE-" + randomInteger
  }

newIdentity=()=>{
  this.genranCode()
this.isIdentity.set(true)
this.isVisible=true
}
saveIdentity=()=>{
  let data={
    identity:this.identity,
    name:this.identityName,
    describe:this.identitydescription,
    date:new Date()
  }

  this.warehouseservice.saveIsentuty(data).subscribe((response:any)=>{
    if(response?.success){
      this.message=response?.success
  
      this.listItentities()
      this.destroy()
       this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message });
    }else{
      if(response?.message){
        this.message=response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message });
      }
    }
  })
}
 listItentities=async ()=>{
 await this.warehouseservice.listIdenties().subscribe((response:any)=>{
if(response?.message){
   this.message=response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message });
}else{
  if(response?.data){
    this.identityList=response?.data

    this.cdr.markForCheck()
    this.loading.set(false)
  }else{
       this.message=response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message });
  }
}
})
}
destroy=()=>{
  this.identity=undefined
  this.identityName=undefined
  this.identitydescription=undefined
}
}
