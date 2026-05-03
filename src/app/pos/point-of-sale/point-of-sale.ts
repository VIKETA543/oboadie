import { ChangeDetectorRef, Component, inject, OnInit, signal } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { Tooltip } from 'primeng/tooltip';
import { PosServcie } from '../../services/pos-servcie';
import { MessageService } from 'primeng/api';
import { Table, TableModule } from 'primeng/table';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { Divider } from "primeng/divider";
import { DatePipe } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { InputNumberModule } from 'primeng/inputnumber';
import { FluidModule } from 'primeng/fluid';
import { CurrencyPipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { NgxBarcode6 } from 'ngx-barcode6';
import { NgxPrintDirective } from 'ngx-print';
import { RouterOutlet, RouterLinkWithHref, Router, ActivatedRoute } from "@angular/router";


@Component({
  
  selector: 'point-of-sale',
  imports: [ToolbarModule,
    ToastModule, ButtonModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    InputTextModule, Tooltip,
    TableModule,
    ToggleSwitchModule,
    FormsModule, 
    DialogModule,
    TextareaModule,
    CheckboxModule
    , SelectModule,
    InputNumberModule, FluidModule,
 RouterOutlet, RouterLinkWithHref],
  templateUrl: './point-of-sale.html',
  styleUrl: './point-of-sale.scss',
  providers: [MessageService]
})
export class PointOfSale implements OnInit {
    constructor(private posservice: PosServcie, private cdr:ChangeDetectorRef, private router:Router, private routes:ActivatedRoute) { }
  ngOnInit(): void {

  }


  cashSales() {
    this.router.navigate(['cash-sales'],{relativeTo:this.routes})  

  }

   creditSales() {
    this.router.navigate(['credit-sales'],{relativeTo:this.routes})  

  }
}
