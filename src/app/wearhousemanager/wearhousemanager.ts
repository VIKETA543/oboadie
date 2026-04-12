import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
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
import { Identity, Warehouseinterface } from '../interface/warehouseinterface';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { response } from 'express';
import { PanelModule } from 'primeng/panel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';

@Component({
  selector: 'wearhousemanager',
  standalone: true,
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
    ToggleSwitchModule,
    PanelModule,
    SelectModule
  ],

  templateUrl: './wearhousemanager.html',
  styleUrl: './wearhousemanager.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.Default
})
export class Wearhousemanager implements OnInit {
  saveWearHouse() {
    let data = {
      warehouseSerial: this.warehouseSerial,
      identity: this.identity,
      warehouseTitle: this.warehouseTitle,
      warehouseLocation: this.warehouseLocation,
      warehousedigialAddress: this.warehousedigialAddress,
      warehouseDescription: this.warehouseDescription,
      selectedIdentity: this.selectedIdentity,
      date:new Date()
    }
    this.warehouseservice.saveWearHouse(data).subscribe((response:any)=>{
        if (response?.success) {
        this.message = response?.success

        this.listWarehouses()
        this.destroyParameters()
            this.isNewwarehouse.set(false)
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 });
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })
  }
destroyParameters=()=>{
  this.identity=undefined
    this.warehouseSerial=undefined
  this.warehouseTitle=undefined;
  this.warehouseLocation=undefined;
  this.warehousedigialAddress=undefined;
  this.warehouseDescription=undefined;
  this.selectedIdentity=undefined;
}
  isVisiblewarehouse() {
    this.isNewwarehouse.set(false)
  }
  selectIdentity($event: SelectChangeEvent) {
    console.log($event)
    this.identity = $event.value.identityid
  }
  isNewwarehouse = signal(false)
  warehouseSerial: any
  warehouseTitle: any;

  warehouseLocation: any;
  warehousedigialAddress: any;
  warehouseDescription: any;
  selectedIdentity: any;
  newWarehouse() {
    let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.warehouseSerial = "WHSE-LD" + new Date().getDate() + "-" + randomInteger
    console.log(this.warehouseSerial)
    this.listItentities()
    this.isNewwarehouse.set(true)
  }
  listWarehouses = () => {
    return this.warehouseservice.listWarehouses().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.data) {
          this.warehousesData = response?.data
          console.log(this.warehousesData)
          this.cdr.markForCheck()
          this.loading.set(false)
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }

    })
  }
  isVisibleIdentity() {
    this.isEditIdentity.set(false)
  }
  updateIdentity() {

    let data = {
      identity: this.identity,
      name: this.identityName,
      describe: this.identitydescription,
      date: new Date()
    }

    this.warehouseservice.updateIdentity(data).subscribe((response: any) => {
      if (response?.success) {
        this.message = response?.success

        this.listItentities()
        this.isEditIdentity.set(false)
        this.destroy()
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 });
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })





    this.isEditIdentity.set(false);
  }
  editIdentity(id: any) {
    this.isEditIdentity.set(true)

    this.identity = id.identityid
    this.identityName = id.name
    this.identitydescription = id.decription
    console.log(this.isEditIdentity())
  }
  delIdentity(id: any) {
    let data = {
      identityid: id.identityid
    }
    console.log(data)
    this.warehouseservice.delIdentity(data).subscribe((response: any) => {





      if (response?.success) {
        this.message = response?.success
        this.messageservice.add({ severity: 'info', summary: 'Success', detail: this.message, life: 3000 });
        this.listItentities();
      } else {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      }
    })
  }
  auth($event: ToggleSwitchChangeEvent, _t131: any) {
    let data = {
      auth: $event.checked,
      id: _t131.identityid
    }
    this.warehouseservice.auth(data).subscribe((response: any) => {
      if (response?.success) {
        this.message = response?.success
        this.messageservice.add({ severity: 'info', summary: 'Success', detail: this.message, life: 3000 });
        this.listItentities();
      } else {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      }
    })
  }


  isIdentity = signal(false)
  isEditIdentity = signal(false)
  isDrawerVisible = signal(false)
  loading = signal(false)
  identityList: Identity[] = [];
  isVisible: boolean = false
  identitydescription: any;
  identityName: any
  identity: any
  identityID: any
  message: any;
  rowcounter: number = 0

  searchValue = signal('');
  activityValues = signal<number[]>([0, 100]);

  warehousesData: Warehouseinterface[] = []
  @ViewChild('op') op!: Popover;
  constructor(private warehouseservice: Wearehouse, private messageservice: MessageService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.listWarehouses();

  }
  toggle(event: any) {
    this.op.toggle(event);
  }
  setDrawerVisible = () => {


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
    this.identity = "WHSEID-" + randomInteger
  }

  newIdentity = () => {
    this.genranCode()
    this.isIdentity.set(true)
    this.isVisible = true
  }
  saveIdentity = () => {
    let data = {
      identity: this.identity,
      name: this.identityName,
      describe: this.identitydescription,
      date: new Date()
    }

    this.warehouseservice.saveIsentuty(data).subscribe((response: any) => {
      if (response?.success) {
        this.message = response?.success

        this.listItentities()
        this.destroy()
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 });
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })
  }
  listItentities = async () => {
    await this.warehouseservice.listIdenties().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.data) {
          this.identityList = response?.data
          console.log(this.identityList)
          this.cdr.markForCheck()
          this.loading.set(false)
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })
  }
  destroy = () => {
    this.identity = undefined
    this.identityName = undefined
    this.identitydescription = undefined
  }
}
