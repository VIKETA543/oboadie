import { Component } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Popover, PopoverModule } from 'primeng/popover';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem,PrimeIcons } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';


@Component({
  selector: 'admhome',
  imports: [RouterOutlet,
    InputTextModule,
    ButtonModule,
    RouterLinkWithHref,
    Toolbar,
    SplitButtonModule,
    PopoverModule,
    DrawerModule
  ],
  templateUrl: './admhome.html',
  styleUrl: './admhome.scss',
})
export class Admhome {
toggle($event: MouseEvent) {
throw new Error('Method not implemented.');
}
dropMenu:boolean=false;
items: MenuItem[]|undefined;

}
