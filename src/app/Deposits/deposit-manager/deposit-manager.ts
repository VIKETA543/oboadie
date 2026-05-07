import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'deposit-manager',
  imports: [ToolbarModule, ButtonModule, IconFieldModule, InputIconModule, SplitButtonModule, ToolbarModule, InputTextModule, RouterLink, RouterOutlet],
  templateUrl: './deposit-manager.html',
  styleUrl: './deposit-manager.scss',
})
export class DepositManager {

}
