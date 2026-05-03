import { Component, OnInit, signal } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';

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

  rightaside=signal(false)
constructor(private router:Router,private routes:ActivatedRoute){
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
}
