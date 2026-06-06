import { ChangeDetectionStrategy, Component, inject, Inject, OnInit, PLATFORM_ID } from '@angular/core';
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
import { isPlatformBrowser } from '@angular/common';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'redirect-user',
  imports: [PanelModule, InputTextModule, FormsModule, ButtonModule, DividerModule, MessageModule, PasswordModule],
  templateUrl: './redirect-user.html',
  styleUrl: './redirect-user.scss',
  providers: [MessageService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RedirectUser implements OnInit {
  messageservice = inject(MessageService)
  RedirectKey: any
  decrptedKey: any
  uacp: any
  user: any
  decriptedKey: any
  message: any
  success: any
  private Key: string = 'Mvk2@@#3011~43011'
  constructor(private userservice: Userservice,
    private router: Router,
    private routes: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object) {

    if (isPlatformBrowser(this.platformId)) {
      this.user = JSON.parse(localStorage.getItem('user') || '{}');
    }
    this.uacp = this.user?.UACP
    console.log('the UACP', this.user?.UACP)
  }
  ngOnInit(): void {

  }

  decrypt(encryptedData: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedData, this.Key);

    return this.decriptedKey = bytes.toString(CryptoJS.enc.Utf8);
  }

  authUser = () => {

    this.decrypt(this.uacp)
    console.log('The decryoted Key=>', this.decriptedKey)
    //       console.log('the Raw key:' +this.RedirectKey)
    if (this.decriptedKey === this.RedirectKey) {

      let data = {
        hrid: this.uacp
      }

      this.userservice.authrole(data).subscribe((response: any) => {
        console.log(response)
        if (response?.message) {
          this.message = response?.message
        } else {
          if (response.success) {
             console.log(response?.data)
            // console.log(response?.success)
            const storeData = response?.storeData
              localStorage.setItem('storeData', JSON.stringify(storeData));
            const redirector = response?.data[0]?.login_redirect
            console.log(redirector)
            switch (redirector.trim()) {
              case "MAIN STORE":
                this.success = response?.success
                this.router.navigate(['main-stores']);
                break;
              case 'CASH AND PAYMENT':
                this.router.navigate(['cash-manager']);
                break;
              case 'POINT OF SALES':
                this.router.navigate(['point-of-sale']);
                break;
              case 'WAREHOUSE MANAGER':
                this.router.navigate(['wearhousemanager']);
                break;

              default:
                console.log('Unknown module')
                this.message = response?.message
                break
            }
          } else {
            this.message = response?.message
          }
        }
      })
    } else {
      this.message = ' invalid UACP key. Use a valid UCP assigned to you by admin'
      console.log(this.message)
    }
  }
}
