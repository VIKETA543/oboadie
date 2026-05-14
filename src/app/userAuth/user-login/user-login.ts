import { ChangeDetectionStrategy, Component, inject, isSignal, signal } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { Userservice } from '../../services/userservice';
import { MessageService } from 'primeng/api';
import { single } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'user-login',
  imports: [InputTextModule,
    DividerModule,
    PasswordModule,
    ButtonModule,
    CheckboxModule,
    CardModule,
    MessageModule,
    FormsModule],
  templateUrl: './user-login.html',
  styleUrl: './user-login.scss',
  providers:[MessageService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UserLogin {
constructor(private userservice:Userservice,private router:Router, private route: ActivatedRoute){}
messageservice=inject(MessageService)
message:any
  loading: boolean = false;
email: any;
password: any;
isSuccess=signal(false)
isWaiting=signal(false)
isDenied=signal(false)
rememberMe=signal(false)
isMessage=signal(false)

  onLogin() {
    this.loading = true;
    
    let data={
      email:this.email,
      password:this.password
    }
    this.userservice.signIn(data).subscribe((response:any)=>{
      if(response?.message){
        this.message=response?.message
        this.isMessage.set(true)
      }else{
        if(response?.wait){
        this.message=response?.wait
        this.isWaiting.set(true)
        }else{
          if(response?.denied){
            console.log(response?.denied)
                 this.message=response?.denied
                 this.isDenied.set(true)
          }else{
            if(response?.success){
              this.message=response?.success
              this.isSuccess.set(true)
                console.log(response?.hook)
                 this.router.navigate(['../redirect-user',response?.hook],{relativeTo:this.route})
            }else{
              this.message='Unknown error has occured'
            }
          }
        }
      }
    })

    
    setTimeout(() => {
      this.loading = false;
      // Navigate to dashboard or show error
    }, 2000);
  }
  byPass=()=>{
    this.router.navigate(['admhome'])
  }
}
