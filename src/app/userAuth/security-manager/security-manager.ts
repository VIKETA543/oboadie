import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { Tooltip } from "primeng/tooltip";
import { InputTextModule } from 'primeng/inputtext';



import { ActivatedRoute, Router, RouterLinkWithHref, RouterOutlet } from "@angular/router";
import { MessageService } from 'primeng/api';
@Component({
  selector: 'security-manager',
  imports: [ToolbarModule, IconFieldModule,InputTextModule, InputIconModule, ButtonModule, Tooltip, RouterOutlet, RouterLinkWithHref],
  templateUrl: './security-manager.html',
  styleUrl: './security-manager.scss',
  providers:[MessageService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SecurityManager {
  messageservice=inject(MessageService)
constructor(private router:Router,private routes:ActivatedRoute){}
  gotoUACP=()=>{
 return this.router.navigate(['uacgenerator'],{relativeTo:this.routes})
  }
  gotoDepartemnt=()=>{
   return this.router.navigate(['department-hook'],{relativeTo:this.routes})
  }
}
