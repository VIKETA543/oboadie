import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule, SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { routes } from '../../app.routes';

@Component({
  selector: 'cash-payments',
  imports: [CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToolbarModule,
    ButtonModule,
    SelectButtonModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    ToolbarModule,
    InputTextModule, RouterOutlet],
  templateUrl: './cash-payments.html',
  styleUrl: './cash-payments.scss',
})
export class CashPayments {
  constructor(private router:Router,private route:ActivatedRoute){}
  selectionButton($event: SelectButtonOptionClickEvent) {
    const selectedOption = $event.option.label
    switch (selectedOption) {
      case "SCANNER":
      this.router.navigate(['scanner-payment'],{relativeTo:this.route})
        break;

      case "PHONE":
        this.router.navigate(['mobile-scanner'],{relativeTo:this.route})
      break;
      case "MANUAL":
        this.router.navigate(['manual-verification'],{relativeTo:this.route})
        break
    }
  }
  selectionOption: any

  stateOptions: any[] = [{ label: 'SCANNER', value: 'USE SCANNER' }, { label: 'PHONE', value: 'MOBILE PHONE' }, { label: 'MANUAL', value: 'MANUAL VERIFICATION' }];;
  value: string = 'one-way';



}
