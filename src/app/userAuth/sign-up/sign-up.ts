import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CheckboxChangeEvent, CheckboxModule } from 'primeng/checkbox';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { SelectModule } from 'primeng/select';
import { MessageService } from 'primeng/api';
import { Userservice } from '../../services/userservice';
import * as CryptoJS from 'crypto-js';
import { DatePickerModule } from 'primeng/datepicker';
import { FluidModule } from 'primeng/fluid';
import { InputNumberModule } from 'primeng/inputnumber';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastModule } from 'primeng/toast';
@Component({
  selector: 'sign-up',
  imports: [FormsModule,InputNumberModule, ButtonModule,SelectModule,ToastModule, InputTextModule, CheckboxModule,DatePickerModule,FluidModule, DividerModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.scss',
  providers:[MessageService],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class SignUp implements OnInit {
dateofBirth: any;
userAge: any;
setGenger($event: CheckboxChangeEvent,arg1: string) {
  console.log($event)
switch(arg1){
    case 'MALE':
      this.gender=arg1
      this.checkedFemale=false
      break;
      case 'FEMALE':
      this.gender=arg1
      this.checkedMale=false
        break;
        default :
        this.message='Select Gender'
  }

}


  messageservice=inject(MessageService)
  identificationNumber: any;
  identificationTyepes: any[] = []
  selectedId:any|undefined
    size: any = null;

  checkedMale: boolean=false;
  checkedFemale:boolean=false

  private secretKey = 'ONA@PRIME~@#351211$%@@';


  constructor(private cdr: ChangeDetectorRef, private userservce:Userservice,private router:Router,private routes:ActivatedRoute) { }
  ngOnInit(): void {
    this.identificationTyepes = [
      { name: 'GHANA CARD', code: 'NIA-GHA-UA12321-GH' },
      { name: 'DRIVER LICENSE', code: 'DVLA-GHA-UA00121-GH' },
      { name: 'PASSPORT', code: 'PASS-GHA-UA2001-GH' },
      { name: 'VOTER ID', code: 'ELC-GHA-UA3001-GH' },

    ];
   this.generateAccountID();
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
accoun_id:any
encrypted_Key:any


generateAccountID=()=>{
      let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.accoun_id = "ONDPT-ACC" + new Date().getDate() + "-" + randomInteger

this.encryptAccoutKey(this.accoun_id);


}

encryptAccoutKey(data: string): string {
    return this.encrypted_Key= CryptoJS.AES.encrypt(data, this.secretKey).toString();
  }


  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


calculateAge(selectedDate: Date) {
    if (selectedDate) {
      const today = new Date();
      const birthDate = new Date(selectedDate);

      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }

      this.userAge = calculatedAge;
    }
  }
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

fullName: any;
prim_mobileNumber: any;
sec_mobile_Number: any;
genderMale: any;
emailAddress: any;
genderFemale: any;
cardNumber: any;
digitalAddress: any;
surburb: any;
gender:any
  signup() {
    let data={
      encrypted_Key:this.encrypted_Key,
      fullName:this.fullName,
      primPhone:this.prim_mobileNumber,
      secPhone:this.sec_mobile_Number,
      emailAddress:this.emailAddress,
      idType:this.selectedId?.code,
      idNumber:this.cardNumber,
      datePosted:new Date(),
      digitalAddress:this.digitalAddress,
      gender:this.gender,
      surburb:this.surburb,
      dob:this.dateofBirth,
      age:this.userAge
    }
this.userservce.signup(data).subscribe((response:any)=>{
  if(response?.success){
    this.message=response?.sucess
      this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
      if(this.passport_image!==undefined){
        this.uploadPassport()
      }
      if(this.id_image!==undefined){
        this.uploadIdCard();
      }
this.router.navigate(['../auth',this.encrypted_Key],{relativeTo:this.routes})

  }else{
    this.message=response?.message
      this.messageservice.add({ severity: 'error', summary: 'Info', detail: this.message, life: 5000 });
  }
})
  }
// ,{relativeTo:this.routes}
      uploadIdCard=()=>{
          let formData = new FormData();
          formData.append('key', this.encrypted_Key);
          formData.append('IDCARD', this.id_image);

          this.userservce.uplaodIdCard(formData).subscribe((res: any) => {
            if (res?.success) {
              this.message = res?.message
              this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
            } else {
              this.message = res?.message
              this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            }
          })
      }

      uploadPassport=()=>{
        
          let formData = new FormData();
          formData.append('key', this.encrypted_Key);
          formData.append('PASSPORT', this.passport_image);
          this.userservce.uploadpassport(formData).subscribe((res: any) => {
            if (res?.success) {
              this.message = res?.message
              this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 5000 });
            } else {
              this.message = res?.message
              this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
            }
          })
      }
}
