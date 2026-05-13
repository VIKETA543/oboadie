import { CommonModule } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule, SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { PosServcie } from '../../services/pos-servcie';
import { LayoutModule } from '@angular/cdk/layout';

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
    InputTextModule, RouterOutlet,
  LayoutModule],
  providers:[],
  templateUrl: './cash-payments.html',
  styleUrls: ['./cash-payments.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CashPayments implements OnInit {
  isMobile = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private posservice: PosServcie,
  ) { }

  selectionButton($event: SelectButtonOptionClickEvent) {
    const selectedOption = $event.option.label
    switch (selectedOption) {
      case "SCANNER":
        this.router.navigate(['scanner-payment'], { relativeTo: this.route });
        break;

      case "PHONE":
        this.router.navigate(['mobile-scanner'], { relativeTo: this.route });
        break;
      case "MANUAL":
        this.router.navigate(['manual-verification'], { relativeTo: this.route });
        break;
    }
  }

  selectionOption: string='USE SCANNER';

  stateOptions: any[] = [{ label: 'SCANNER', value: 'USE SCANNER',handsetOnly: false }, { label: 'PHONE', value: 'MOBILE PHONE',handsetOnly: true }, { label: 'MANUAL', value: 'MANUAL VERIFICATION',handsetOnly: false }];
  public filteredOptions: any[] = [];
  ngOnInit(): void {
    this.breakpointObserver.observe([
      Breakpoints.Handset,
      Breakpoints.Tablet
    ]).subscribe(result => {
      if (result.matches) {
      this.isMobile = result.matches;
      this.filteredOptions = this.stateOptions;
            this.cd.detectChanges();
    }else {
      this.filteredOptions = this.stateOptions.filter(opt => !opt.handsetOnly)
            this.cd.detectChanges();
    }

  });
}
}
