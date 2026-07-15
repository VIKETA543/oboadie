import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Inject, PLATFORM_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from "@angular/router";
import { PosServcie } from '../../services/pos-servcie';
import { MessageService } from 'primeng/api';
import { Users } from '../../interface/Users';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'cash-manager',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    ToolbarModule,
    InputTextModule, RouterLink, RouterOutlet,AvatarModule,ToastModule],
  templateUrl: './cash-manager.html',
  styleUrl: './cash-manager.scss',
  providers:[MessageService]
})
export class CashManager {
    private messageService = inject(MessageService)
  message:any
   userInfo: Users[] | any
   USER_CREDENTIALS:Users[]|any
   storeData:any
constructor(@Inject(PLATFORM_ID) private platformId: Object,private posservice: PosServcie, private cdr:ChangeDetectorRef, private router:Router, private routes:ActivatedRoute){
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

}


