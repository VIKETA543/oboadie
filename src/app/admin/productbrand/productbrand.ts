import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, signal, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService, ConfirmationService, MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DataViewModule } from 'primeng/dataview';
import { FloatLabelModule } from 'primeng/floatlabel';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { Popover, PopoverModule } from 'primeng/popover';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ProductCategory, Group, Brand } from '../../interface/products';
import { productservice } from '../../services/productservice';
import { Products } from '../products/products';
import { DividerModule } from 'primeng/divider'; 

@Component({
  selector: 'productbrand',
  imports: [
    SplitButtonModule,
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
    ToastModule,
    DataViewModule,
    TableModule,
    PopoverModule,
    TagModule,
    CardModule,
    DividerModule
  ],
  templateUrl: './productbrand.html',
  styleUrl: './productbrand.scss',
  providers: [MessageService, ConfirmationService],
})
export class Productbrand {
  refreshData() {
    this.loadBrandData();
  }
  selectBrand($event: SelectChangeEvent) {
    var brndid = $event.value
    let data = { brandID: brndid?.brandid }

    this.productservice.loadSelectedBrand(data).subscribe((response: any) => {
      if (response?.data) {

                this.brandData = response?.data
        this.cdk.markForCheck()

      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageService.add({ severity: 'info', summary: 'Info', detail: this.message, life: 3000 });
        }
      }
    })
  }
    loadProductList=()=>{
    this.productservice.listproduct().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
      } else {
        if (response?.data) {
          this.productList = response?.data
               this.cdk.markForCheck();
        } else {
          if (response?.noactivity) {

          } else {
            this.message = "Unknown error has occured"
          }

        }
      }
    })
  }
    @ViewChild('op') op!: Popover;
  message: any
  
  productCart: ProductCategory[] | undefined;
  productList:Products[]=[];
  selectedProduct:Products[]|undefined
  selectedCart: string | undefined;
  groupList: Group[] | undefined;
  selectedGroup: Group | undefined;
  serialnumber: any;

  brandData: Brand[] | undefined;
  selectedBrand: Brand | undefined

  brandList:Brand[]|undefined
  seletedBrandID:Brand|undefined;
  constructor(private productservice: productservice, private messageService: MessageService, private cdk: ChangeDetectorRef) { }
  selectionOption($event: SelectChangeEvent) {
    this.serialnumber = $event.value.serialnumber
    console.log($event.value)
  }
  loadBrandList = () => {
    this.productservice.loadBrandList().subscribe((response: any) => {
      if (response?.data) {

              this.brandList = response?.data
        this.cdk.markForCheck()

      
      
      } else {
        if (response?.message) {
          this.message = response?.success
          this.messageService.add({ severity: 'primary', summary: 'Sucess', detail: this.message, life: 3000 });
        } else {
          this.message = "Unknown Error has occured"
          this.messageService.add({ severity: 'danger', summary: 'Attention', detail: this.message, life: 3000 });
        }
      }
    })
  }

  loadcartList = () => {
    this.productservice.categoryList().subscribe((response: any) => {
      if (response?.data) {
        this.productCart = response?.data
             this.cdk.markForCheck();
      } else {
        if (response?.message) {
          this.message = response?.success
          this.messageService.add({ severity: 'primary', summary: 'Sucess', detail: this.message, life: 3000 });
        } else {
          this.message = "Unknown Error has occured"
          this.messageService.add({ severity: 'danger', summary: 'Attention', detail: this.message, life: 3000 });
        }

      }
    })
  }
  submitBrand = () => {
    const formData = new FormData()
    formData.append('BrandId', this.groupID)
    formData.append('BrandName', this.GroupTitle),
      formData.append('BrandRole', this.groupRole),
      formData.append('image', this.image),
      formData.append('serialnumber', this.serialnumber)
    this.productservice.addBrand(formData).subscribe((response: any) => {
      if (response?.success) {
        console.log(response?.success)

        this.loadBrandData();
        this.message = response?.success
        this.messageService.add({ severity: 'primary', summary: 'Sucess', detail: this.message, life: 3000 });
        this.preview = undefined;
        this.isNewBrand = false

      } else {
        if (response?.message) {
          // console.log(response?.message)
          this.message = response?.message
          this.messageService.add({ severity: 'info', summary: 'Attention', detail: this.message, life: 3000 });
          this.preview = undefined
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
            this.cdk.markForCheck()

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
    this.loadBrandData();
    this.listBrand();
   this.loadProductList();
  }

  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  genranCode = () => {
    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.groupID = "BRND-HTB" + randomInteger
  }
  isNewBrand: boolean = false;
  newBrand = () => {
    this.genranCode();
    this.isNewBrand = true
  }
  closeBrand = () => {
    this.isNewBrand = false
  }
  CloseBrandpre = () => {
    this.preview = undefined

  }
  loadBrandData = () => {
    this.productservice.loadBrandData().subscribe((response: any) => {
      if (response?.data) {
                this.brandData = response?.data
        this.cdk.markForCheck()
 
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageService.add({ severity: 'info', summary: 'Info', detail: this.message, life: 3000 });
        }
      }
    })
  }
    displayBrand = (selected: any, event: any) => {
setTimeout(()=>{
    this.selectedBrand = selected
},1000)

  }
  toggle(event: any) {
console.log(this.selectedBrand)
     this.op.toggle(event);
  }

  dropBrand = (selected: any) => {
    const brandid = selected.brandid
    let data = {
      brandID: brandid
    }
    this.productservice.dropBrand(data).subscribe((response: any) => {
      if (response?.sucess) {
        this.message = response?.success
        this.messageService.add({ severity: 'primary', summary: 'Success', detail: this.message, life: 3000 });
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageService.add({ severity: 'info', summary: 'Attention', detail: this.message, life: 3000 });
        } else {
          this.message = "unknown error occured"
          this.messageService.add({ severity: 'danger', summary: 'Attention', detail: this.message, life: 3000 });
        }
      }
    })
  }
  hidePopover() {
    this.op.hide();
  }

  getSeverity(product: any) {
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

  listBrand = () => {
    this.productservice.listBrand().subscribe((response: any) => {
      if (response?.data) {
        
              this.brandList = response?.data
            this.cdk.markForCheck();
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageService.add({ severity: 'info', summary: 'Info', detail: this.message, life: 3000 });
        }
      }
    })
  }
}
