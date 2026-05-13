import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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


@Component({
  selector: 'auth',
  imports: [MessageModule,PanelModule,PasswordModule, ButtonModule,FormsModule,DividerModule,ToggleSwitchModule,AvatarModule,AvatarGroupModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
  providers:[MessageService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Auth implements OnInit {
Password: any;
conform_password: any;
acceptTerms:boolean=false
error_message:any
constructor(private router: Router,private route:ActivatedRoute, private userservice:Userservice, private cdr: ChangeDetectorRef,) {

}

uac: string | null = null;
message:any
user:any[]=[]
ngOnInit(): void {
    this.getUserc()
}
getUserc=()=>{

  this.uac = this.route.snapshot.paramMap.get('uac');
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
            this.message=response?.message
            this.router.navigate(['../user-login'],{relativeTo:this.route})
          }else{
               this.error_message='Unlnown error has occured'
          }
        }
      })
    }
  }
}
}
