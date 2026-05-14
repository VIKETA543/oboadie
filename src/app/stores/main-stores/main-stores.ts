import { Component, OnInit, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'main-stores',
  imports: [DrawerModule, ButtonModule,
     RouterOutlet,ButtonModule, 
     IconFieldModule, InputIconModule, 
     SplitButtonModule, ToolbarModule, 
     InputTextModule],
  templateUrl: './main-stores.html',
  styleUrl: './main-stores.scss',
})
export class MainStores implements OnInit{
StockBalances() {
throw new Error('Method not implemented.');
}
verifiedHistory() {
throw new Error('Method not implemented.');
}
verifiedRecords() {
throw new Error('Method not implemented.');
}

  rightaside=signal(false)
constructor(private router:Router,private routes:ActivatedRoute,private deviceService: DeviceDetectorService){

    const deviceInfo = this.deviceService.deviceInfo();
  const isMobile = this.deviceService.isMobile();
  const isTablet = this.deviceService.isTablet();
  const isDesktop = this.deviceService.isDesktop();

  console.log(deviceInfo); // { browser: "Chrome", os: "Windows", ...
}
ngOnInit(): void {
  
}
recieveStock=()=>{
  
this.router.navigate(['store-receive-stock'],{relativeTo:this.routes})

}
VerifySales() {
this.router.navigate(['verify-sales'],{relativeTo:this.routes})
}

receivedstock() {
this.router.navigate(['stockreceived'],{relativeTo:this.routes})
}
newProduct=()=>{
this.router.navigate(['create-products'],{relativeTo:this.routes})
}
productCategories=()=>{
  this.router.navigate(['product-category'],{relativeTo:this.routes})
}
goToBrands=()=>{
  this.router.navigate(['productbrand'],{relativeTo:this.routes})
}
}
