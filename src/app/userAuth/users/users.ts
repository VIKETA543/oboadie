import { Component, inject, signal } from '@angular/core';
import { response } from 'express';
import { Userservice } from '../../services/userservice';
import { MenuItem, MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'users',
  imports: [TableModule,
    AvatarModule,
    ButtonModule,
    ToggleSwitchModule,
    SplitButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    InputIconModule,
    IconFieldModule,
    InputTextModule,
    ToastModule
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  providers: [MessageService],
})
export class Users {

  onActions = () => {

    this.items = [

      {
        label: 'Delete user',
        icon: 'pi pi-trash',
        severity: "danger",
        command: () => {
           this.onDeleteUser(this.targetUser);
        }
      },
  {
        label: 'Update user',
        icon: 'pi pi-trash',
        severity: "success",
        command: () => {
          // this.deleteTag();
        }
      },

        {
        label: 'View Details',
        icon: 'pi pi-trash',
        severity: "info",
        command: () => {
          // this.deleteTag();
        }
      },
    ];
  }

onDeleteUser=(user:any)=>{
  let data={
      user:user?.uac_id,
  }
this.userservice.onDeleteUser(data).subscribe((response:any)=>{

        if(response?.success){
          this.message=response?.success
           this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message });
           this.listusers()
        }else{
          if(response?.message){
            this.message=response?.meessage
  this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message });
          }
        }
      })

}

onApproval(_t39: any,$event: ToggleSwitchChangeEvent) {

      let data={
        user:_t39?.uac_id,
        approved:$event.checked
      }
      this.userservice.onApproval(data).subscribe((response:any)=>{
        if(response?.success){
          this.message=response?.success
           this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message });
           this.listusers()
        }else{
          if(response?.message){
            this.message=response?.meessage
  this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message });
          }
        }
      })
}
onAccess(_t39: any,$event: ToggleSwitchChangeEvent) {

      let data={
        user:_t39?.uac_id,
        access:$event.checked
      }
      this.userservice.onAccess(data).subscribe((response:any)=>{
        if(response?.success){
          this.message=response?.success
           this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message });
           this.listusers()
        }else{
          if(response?.message){
            this.message=response?.meessage
  this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message });
          }
        }
      })
}
  setUser(_t15: any) {
    this.targetUser=_t15
  }

  items: MenuItem[] | undefined;

  onAutoLogin(arg0: any, $event: ToggleSwitchChangeEvent) {

      let data={
        user:arg0?.uac_id,
        auto_login:$event.checked
      }
      this.userservice.setUserAutoLogin(data).subscribe((response:any)=>{
        if(response?.success){
          this.message=response?.success
           this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message });
           this.listusers()
        }else{
          if(response?.message){
            this.message=response?.meessage
  this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message });
          }
        }
      })

  }
  messageservice = inject(MessageService)
  message: any
  USERS: any = []
  targetUser:any
  searchValue = signal('');
  activityValues = signal<number[]>([0, 100]);
  constructor(private userservice: Userservice) {
    this.listusers()
    this.onActions()
  }

  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }

  listusers = () => {
    this.userservice.listusers().subscribe((response: any) => {
      console.log(response)
      if (response?.data) {
        this.USERS = response?.data
      } else {
        if (response?.message) {
          this.message = response?.message
        }
      }
    })
  }
}
