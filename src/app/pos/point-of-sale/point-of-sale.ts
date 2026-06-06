import { ChangeDetectorRef, Component, Inject, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
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
import { CommonModule, DatePipe, isPlatformBrowser } from '@angular/common';
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
import { Users } from '../../interface/Users';
import { AvatarModule } from 'primeng/avatar';


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
    CheckboxModule,
    SelectModule,
    InputNumberModule, FluidModule,
    RouterOutlet, RouterLinkWithHref, AvatarModule, NgxBarcode6, NgxPrintDirective, CurrencyPipe, CommonModule, DatePipe, Divider],
  templateUrl: './point-of-sale.html',
  styleUrl: './point-of-sale.scss',
  providers: [MessageService]
})
export class PointOfSale implements OnInit {
  private messageService = inject(MessageService)
  message:any
   userInfo: Users[] | any
   USER_CREDENTIALS:Users[]|any
   storeData:any
    constructor(@Inject(PLATFORM_ID) private platformId: Object,private posservice: PosServcie, private cdr:ChangeDetectorRef, private router:Router, private routes:ActivatedRoute) { 

        if (isPlatformBrowser(this.platformId)) {
                  try {
              this.userInfo = JSON.parse(localStorage.getItem('user') || '{}');
              this.USER_CREDENTIALS=JSON.parse(localStorage.getItem('USER_CREDENTIALS') || '{}');
              this.storeData = JSON.parse(localStorage.getItem('storeData') || '{}');
               console.log('User',this.storeData)
            } catch (e) {
              this.message = "Could not parse JSON from storage: " + e
            }
          }
    }
  ngOnInit(): void {

  }

return() {
    this.router.navigate(['pos-home'], { relativeTo: this.routes })

  }

  
  cashSales() {
    this.router.navigate(['cash-sales'],{relativeTo:this.routes})  

  }

   creditSales() {
    this.router.navigate(['credit-sales'],{relativeTo:this.routes})  

  }
}
