import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PopoverModule } from 'primeng/popover';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'profoma-invoice',
  imports: [ToolbarModule,
      ButtonModule,
      PopoverModule,RouterOutlet, RouterLinkWithHref],
  templateUrl: './profoma-invoice.html',
  styleUrl: './profoma-invoice.scss',
})
export class ProfomaInvoice  {
  constructor( private router: Router,private routes: ActivatedRoute,){

  }
returnHome() {
 this.router.navigate(['<div class=""></div>/'], { relativeTo: this.routes })

}
      toggle(event:any) {
      // this.op.toggle(event);
    }

}
