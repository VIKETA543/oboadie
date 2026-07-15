import { Component, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Userservice } from '../../services/userservice';
import { isPlatformBrowser } from '@angular/common';
import { Users } from '../../interface/Users';
import { AvatarModule } from 'primeng/avatar';
import { PopoverModule } from 'primeng/popover';
import { DividerModule } from 'primeng/divider';
@Component({
  selector: 'main-stores',
  imports: [DrawerModule,
    ButtonModule,
    RouterOutlet,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    ToolbarModule,
    InputTextModule,
    AvatarModule,
    PopoverModule,
  DividerModule],
  templateUrl: './main-stores.html',
  styleUrl: './main-stores.scss',
})
export class MainStores implements OnInit {

 
  verifiedHistory() {
    throw new Error('Method not implemented.');
  }
  verifiedRecords() {
    throw new Error('Method not implemented.');
  }

  rightaside = signal(false)
  credentials: any
  message: any
  userInfo: Users[] | any
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
    private userservice: Userservice,
    private router: Router,
    private routes: ActivatedRoute,
    private deviceService: DeviceDetectorService) {
    if (isPlatformBrowser(this.platformId)) {

      try {
        this.credentials = JSON.parse(localStorage.getItem('user') || '{}');
        // console.log('The crredentials:',this.credentials)
      } catch (e) {
        this.message = "Could not parse JSON from storage: " + e
      }

      if (this.credentials?.uac_id !== undefined) {
        let data = {
          uacp: this.credentials?.uac_id
        }
        this.userservice.getUser(data).subscribe((response: any) => {
          if (response?.message) {
            this.message = response?.message
          } else {
            if (response?.data) {
              this.userInfo = response?.data
              // console.log(this.userInfo)
              localStorage.setItem('USER_INFO',JSON.stringify(this.userInfo))
            } else {
              this.message = 'Unknown error has occured'
            }
          }
        })
      } else {

      }
    }
  }

  ngOnInit(): void { }
  recieveStock = () => {

    this.router.navigate(['store-receive-stock'], { relativeTo: this.routes })

  }
  VerifySales() {
    this.router.navigate(['verify-sales'], { relativeTo: this.routes })
  }

  receivedstock() {
    this.router.navigate(['stockreceived'], { relativeTo: this.routes })
  }
  newProduct = () => {
    this.router.navigate(['create-products'], { relativeTo: this.routes })
  }
  productCategories = () => {
    this.router.navigate(['product-category'], { relativeTo: this.routes })
  }
  goToBrands = () => {
    this.router.navigate(['productbrand'], { relativeTo: this.routes })
  }
 goToStoctrequest = () => {
    this.router.navigate(['stock-request'], { relativeTo: this.routes })
  }
   StockBalances() {
  this.router.navigate(['store-stock-balances'], { relativeTo: this.routes })
  }

    wahousePull() {
  this.router.navigate(['warehouse-pull'], { relativeTo: this.routes })
  }
}
