import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Userservice } from '../../services/userservice';
import { MessageModule } from 'primeng/message';
import { PanelModule } from 'primeng/panel';
import { FormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { DividerModule } from 'primeng/divider';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'auth',
  imports: [MessageModule,PanelModule,PasswordModule, ButtonModule,FormsModule,DividerModule,ToggleSwitchModule,AvatarModule,AvatarGroupModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  providers:[MessageService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Auth implements OnInit {
  messageservice=inject(MessageService)
Password: any;
conform_password: any;
acceptTerms:boolean=false
error_message:any

constructor(@Inject(PLATFORM_ID) private platformId: Object,private router: Router,private route:ActivatedRoute, private userservice:Userservice, private cdr: ChangeDetectorRef,) {
 if (isPlatformBrowser(this.platformId)) {
       this.uac=JSON.parse(localStorage.getItem('uac_id') || '{}');
       console.log('the uac from local storage', this.uac)
    }


}

uac: string | null = null;
message:any
user:any[]=[]
ngOnInit(): void {
    this.getUserc()
}
getUserc=()=>{
let  data={
  uac:this.uac
}
setTimeout(()=>{
console.log(this.uac)
 this.userservice.setPassword(data).subscribe((response:any)=>{
  if(response?.message){
    this.message=response?.message
  }else{

    if(response?.data){

      this.user=response?.data
      this.cdr.detectChanges()
    }else{
      this.message='Unknown error'
    }
  }
 })

},5000)
  console.log(this.uac)
 this.userservice.setPassword(data).subscribe((response:any)=>{
  if(response?.message){
    this.message=response?.message
  }else{

    if(response?.data){

      this.user=response?.data
      this.cdr.detectChanges()
    }else{
      this.message='Unknown error'
    }
  }
 })
}
createPassword=()=>{
  if(this.Password!==this.conform_password){
    this.error_message=this.Password+ ' '+this.conform_password
  }else{
    if(this.acceptTerms===false){
        this.error_message='Accept the terms before you continue'
    }else{

      let data={
        password:this.Password,
        uac:this.uac,
        auth:this.acceptTerms,
        date:new Date()
      }
       this.userservice.submitpassword(data).subscribe((response:any)=>{
        if(response?.message){
          this.error_message=response?.message
        }else{
          if(response?.success){
            this.message=response?.success
            console.log(response?.success)
            this.router.navigate(['../user-login'],{relativeTo:this.route})
            this.cdr.markForCheck()
            this.cdr.detectChanges()
          }else{
               this.error_message='Unlnown error has occured'
          }
        }
      })
    }
  }
}
login=()=>{
         this.router.navigate(['../user-login'],{relativeTo:this.route})
}
}
