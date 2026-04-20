import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { DialogModule } from 'primeng/dialog';
import { DividerModule, Divider } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Popover, PopoverModule } from 'primeng/popover';
import { ToolbarModule } from 'primeng/toolbar';
@Component({
  selector: 'store-manager',
  imports: [ButtonModule,DialogModule,
    IconFieldModule,Divider,
    PopoverModule,ToolbarModule,FormsModule,ReactiveFormsModule],
  templateUrl: './store-manager.html',
  styleUrl: './store-manager.scss',
})
export class StoreManager {

}
