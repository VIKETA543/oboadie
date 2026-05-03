import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { Tooltip } from "primeng/tooltip";

@Component({
  selector: 'pos-panager',
  imports: [ButtonModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    ToolbarModule,
    InputTextModule, Tooltip],
  templateUrl: './pos-panager.html',
  styleUrl: './pos-panager.scss',
})



export class PosPanager {

}
