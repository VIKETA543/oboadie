import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet, RouterLinkWithHref, Router, ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Toolbar } from 'primeng/toolbar';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Popover, PopoverModule } from 'primeng/popover';
import { SplitButtonModule } from 'primeng/splitbutton';
import { MenuItem, PrimeIcons } from 'primeng/api';
import { DrawerModule } from 'primeng/drawer';
import { DividerModule } from 'primeng/divider';
import { AvatarModule } from 'primeng/avatar';
import { isPlatformBrowser } from '@angular/common';
import { Userservice } from '../../services/userservice';
import { Users } from '../../interface/Users';


@Component({
  selector: 'admhome',
  imports: [RouterOutlet,
    InputTextModule,
    ButtonModule,
    RouterLinkWithHref,
    Toolbar,
    SplitButtonModule,
    PopoverModule,
    DrawerModule,
    PopoverModule,
    DividerModule, AvatarModule

  ],
  templateUrl: './admhome.html',
  styleUrl: './admhome.scss',
})
export class Admhome implements OnInit {
  credentials: any
  message: any
  userInfo: Users[] | any
  constructor(private userservice: Userservice, @Inject(PLATFORM_ID) private platformId: Object, private router: Router, private routes: ActivatedRoute) {


    if (isPlatformBrowser(this.platformId)) {

      try {
        this.credentials = JSON.parse(localStorage.getItem('user') || '{}');
        console.log('The crredentials:', this.credentials)
        this.userInfo = JSON.parse(localStorage.getItem('USER_INFO') || '{}');
        console.log('The user info:', this.userInfo)
      } catch (e) {
        this.message = "Could not parse JSON from storage: " + e
      }

      if (this.credentials?.uac_id !== undefined) {
        let data = {
          uacp: this.credentials?.uac_id
        }

      } else {

      }
    }
  }
  ngOnInit(): void {

  }

  openStores() {

    this.router.navigate(['main-stores'], { relativeTo: this.routes })
  }
  pointofsale = () => {
    this.router.navigate(['point-of-sale'], { relativeTo: this.routes })
  }
  toggle($event: MouseEvent) {
    // this.op.toggle(event);
  }
  dropMenu: boolean = false;
  items: MenuItem[] | undefined;

  opeSecurityManager() {
    this.router.navigate(['security-manager'], { relativeTo: this.routes })
  }
}
