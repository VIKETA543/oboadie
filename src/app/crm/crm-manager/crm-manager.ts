import { Component } from '@angular/core';

import { ToolbarModule } from 'primeng/toolbar';
import { PopoverModule } from 'primeng/popover';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
@Component({
  selector: 'crm-manager',
  imports: [ToolbarModule,
    ButtonModule,
    PopoverModule,RouterOutlet, RouterLinkWithHref],
  templateUrl: './crm-manager.html',
  styleUrl: './crm-manager.scss',
})
export class CrmManager {

}
