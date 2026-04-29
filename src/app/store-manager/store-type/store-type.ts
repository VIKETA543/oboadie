import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MenuModule } from 'primeng/menu';
import { PanelModule } from 'primeng/panel';
import { PopoverModule } from 'primeng/popover';
import { SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { Table, TableModule, TablePageEvent } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { Tooltip } from 'primeng/tooltip';
import { StoreService } from '../../services/store-service';
import { MessageService } from 'primeng/api';
import { response } from 'express';
import { Storeinterface } from '../../interface/storeinterface';

@Component({
  selector: 'store-type',
  imports: [ButtonModule,
    IconFieldModule, Divider,
    PopoverModule, ToolbarModule,
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
    SelectModule,
    DatePickerModule,
    InputNumberModule,
    TextareaModule,
    AvatarModule, RouterOutlet],
  templateUrl: './store-type.html',
  styleUrl: './store-type.scss',
})
export class StoreType implements OnInit {


  isstrIdentity = signal(false);
  storeTypeId: any;
  stridentityName: any;
  stridentitydescription: any;
  message: any
  storeTypeData: Storeinterface[] | undefined
  selectedType: Storeinterface | undefined
  first: number = 0;
  rows: number = 10;
  isLoadingbyCategories = signal(false)
  searchValue = signal('');
  activityValues = signal<number[]>([0, 100]);

  constructor(private storeservice: StoreService, private messageservice: MessageService) {

    // this.newstrIdentity()
    this.liststoretypes()
  }

  ngOnInit(): void {

  }


  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  newstrIdentity = () => {

    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.storeTypeId = "STR-IDNT-" + randomInteger
    this.isstrIdentity.set(true)
  }
  saveStoreIdentity() {
    let data = {
      storeIdentityID: this.isstrIdentity,
      storeIdentityName: this.stridentityName,
      storeidenetityDesc: this.stridentitydescription,
      dateposeted: new Date()
    }
    this.storeservice.saveStoreIdentity(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
      } else {
        if (response?.success) {
          this.message = response?.success
          this.liststoretypes()
          this.isstrIdentity.set(false)
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }
  liststoretypes = () => {
    this.storeservice.liststoretypes().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
      } else {
        if (response?.data) {
          this.storeTypeData = response?.data
          console.log(this.storeTypeData)
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }




  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange($event: TablePageEvent) {
    this.first = $event.first;
    this.rows = $event.rows;
  }


  isLastPage(): boolean {
    return this.storeTypeData ? this.first + this.rows >= this.isLoadingbyCategories.length : true;
  }

  isFirstPage(): boolean {
    return this.storeTypeData ? this.first === 0 : true;
  }

  clear1(table: Table) {
    table.clear();
    this.searchValue.set('');
  }
  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }


  authStoreType($event: ToggleSwitchChangeEvent, _t83: any) {
    let data = {
      isAuth: $event.checked,
      typeid: _t83.storeidentityid
    }
    this.storeservice.authStoreType(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
         this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.message = response?.success
          this.liststoretypes()
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }




  dropType(_t83: any) {
    let data = {
      typeid: _t83.storeidentityid
    }
    this.storeservice.droptType(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
         this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.message = response?.success
          this.liststoretypes()
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }
  
}
