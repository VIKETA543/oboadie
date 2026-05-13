import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SelectButtonModule, SelectButtonOptionClickEvent } from 'primeng/selectbutton';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'verify-sales',
  imports: [
    CommonModule,
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
  LayoutModule
  ],
  templateUrl: './verify-sales.html',
  styleUrl: './verify-sales.scss',
})
export class VerifySales implements OnInit {

constructor(
    private router: Router,
    private route: ActivatedRoute,
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
){}

  selectionOption: string='HOME';
  isMobile = false;
  stateOptions: any[] = [{ label: 'HOME', value: 'HOME',handsetOnly: false },{ label: 'CASH', value: 'CASH SALES',handsetOnly: false }, { label: 'CREDIT', value: 'CREDIT SALES',handsetOnly: false }];
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

  selectionButton($event: SelectButtonOptionClickEvent) {
    const selectedOption = $event.option.label
    switch (selectedOption) {
        case "HOME":
        this.router.navigate(['../'], { relativeTo: this.route });
        break;
      case "CASH":
        this.router.navigate(['verify-cash-sales'], { relativeTo: this.route });
        break;

      case "CREDIT":
        this.router.navigate(['verify-credit-sales'], { relativeTo: this.route });
        break;
    default: this.router.navigate(['verify-credit-sales'], { relativeTo: this.route });
    }
  }

}
