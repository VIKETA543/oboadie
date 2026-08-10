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
  standalone: true,
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
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLogin {
  visible = signal(false)
  signup() {
    this.visible.set(true)
    this.router.navigate(['../sign-up'], { relativeTo: this.route })
  }
  forgotPassowrd = () => {
    this.router.navigate(['../resetpassword'], { relativeTo: this.route })


    // this.router.navigate(['../auth'],{relativeTo:this.route})
  }
  constructor(private userservice: Userservice, private router: Router, private route: ActivatedRoute) { }
  messageservice = inject(MessageService)
  message: any
  loading: boolean = false;
  email: any;
  password: any;
  isSuccess = signal(false)
  isWaiting = signal(false)
  isDenied = signal(false)
  rememberMe = signal(false)
  isMessage = signal(false)

  onLogin() {
    this.loading = true;

    let data = {
      email: this.email,
      password: this.password
    }
    this.userservice.signIn(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.isMessage.set(true)
        this.loading=false
      } else {
        if (response?.wait) {
          this.message = response?.wait
          this.isWaiting.set(true)
          this.loading = false
        } else {
          if (response?.denied) {
            this.message = response?.denied
            this.isDenied.set(true)
            this.loading = false
          } else {
            if (response?.success) {
              this.message = response?.success
              this.isSuccess.set(true)
              const usercredential = { UACP: response?.hook, uac_id: response?.uac_id }
              localStorage.setItem('user', JSON.stringify(usercredential))
              console.log('The user credentials-->', response?.user)
              localStorage.setItem('USER_CREDENTIALS', JSON.stringify(response?.user))
              if (response?.autoLogin === true) {
         
                const redirector=response?.redirector
                        console.log('Redirector',redirector)
                redirector.trim()
                switch (redirector.trim()) {
                  case 'CASH AND PAYMENT':
                    this.router.navigate(['cash-manager']);
                    break;
                  case 'POINT OF SALES':
                    this.router.navigate(['point-of-sale']);
                    break;
                  case 'MAIN STORE':
                    this.router.navigate(['main-stores']);
                    break;
                  case 'WAREHOUSE MANAGER':
                    this.router.navigate(['wearhousemanager']);
                    break;
                  default: this.router.navigate(['../redirect-user'], { relativeTo: this.route })
                    break;
                }

              } else {
                this.router.navigate(['../redirect-user'], { relativeTo: this.route })
              }

            } else {
              if (response?.NO_PASSWORD) {
                this.message = response?.NO_PASSWORD
                this.loading = false
              } else {
                this.loading = false
                this.message = 'Unknown error has occured'
              }

            }
          }
        }
      }
    })


    // setTimeout(() => {
    //   this.loading = false;
    //   // Navigate to dashboard or show error
    // }, 2000);
  }
  byPass = () => {
    this.router.navigate(['admhome'])
  }
}
