import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { Userservice } from '../../services/userservice';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
@Component({
  selector: 'resetpassword',
  imports: [InputTextModule, FormsModule, CommonModule, ReactiveFormsModule, PanelModule, ButtonModule, DividerModule, MessageModule],
  templateUrl: './resetpassword.html',
  styleUrl: './resetpassword.scss',
  providers: [MessageService]
})
export class Resetpassword implements OnInit {
  emailAddress: any
  message: any
  user: any[] = []
  constructor(private userservice: Userservice, private messageService: MessageService, private router: Router, private route: ActivatedRoute) {

  } ngOnInit(): void {

  }
  onContinue = () => {
    let data = {
      emailAddress: this.emailAddress

    }
    this.userservice.resetPassword(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageService.add({ severity: 'success', summary: 'Success', detail: this.message });
      } else {
        if (response?.data) {
          this.user = response?.data
          console.log(this.user[0]?.uac_id)
          localStorage.setItem('uac_id', JSON.stringify(this.user[0]?.uac_id))
          this.router.navigate(['../auth'], { relativeTo: this.route })
        } else {
          this.message = 'An error occurred. Please try again later.'
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.message });
        }
      }
    })
  }
}
