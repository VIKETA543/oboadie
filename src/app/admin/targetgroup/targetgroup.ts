import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FloatLabelModule } from 'primeng/floatlabel';
import { TextareaModule } from 'primeng/textarea';
import { PrimeIcons, MenuItem } from 'primeng/api';
import { productservice } from '../../services/productservice';
import { Group, ProductCategory } from '../../interface/products';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { ToastModule } from 'primeng/toast';
import { DataViewModule } from 'primeng/dataview';
import { TableModule } from 'primeng/table';
import { Popover } from 'primeng/popover';
import { PopoverModule } from 'primeng/popover';
import { TagModule } from 'primeng/tag';
import { CardModule } from 'primeng/card';
import { response } from 'express';

@Component({
  standalone: true,
  selector: 'targetgroup',
  imports: [SplitButtonModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    ToolbarModule,
    InputTextModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    TextareaModule,
    SelectModule,
    // IconField,
    // InputIcon,
    ToastModule,
    DataViewModule,
    TableModule,
    PopoverModule,
    TagModule,
    CardModule
  ],
  templateUrl: './targetgroup.html',
  styleUrl: './targetgroup.scss',
     providers:[MessageService,ConfirmationService]
})
export class Targetgroup implements OnInit {
refreshData() {
this.loadTargetgrpup();
}
selectionGroup($event: SelectChangeEvent) {
// console.log(this.selectesgroup)
let data={ GroupID:this.selectesgroup?.groupid}

   this.productservice.loadSelectedGroup(data).subscribe((response: any) => {
      if (response?.data) {
        this.groupList = response?.data
        console.log(this.groupList)
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageService.add({ severity: 'info', summary: 'Info', detail: this.message, life: 3000 });
        }
      }
    })
}
    @ViewChild('op') op!: Popover;
  message: any
  productCart: ProductCategory[] | undefined;
  selectedCart: string | undefined;
  groupList: Group[]|undefined;
    selectedGroup: Group|undefined;
  serialnumber:any;
   
  groupData:Group[]|undefined;
  selectesgroup:Group|undefined
  constructor(private productservice: productservice, private messageService: MessageService,  private cdr: ChangeDetectorRef,) { }
  selectionOption($event: SelectChangeEvent) {
    this.serialnumber = $event.value.serialnumber


  }
  loadcartList = () => {
    this.productservice.categoryList().subscribe((response: any) => {
      if (response?.data) {
        this.productCart = response?.data
      } else {

      }
    })
  }
  
  submitGrouop() {
    const formData = new FormData()
    formData.append('groupId', this.groupID)
    formData.append('groupName', this.GroupTitle),
      formData.append('groupRole', this.groupRole),
      formData.append('image', this.image),
      formData.append('serialnumber', this.serialnumber)
    this.productservice.addGroup(formData).subscribe((response: any) => {
      if (response?.success) {
        console.log(response?.success)

         this.loadTargetgrpup();
          this.message = response?.success
          this.messageService.add({ severity: 'primary', summary: 'Sucess', detail: this.message, life: 3000 });
      } else {
        if (response?.message) {
          console.log(response?.message)
           this.message = response?.message
          this.messageService.add({ severity: 'info', summary: 'Attention', detail: this.message, life: 3000 });
          this.preview=undefined
        } else {
      
           this.message = "Unknown Error has occured"
          this.messageService.add({ severity: 'danger', summary: 'Attention', detail: this.message, life: 3000 });
        }
      }
    })
  }
  uploadFile($event: any) {
    this.selectedFile = $event.target.files;
    if (this.selectedFile && this.selectedFile[0]) {
      const numberOfFiles = this.selectedFile.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.preview = e.target.result
        }
        reader.readAsDataURL(this.selectedFile[i]);
        this.selectedFileNames.push(this.selectedFile[i].name);
        this.image = this.selectedFile[i];
      }
    }

  }
  isShown = signal(false);
  position: 'left' | 'right' | 'top' | 'bottom' = 'right';
  position1: 'left' | 'right' | 'top' | 'bottom' = 'bottom';
  items: MenuItem[] | undefined;
  groupID: any
  targetgroup: boolean = false
  GroupTitle: any
  groupRole: any
  groupImage: any
  image: any
  preview: any;
  selectedFile?: FileList;
  selectedFileNames: any[] = [];
  selectedImage: any;
  
  ngOnInit(): void {
    this.isShown.update((isShown) => !isShown);
    this.loadcartList()
     this.loadTargetgrpup();
     this.findgroups();
    //  this.cdr.markForCheck()
  }
    ngAfterViewInit(): void {
        // 
    }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  genranCode = () => {
    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.groupID = "GRT-HTB" + randomInteger
  }
  isNewgroup: boolean = false;
  newGroup = () => {
    this.genranCode();
    this.isNewgroup = true
  }
  closeGroup = () => {
    this.isNewgroup = false
  }
  CloseGrouoppre = () => {
    this.preview = undefined

  }
  loadTargetgrpup = () => {
    this.productservice.loadTargetgrpup().subscribe((response: any) => {
      if (response?.data) {
        setTimeout(()=>{
              this.groupList = response?.data
        },5000)
        // console.log(this.groupList)
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageService.add({ severity: 'info', summary: 'Info', detail: this.message, life: 3000 });
        }
      }
    })
  }
   toggle(event:any) {

        this.op.toggle(event);
    }
displayGroup=(selected:any,event:any)=>{
   
  this.selectedGroup=selected
}
dropGroup=(selected:any)=>{
console.log(selected)
const  groupid=selected.groupid

let data={
  groupID:groupid
}
this.productservice.dropGroup(data).subscribe((response:any)=>{
  if(response?.sucess){
    this.message=response?.success
    this.messageService.add({ severity: 'primary', summary: 'Success', detail: this.message, life: 3000 });
  }else{
    if(response?.message){
      this.message=response?.message
        this.messageService.add({ severity: 'info', summary: 'Attention', detail: this.message, life: 3000 });
    }else{
      this.message="unknown error occured"
       this.messageService.add({ severity: 'danger', summary: 'Attention', detail: this.message, life: 3000 });
    }
  }
})
}
  hidePopover() {
        this.op.hide();
    }

        getSeverity(product:any) {
        switch (product) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warn';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    }

      findgroups = () => {
       this.productservice.loadTargetgrpup().subscribe((response: any) => {
      if (response?.data) {
        setTimeout(()=>{
                  this.groupData = response?.data
        },5000)
        // console.log(this.targetGroup)
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageService.add({ severity: 'info', summary: 'Info', detail: this.message, life: 3000 });
        }
      }
    })
  }
  }
