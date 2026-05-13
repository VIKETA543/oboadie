import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { Divider } from 'primeng/divider';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { ToolbarModule } from 'primeng/toolbar';
import { Tooltip } from 'primeng/tooltip';
import { Crmservice } from '../../services/crmservice';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'create-account',
  imports: [ToolbarModule,
    ToastModule, ButtonModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    InputTextModule,
    Tooltip,
    TableModule,
    ToggleSwitchModule,
    FormsModule,
    Divider,
    CommonModule,
    ReactiveFormsModule,
    DialogModule,
    TextareaModule,
    CheckboxModule,
    SelectModule,
    PanelModule,
    FileUploadModule,
    // DatePipe, NgxPrintDirective,CurrencyPipe,NgxBarcode6,
    InputNumberModule, FluidModule,],
  templateUrl: './create-account.html',
  styleUrl: './create-account.scss',
  providers: [MessageService],
  // changeDetection:ChangeDetectionStrategy.Default
})
export class CreateAccount implements OnInit, OnDestroy {
  messageservice = inject(MessageService)
  constructor(private crmservice: Crmservice, private cdr: ChangeDetectorRef) { }
  remarks: any;
  identificationNumber: any;
  identificationTyepes: any[] = []
  selectedId: any;
  AccountName: any;
  AccountNumber: any;
  mobileNumber: any;
  telephoneNumber: any;
  emailAddress: any;
  address: any;

  ngOnDestroy(): void {

  }
  ngOnInit(): void {
    this.initIdType()
    this.AccountNumber = "ONADPAC" + new Date().getDate() + "-" + this.getRandomInt(1000, 9999)
  }
  initIdType() {
    this.identificationTyepes = [
      { name: 'GHANA CARD', code: 'NIA-GHA-12321-GH' },
      { name: 'DRIVER LICENSE', code: 'DVLA-GHA-00121-GH' },
      { name: 'PASSPORT', code: 'PASS-GHA-2001-GH' },
      { name: 'VOTER ID', code: 'ELC-GHA-3001-GH' },

    ];
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  image: any
  id_image: any;
  passport_image: any
  selectedFile?: FileList;
  IdFileNames: any[] = [];
  passportFileNames: any[] = [];
  idimage_preview: any;
  passport_preview: any
  message: any;

  onIdImageUpload($event: Event) {

    this.selectedFile = $event.target ? ($event.target as HTMLInputElement).files as unknown as FileList : undefined;

    if (this.selectedFile && this.selectedFile[0]) {
      const numberOfFiles = this.selectedFile.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.idimage_preview = e.target.result
          this.cdr.detectChanges()

        }
        reader.readAsDataURL(this.selectedFile[i]);
        this.IdFileNames.push(this.selectedFile[i]);
        this.id_image = this.selectedFile[i];
        console.log(this.idimage_preview)
      }
    }
  }



  onPassportUpload($event: Event) {


    this.selectedFile = $event.target ? ($event.target as HTMLInputElement).files as unknown as FileList : undefined;

    if (this.selectedFile && this.selectedFile[0]) {
      const numberOfFiles = this.selectedFile.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.passport_preview = e.target.result
          this.cdr.detectChanges()
        }
        reader.readAsDataURL(this.selectedFile[i]);
        this.passportFileNames.push(this.selectedFile[i]);
        this.passport_image = this.selectedFile[i];

      }
    }
  }

  openAccount() {
    // const formData = new FormData();
    let data = {
      AccountNumber: this.AccountNumber,
      AccountName: this.AccountName,
      mobileNumber: this.mobileNumber,
      telephoneNumber: this.telephoneNumber,
      emailAddress: this.emailAddress,
      address: this.address,
      identificationType: this.selectedId.code,
      identificationNumber: this.identificationNumber,
      remarks: this.remarks,
      dateOpened: new Date().toISOString(),
      verified: 'false',
      isAccountOpened: 'true'
    }


    return this.crmservice.postAccount(data).subscribe((response: any) => {
      console.log(response?.message)
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
          let formData = new FormData();
          formData.append('AccountNumber', this.AccountNumber);
          formData.append('IDCARD', this.id_image);

          this.crmservice.uplaodIdCard(formData).subscribe((res: any) => {
            if (res?.success) {
              this.message = res?.message
              this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
            } else {
              this.message = res?.message
              this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            }
          })
          formData = new FormData();
          formData.append('AccountNumber', this.AccountNumber);
          formData.append('PASSPORT', this.passport_image);

          this.crmservice.uploadpassport(formData).subscribe((res: any) => {
            if (res?.success) {
              this.message = res?.message
              this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
            } else {
              this.message = res?.message
              this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            }
          })

        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }

      }

    })
  }
}
