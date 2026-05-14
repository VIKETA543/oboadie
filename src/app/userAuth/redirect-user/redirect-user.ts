import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { PasswordModule } from 'primeng/password';
import { Userservice } from '../../services/userservice';
import * as CryptoJS from 'crypto-js';
import { environment } from '../../../environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'redirect-user',
  imports: [PanelModule,InputTextModule, FormsModule,ButtonModule,DividerModule,MessageModule,PasswordModule],
  templateUrl: './redirect-user.html',
  styleUrl: './redirect-user.scss',
})
export class RedirectUser implements OnInit {
RedirectKey:any
decrptedKey:any
uacp:any
decriptedKey:any
message:any
private Key=environment.uacp_enc_key
constructor(private userservice:Userservice, private router:Router,private routes:ActivatedRoute){

this.uacp = this.routes.snapshot.paramMap.get('uacp');
console.log('the UACP', this.uacp)
}
  ngOnInit(): void {

  }

  decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.Key);
console.log(bytes.toString(CryptoJS.enc.Utf8))
    return  this.decriptedKey= bytes.toString(CryptoJS.enc.Utf8);
  }


  authUser=()=>{
    this.decrypt(this.uacp)
     if(this.decriptedKey.match(this.RedirectKey)){
      console.log('Key Match complete')
      
     }else{
      this.message='Invalid Access key'
      console.log(this.message)
     }
     let data={
      hrid:this.uacp
     }
this.userservice.authrole(data).subscribe((response:any)=>{
  console.log(response)
  if(response?.message){
this.message=response?.message
  }else{
if(response.success){
  console.log(response?.data)
  console.log(response?.success)
  const redirector=response?.data[0]?.login_redirect
  console.log(redirector)
switch(redirector.trim()){
  case "MAIN STORE":
    this.router.navigate(['main-stores']);
  break;
  default :
  console.log('Unknown module')
}
}else{
  this.message=response?.message
}
  }
})
  }
}
