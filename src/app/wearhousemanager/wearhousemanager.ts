import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal, ViewChild } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { DividerModule, Divider } from 'primeng/divider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Popover, PopoverModule } from 'primeng/popover';
import { Tooltip } from "primeng/tooltip";
import { Wearehouse } from '../services/wearehouse';
import { ToastModule } from 'primeng/toast';
import { DrawerModule } from 'primeng/drawer';
import { Table, TableModule, TablePageEvent } from 'primeng/table';
import { Cartegory, Identity, IncomingDataInterface, Product, RequestApprovalData, stockBrand, Stockbycategories, StockControlInterface, Warehouseinterface, WarehousetoWarehouse } from '../interface/warehouseinterface';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { PanelModule } from 'primeng/panel';
import { SelectChangeEvent, SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { InputNumberInputEvent, InputNumberModule } from 'primeng/inputnumber';
import { Brand } from '../interface/products';
import { TextareaModule } from 'primeng/textarea';
import { AvatarModule } from 'primeng/avatar';
import { Control, Store, Storeinterface, StoreListInterface } from '../interface/storeinterface';
import { StoreService } from '../services/store-service';




@Component({
  selector: 'wearhousemanager',
  standalone: true,
  imports: [
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    SplitButtonModule,
    ToolbarModule,
    InputTextModule,
    MenuModule,
    DialogModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PopoverModule,
    Divider,
    Tooltip,
    ToastModule,
    DrawerModule,
    TableModule,
    ToggleSwitchModule,
    PanelModule,
    SelectModule,
    DatePickerModule,
    InputNumberModule,
    TextareaModule,
    AvatarModule,


  ],

  templateUrl: './wearhousemanager.html',
  styleUrl: './wearhousemanager.scss',
  providers: [MessageService],
  // changeDetection: ChangeDetectionStrategy.Default
})
export class Wearhousemanager implements OnInit {

selectedwarehousedetails: any;
return_from_store: boolean=false;
return_from_warehouse: boolean=false;
submitTransfer() {
throw new Error('Method not implemented.');
}


selectAstore($event: SelectChangeEvent) {
console.log($event)
}

  SupplierInvoiceNumber: any;

  createControl($event: ToggleSwitchChangeEvent, arg1: string) {
    let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.warehouseStockID = "STKCTRL" + new Date().getDate() + "-" + randomInteger
    let data = {
      Auth: $event.checked,
      control: arg1,
      date: new Date(),
      id: this.warehouseStockID
    }
    this.warehouseservice.createControl(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.iscreatingcontrol.set(false)
          this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }

      }

    })
  }

  loadControls = () => {
    this.warehouseservice.loadControls().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          const controls = response?.data
          for (const c of controls) {


            const control = c.controlname
            switch (control) {
              case 'WITHDRAWAL':
                this.drawals.set(c.status)
                break;
              case 'INCOMMING':
                this.incoming.set(c.status)
                break;
              case 'RETURNED':
                this.returns.set(c.status)
                break
              case 'TRANSFER':
                this.transfer.set(c.status)
                break;

            }
            console.log(control);
          }
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }


  iscreatingcontrol = signal(false)
  drawals = signal(false);
  incoming = signal(false);
  returns = signal(false);
  transfer = signal(false);

  createControls() {
    this.loadControls()
    this.iscreatingcontrol.set(true)
  }


  searchValue = signal('');
  activityValues = signal<number[]>([0, 100]);

  isStckOpened($event: ToggleSwitchChangeEvent, arg1: any) {
    let data = {
      warehouseStockId: arg1.whse_stockid,
      auth: $event.checked
    }
    this.warehouseservice.isStckOpened(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.loadWarehouse()
          this.isupdatingStock.set(false)
          this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'success', detail: this.message, life: 5000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 5000 });
        }

      }
    })
  }
  editStock(_t527: any) {
    console.log(_t527)
    this.warehouseID = _t527.warehouseid,
      this.warehouseStockID = _t527.whse_stockid,
      this.warehouseservice.loadProductInfoCart().subscribe((response: any) => {
        if (response?.message) {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
          this.isupdatingStock.set(true)
        } else {
          this.cartegory = response?.productCart
          this.cdr.markForCheck()
          this.isupdatingStock.set(true)
        }
      })


  }
  updateStock() {
    let data = {
      warehouseid: this.warehouseID,
      warehouseStockID: this.warehouseStockID,
      warehouseIdentity: this.warehouseIdentity,
      productid: this.selectedproduct.serialnumber,
      productCartegory: this.selectedcartegory.serialnumber,
      productBrand: this.selectedBrand.brandid,
      comment: this.stockComments,
      isOpened: this.setStoclopend,
      dateOpened: this.dateOpened,
      openeningstock: this.stockQuantity
    }

    this.warehouseservice.updateStock(data).subscribe((response: any) => {
      if (response?.message) {
        this.isupdatingStock.set(false)
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.loadWarehouse()
          this.isupdatingStock.set(false)
          this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'info', detail: this.message, life: 5000 });
        } else {
          this.isupdatingStock.set(false)
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 5000 });
        }

      }
    })
  }
  dropStockentry(_t526: any) {
    console.log(_t526)
    let data = {
      whse_stockid: _t526.whse_stockid
    }
    this.warehouseservice.dropstock(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.sucess) {
          this.loadWarehouse()
          this.isStockControlVisisble.set(false)
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'info', detail: this.message, life: 3000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }

    })
  }
  openStock($event: ToggleSwitchChangeEvent) {
    this.setStoclopend = $event.checked
  }

  selectBrand($event: SelectChangeEvent) {
    this.selectedBrand = $event.value
    console.log("The brand: ", this.selectedBrand)
  }





  selectProduct($event: SelectChangeEvent) {
    this.selectedproduct = $event.value

    let data = {
      productid: this.selectedproduct.serialnumber,
    }
    this.warehouseservice.loadProductInfoBrand(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.brand) {
          this.brannd = response?.brand
        }else{
          this.message = 'Something went wrong'
          this.brannd
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });  
        }
      }
    })
  }
  selecteCartegory($event: SelectChangeEvent) {
    this.selectedcartegory = $event.value
    // console.log(this.selectedcartegory)
    let data = {
      productCartegory: this.selectedcartegory.serialnumber,
    }
    this.warehouseservice.loadProductInfoProd(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {

        response?.Product
        this.product = response?.Product
        this.cdr.markForCheck()
      }
    })


  }
  isAddingproduct = signal(false)
  isupdatingStock = signal(false)
  dateOpened: any;
  isStockOpen: any;
  stockQuantity: any;
  brannd: Brand[] = [];
  product: Product[] = [];
  cartegory: Cartegory[] = []
  selectedcartegory: any;
  selectedBrand: any;
  selectedproduct: any;
  warehouseStockID: any
  warehouseIdentity: any
  stockComments: any
  setStoclopend: boolean = false
  savenewStock() {
    let data = {
      warehouseid: this.warehouseID,
      warehouseStockID: this.warehouseStockID,
      warehouseIdentity: this.warehouseIdentity,
      productid: this.selectedproduct.serialnumber,
      productCartegory: this.selectedcartegory.serialnumber,
      productBrand: this.selectedBrand.brandid,
      comment: this.stockComments,
      isOpened: this.setStoclopend,
      dateOpened: this.dateOpened,
      openeningstock: this.stockQuantity
    }
    console.log(data)
    this.warehouseservice.savenewStock(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.success) {
          this.isAddingproduct.set(false)
          this.loadWarehouse()
          this.destroyElement();
          this.message = response?.success
          this.messageservice.add({ severity: 'danger', summary: 'info', detail: this.message, life: 3000 });
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })
  }

  destroyElement() {
    this.warehouseID = undefined
    this.warehouseStockID = undefined,
      this.warehouseIdentity = undefined,
      this.selectedproduct.serialnumber = undefined,
      this.selectedcartegory.serialnumber = undefined,
      this.selectedBrand.brandid = undefined,
      this.stockComments = undefined,
      this.setStoclopend = false,
      this.dateOpened = undefined,
      this.stockQuantity = undefined
  }



  isStockControlVisisble = signal(false)
  selectedwarehousename: any
  warehouseID: any
  stockcontrolData: StockControlInterface[] = []

  selectedWarehouse($event: SelectChangeEvent) {

    this.selectedWarehouseoperationID = $event.value.whse_serialnumber
    this.warehouseID = $event.value.whse_serialnumber
    this.warehouseIdentity = $event.value.identityid
    this.selectedwarehousename = $event.value.warehoustidentity_name + "-" + $event.value.whse_serialnumber
    console.log($event.value)
  }
  //loading warehouse details for operations
  loadWarehouse() {
    let data = {
      selectedWarehouseoperationID: this.selectedWarehouseoperationID
    }
    this.warehouseservice.findwarehouseforOperation(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.isStockControlVisisble.set(true)
        this.isStockoperation.set(false)
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.data) {
          this.isStockControlVisisble.set(true)
          this.isStockoperation.set(false)
          this.stockcontrolData = response?.data
          this.cdr.markForCheck();
        } else {
          this.message = response?.message
          this.isStockControlVisisble.set(true)
          this.isStockoperation.set(false)
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })
  }
  selectedWarehouseoperationID: any
  isStockoperation = signal(false)
  dialogvisible: boolean = false;

  selectedsearchwarehouse: any;
 warehouseOrigin:any

  display() {
    this.isStockoperation.set(true)
  }
  warehouseStockOperation() {
    this.isStockoperation.set(true)
  }
  displayStock(_t78: any) {
    this.selectedwarehousename = _t78.warehousename + "-" + _t78.whse_serialnumber

    this.warehouseIdentity = _t78.identityid
    console.log(this.warehouseIdentity)
    let data = {
      selectedWarehouseoperationID: _t78.whse_serialnumber
    }
    this.warehouseservice.findwarehouseforOperation(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.warehouseIdentity = _t78.identityid
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.data) {
          this.isStockControlVisisble.set(true)
          this.isStockoperation.set(false)
          this.warehouseOrigin=response?.data[0].warehousename
          console.log('warehouse neme : ',response?.data)
          this.stockcontrolData = response?.data

        } else {
          this.message = response?.message
          this.warehouseIdentity = _t78.identityid
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })
  }
  saveEditedRecord() {
    let data = {
      warehouseSerial: this.warehouseSerial,
      warehouseTitle: this.warehouseTitle,
      warehouseLocation: this.warehouseLocation,
      warehousedigialAddress: this.warehousedigialAddress,
      warehouseDescription: this.warehouseDescription,
      identity: this.identity,
      updateDate: new Date()
    }
    this.warehouseservice.updateRecords(data).subscribe((response: any) => {
      if (response.success) {
        this.message = response?.success
        this.isEditwarehouse.set(false)
        this.listWarehouses();
        this.isEditwarehouse.set(false)
        console.log(response?.success)
        this.messageservice.add({ severity: 'info', summary: 'Success', detail: this.message, life: 3000 });
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        } else {
          this.message = "Unknown error has occured"
        }
      }
    })

    console.log(data)
  }
  isVisibleforUpdate = () => {
    this.isEditwarehouse.set(false)
  }
  editWarehouse(t78: any) {
    this.warehouseSerial = t78.whse_serialnumber
    this.warehouseTitle = t78.warehousename
    this.warehouseLocation = t78.location
    this.warehousedigialAddress = t78.digitaladdress
    this.warehouseDescription = t78.decription
    this.isEditwarehouse.set(true)
    this.listItentities()
  }
  dropWarehouse(_t78: any) {
    let data = {
      id: _t78.whse_serialnumber
    }
    this.warehouseservice.dropWarehouse(data).subscribe((response: any) => {
      if (response?.success) {
        this.message = response?.success
        this.messageservice.add({ severity: 'info', summary: 'Success', detail: this.message, life: 3000 });
        this.loading.set(true)
        this.listWarehouses();
      } else {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      }
    })
  }
  isOpend($event: ToggleSwitchChangeEvent, _t78: any) {
    let data = {
      isopened: $event.checked,
      id: _t78.whse_serialnumber
    }
    this.warehouseservice.isOpened(data).subscribe((response: any) => {
      if (response?.success) {
        this.message = response?.success
        this.messageservice.add({ severity: 'info', summary: 'Success', detail: this.message, life: 3000 });
        this.loading.set(true)
        this.listWarehouses();
      } else {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      }
    })
  }
  saveWearHouse() {
    let data = {
      warehouseSerial: this.warehouseSerial,
      identity: this.identity,
      warehouseTitle: this.warehouseTitle,
      warehouseLocation: this.warehouseLocation,
      warehousedigialAddress: this.warehousedigialAddress,
      warehouseDescription: this.warehouseDescription,
      selectedIdentity: this.selectedIdentity,
      date: new Date()
    }
    this.warehouseservice.saveWearHouse(data).subscribe((response: any) => {
      if (response?.success) {
        this.message = response?.success
        this.loading.set(true)
        this.listWarehouses()
        this.destroyParameters()
        this.isNewwarehouse.set(false)
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 });
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })
  }
  destroyParameters = () => {
    this.identity = undefined
    this.warehouseSerial = undefined
    this.warehouseTitle = undefined;
    this.warehouseLocation = undefined;
    this.warehousedigialAddress = undefined;
    this.warehouseDescription = undefined;
    this.selectedIdentity = undefined;
  }
  isVisiblewarehouse() {
    this.isNewwarehouse.set(false)
  }
  selectIdentity($event: SelectChangeEvent) {
    console.log($event)
    this.identity = $event.value.identityid
  }
  isNewwarehouse = signal(false)
  isEditwarehouse = signal(false)
  warehouseSerial: any
  warehouseTitle: any;

  warehouseLocation: any;
  warehousedigialAddress: any;
  warehouseDescription: any;
  selectedIdentity: any;
  newWarehouse() {
    let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.warehouseSerial = "WHSE-LD" + new Date().getDate() + "-" + randomInteger

    this.listItentities()
    this.isNewwarehouse.set(true)
    this.warehouseTitle = undefined;
    this.warehouseLocation = undefined;
    this.warehousedigialAddress = undefined
    this.warehouseDescription = undefined
  }
  listWarehouses = () => {
    return this.warehouseservice.listWarehouses().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.data) {
          this.warehousesData = response?.data
          // console.log(this.warehousesData)
          this.cdr.markForCheck()
          this.loading.set(false)
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }

    })
  }
  isVisibleIdentity() {
    this.isEditIdentity.set(false)
  }
  updateIdentity() {

    let data = {
      identity: this.identity,
      name: this.identityName,
      describe: this.identitydescription,
      date: new Date()
    }

    this.warehouseservice.updateIdentity(data).subscribe((response: any) => {
      if (response?.success) {
        this.message = response?.success

        this.listItentities()
        this.isEditIdentity.set(false)
        this.destroy()
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 });
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })





    this.isEditIdentity.set(false);
  }
  editIdentity(id: any) {
    this.isEditIdentity.set(true)

    this.identity = id.identityid
    this.identityName = id.warehoustidentity_name
    this.identitydescription = id.decription
    console.log(this.isEditIdentity())
  }
  delIdentity(id: any) {
    let data = {
      identityid: id.identityid
    }
    console.log(data)
    this.warehouseservice.delIdentity(data).subscribe((response: any) => {





      if (response?.success) {
        this.message = response?.success
        this.messageservice.add({ severity: 'info', summary: 'Success', detail: this.message, life: 3000 });
        this.listItentities();
      } else {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      }
    })
  }
  auth($event: ToggleSwitchChangeEvent, _t131: any) {
    let data = {
      auth: $event.checked,
      id: _t131.identityid
    }
    this.warehouseservice.auth(data).subscribe((response: any) => {
      if (response?.success) {
        this.message = response?.success
        this.messageservice.add({ severity: 'info', summary: 'Success', detail: this.message, life: 3000 });
        this.listItentities();
      } else {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      }
    })
  }


  isIdentity = signal(false)
  isEditIdentity = signal(false)
  isDrawerVisible = signal(false)
  loading = signal(false)
  identityList: Identity[] = [];
  isVisible: boolean = false
  identitydescription: any;
  identityName: any
  identity: any
  identityID: any
  message: any;
  rowcounter: number = 0


  warehousesData: Warehouseinterface[] = []
  @ViewChild('op') op!: Popover;
  constructor(private storeservice:StoreService, private warehouseservice: Wearehouse, private messageservice: MessageService, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.loading.set(true)
    this.listWarehouses();

  }
  toggle(event: any) {
    this.op.toggle(event);
  }
  setDrawerVisible = () => {


    this.isDrawerVisible.set(true)
    this.listItentities()
    this.loading.set(true)
  }
  clear(table: Table) {
    table.clear();
    this.searchValue.set('');
  }
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  genranCode = () => {
    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.identity = "WHSEID-" + randomInteger
  }

  newIdentity = () => {
    this.genranCode()
    this.isIdentity.set(true)
    this.isVisible = true
  }
  saveIdentity = () => {
    let data = {
      identity: this.identity,
      name: this.identityName,
      describe: this.identitydescription,
      date: new Date()
    }

    this.warehouseservice.saveIsentuty(data).subscribe((response: any) => {
      if (response?.success) {
        this.message = response?.success

        this.listItentities()
        this.destroy()
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 });
      } else {
        if (response?.message) {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })
  }
  listItentities = async () => {
    await this.warehouseservice.listIdenties().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.data) {
          this.identityList = response?.data
          console.log(this.identityList)
          this.cdr.markForCheck()
          this.loading.set(false)
        } else {
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })
  }
  destroy = () => {
    this.identity = undefined
    this.identityName = undefined
    this.identitydescription = undefined
  }

  // /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // stock control objects

  //   showDialog() {
  //  this.dialogVisible.set(true)

  //         console.log()
  //     }
  dialogVisible = signal(false)
  stockbrand: stockBrand[] = []
  selectedproductforStocking: Brand | undefined
  stockedSelectedProduct: any
  currentselectedProduct: any
  stockNumber: any
  StockcontrolObject: any


  incomingStock(_t527: any) {

    let randomInteger: number = this.getRandomInt(1, 1000000); // Generates a random integer between 1 and 10
    this.stockNumber = "STK-NIC" + randomInteger




    this.currentselectedProduct = _t527
    console.log('current selection', this.currentselectedProduct)
    this.stockedSelectedProduct = _t527.name;

    let data = {
      stockId: _t527.productid
    }

    this.warehouseservice.loadforIncoming(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.data) {

          this.stockbrand = response?.data;

          this.StockcontrolObject = response?.control
          this.dialogVisible.set(true)
          this.cdr.markForCheck
          console.log(this.StockcontrolObject)



        } else {
          this.message = "Unknown error has occured"
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })
  }



  previousQty: any = undefined;
  incomingQuantity: number | undefined
  totalQuantity: number | undefined
  stockinfo: any
  brandID: any
  loadPreviousStock(arg0: stockBrand[]) {
    this.brandID = this.selectedproductforStocking?.brandid
    let data = {
      brandID:  this.brandID
    }
    this.warehouseservice.loadPreviousStock(data).subscribe((response: any) => {

      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.empty) {
          console.log('not found')
          setTimeout(() => {
            this.previousQty = 0
            this.cdr.markForCheck()
          }, 100)

        } else {
          if (response?.data) {
            console.log(response?.data[0].warehouse_stock_total_quantity)
            this.previousQty = response?.data[0].warehouse_stock_total_quantity
            this.cdr.markForCheck()
          } else {

          }
        }
      }
    })
  }

destroyWithdrawals(){
  this.warehousename=undefined;
  this.stockwidthdrawalID=undefined
  this.stockedSelectedProduct=undefined;
  this.controlObject[0].controlname=''
  this.storequestID=undefined
  this.previousQty=0
  this.quantityWithdraw=0
  this.remainingQuantity=0
  this.drawaldetails=undefined

}




  calculateTotalQuantoty($event: InputNumberInputEvent) {
    this.totalQuantity = (this.previousQty + $event.value)
  }
  submitIncomingStock = () => {
    // console.log(this.currentselectedProduct.identityid)


    let data = {
      identityid: this.currentselectedProduct.identityid,
      warehouseid: this.currentselectedProduct.warehouseid,
      whse_stockid: this.currentselectedProduct.whse_stockid,
      cartegory: this.currentselectedProduct.cartegory,
      productid: this.currentselectedProduct.productid,
      brandid: this.brandID,
      datePOsted: new Date(),
      currentQty: this.previousQty,
      newQuantity: this.incomingQuantity,
      totalQty: this.totalQuantity,
      details: this.stockinfo,
      stockNumber: this.stockNumber,
      controldId: this.StockcontrolObject[0].controlid,
      controledQuantity: this.incomingQuantity,
      SupplierInvoiceNumber: this.SupplierInvoiceNumber
    }

    this.warehouseservice.addIncomingStock(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        this.destroyincvParam()
      } else {
        if (response?.success) {
          this.message = response?.success
          this.dialogVisible.set(false)
          this.destroyincvParam()

          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 });
        } else {
          this.destroyincvParam()
          this.message = response?.message
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })
  }

  destroyincvParam() {
    this.totalQuantity = 0
    this.previousQty = 0;
    this.stockinfo = undefined;
    this.incomingQuantity = 0
    this.brandID = undefined
    this.currentselectedProduct = undefined
    this.incomingQuantity = 0
    this.SupplierInvoiceNumber = undefined
  }

  isLoadingbyCategories = signal(false)
  isstockhistroyLoading = signal(false)
  authtransfer=signal(false)
  stockby_by_cartegories: Stockbycategories[] = []
  histpory: Stockbycategories[] = []
  first: number = 0;
  rows: number = 10;
RequestNumber:any;
requestServedData:RequestApprovalData[]|undefined;
setRequestViaible = signal(false)
inititateAuthorisation=()=>{
  this.authtransfer.set(true)
}

AuthoriseRequest=()=>{

let data={
  RequestNumber:this.RequestNumber
}
this.warehouseservice.loadInitialRequest(data).subscribe((response:any)=>{
  if(response?.message){
      this.message = response?.message
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 });
  }else{
    if(response?.data){
      console.log(response?.data)
      this.requestServedData=response?.data
        this.authtransfer.set(false)
        this.setRequestViaible.set(true)
    }else{
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
    }
  }
})
}

  displayStockData(_t526: any) {

    let data = {
      category: _t526.cartegory
    }
    this.warehouseservice.loadstockbyBycartegories(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 });
      } else {
        if (response?.data) {
          console.log('sTOCK BY CARTGE ',this.stockby_by_cartegories)
          this.stockby_by_cartegories = response?.data
          //
          this.isLoadingbyCategories.set(true)
        } else {
          this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'success', summary: 'error', detail: this.message, life: 3000 });
        }
      }
    })
  }

loadallStock_for_category(_t526: any) {

    let data = {
      category: _t526.cartegory
    }
    this.warehouseservice.loadallStock_for_category(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 });
      } else {
        if (response?.data) {
          console.log('sTOCK BY CARTGE ',this.stockby_by_cartegories)
          this.stockby_by_cartegories = response?.data
          //
          this.isLoadingbyCategories.set(true)
        } else {
          this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'success', summary: 'error', detail: this.message, life: 3000 });
        }
      }
    })
  }




  next() {
    this.first = this.first + this.rows;
  }

  prev() {
    this.first = this.first - this.rows;
  }

  reset() {
    this.first = 0;
  }

  pageChange($event: TablePageEvent) {
    this.first = $event.first;
    this.rows = $event.rows;
  }


  isLastPage(): boolean {
    return this.stockby_by_cartegories ? this.first + this.rows >= this.isLoadingbyCategories.length : true;
  }

  isFirstPage(): boolean {
    return this.stockby_by_cartegories ? this.first === 0 : true;
  }

  clear1(table: Table) {
    table.clear();
    this.searchValue.set('');
  }
  histcartName: any
  histcartId: any
  showHistroy(_t635: any) {
    this.histcartName = _t635.cartegory_name;
    this.histcartId = _t635.productstockcartegory

    let data = {
      category: this.histcartId
    }
    this.warehouseservice.loadstockHistory(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 });
      } else {
        if (response?.data) {
          this.isstockhistroyLoading.set(true)
          this.histpory = response?.data
          //
          this.isLoadingbyCategories.set(true)
        } else {
          this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'success', summary: 'Success', detail: this.message, life: 3000 });
        }
      }

    })
  }


  withdrawals = signal(false)
  stockwidthdrawalID: any
  selectedstore: any
  storesData: Store[] = []
  quantityWithdraw: number = 0
  remainingQuantity: number = 0
  drawaldetails: any
  controlObject: Control[] = []
  selectedProductID: any
  warehouseNumber: any
storequestID: any;
warehousename:any
  makeDrawals = (_t527: any) => {
    this.loadstores()

    let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.stockwidthdrawalID = "STKD-WD" + new Date().getDate() + "-" + randomInteger


    this.currentselectedProduct = _t527
    this.stockedSelectedProduct = _t527.name;
    this.warehouseNumber = _t527.warehouseid;
    this.selectedProductID = _t527.productid;
    this.warehousename=_t527.warehousename
    let data = {
      stockId: _t527.productid
    }

    this.warehouseservice.transfert_To_stores(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.data) {
          setTimeout(() => {
            this.stockbrand = response?.data;
            this.cdr.markForCheck
          }, 250)
        } else {
          this.message = "Unknown error has occured"
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })


 this.warehouseservice.loadstockcontrol().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.control) {
          console.log('Controls= ',response?.control)
          
            this.controlObject = response?.control
                 this.cdr.markForCheck
                    this.withdrawals.set(true)
        } else {
          this.message = "Unknown error has occured"
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })

 

  }



  loadstores = () => {
    this.warehouseservice.loadstores().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          setTimeout(() => {
            this.storesData = response?.data;
            this.cdr.markForCheck()
            this.cdr.detectChanges()
          }, 1000);
        } else {
          this.message = "Unknown error has occured"
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }


  calculateRemainingStock($event: InputNumberInputEvent) {



    const amount_to_withdraw = $event.value ?? 0
        if(this.previousQty>=1 || !amount_to_withdraw>this.previousQty){
    this.remainingQuantity = this.previousQty - amount_to_withdraw;
        }else{
    alert('Attention: Requested stocked must not be greater than available stock')
        }
  }


  submitTo_Store = () => {
    if( this.previousQty>=1){
    let data = {
      stockwidthdrawalID: this.stockwidthdrawalID,
      whse_stockid: this.currentselectedProduct.whse_stockid,
      stockedSelectedProduct: this.selectedProductID,
      controlObject: this.controlObject[0].controlid,
      storeid: this.storesData[0].storenumber,
      brandid: this.brandID,
      previousQty: this.previousQty,
      quantityWithdraw: this.quantityWithdraw,
      drawaldetails: this.drawaldetails,
      warehouseNumber:this.warehouseNumber,
      storequestID:this.storequestID
    }
    this.warehouseservice.submitToStore(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.success) {
          this.destroyWithdrawals()
          this.withdrawals.set(false)
          this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'SUCCESS', detail: this.message, life: 3000 });
        } else {
          this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'danger', summary: 'Success', detail: this.message, life: 3000 });
        }
      }
    })
  }else{
    alert('No stock available for this product brand')
  }
  }

approveRequest($event: ToggleSwitchChangeEvent,_t683: any) {
console.log(_t683)
let data={
isApprove:$event.checked,
store_request_id:_t683.store_request_id,
stock_to_storeid:_t683.stock_to_storeid,
withdrwanbrand:_t683.withdrwanbrand,
drawal_quantity:_t683.drawal_quantity,
warehouse_stock_id:_t683.warehouse_stock_id,
store_id:_t683.store_id,
from_warehouse_id:_t683.from_warehouse_id,
stockoperationid:_t683.stockoperationid
}
this.warehouseservice.approveRequest(data).subscribe((response:any)=>{
  if(response?.message){
this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
  }else{
    if(response?.success){
        this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'SUCCESS', detail: this.message, life: 3000 });
    }else{
     this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });

    }
  }
})
}

warehouseData:Warehouseinterface[]=[]
loadwarehouses = () => {
    this.warehouseservice.loadwarehouses().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.data) {
          setTimeout(() => {
            console.log('The warehouses',)
            this.warehouseData = response?.data;
                 console.log('The warehouses',this.warehouseData)
            this.cdr.markForCheck
          }, 1000);



        } else {
          this.message = "Unknown error has occured"
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 5000 });
        }
      }
    })
  }

isTowarehouseTransfer=signal(false)
transferStockoverwarehouse(_t527:any) {
  let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.stockwidthdrawalID = "WHS-WHSID" + new Date().getDate() + "-" + randomInteger

    this.loadwarehouses()


    this.currentselectedProduct = _t527
    this.stockedSelectedProduct = _t527.name;
    this.warehouseNumber = _t527.warehouseid;
    this.selectedProductID = _t527.productid;
    this.warehousename=_t527.warehousename
    let data = {
      stockId: _t527.productid
    }

    this.warehouseservice.transfert_To_stores(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.data) {
          setTimeout(() => {
            this.stockbrand = response?.data;
            this.cdr.markForCheck
          }, 250)
        } else {
          this.message = "Unknown error has occured"
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })


 this.warehouseservice.loadstockcontrolforwarehouse().subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
      } else {
        if (response?.control) {
          console.log('Controls= ',response?.control)
          
            this.controlObject = response?.control
                 this.cdr.markForCheck
                    this.isTowarehouseTransfer.set(true)
        } else {
          this.message = "Unknown error has occured"
          this.messageservice.add({ severity: 'danger', summary: 'Error', detail: this.message, life: 3000 });
        }
      }
    })



}
transferNumber:any
setTransferId=()=>{

    let randomInteger: number = this.getRandomInt(1, 10000000); // Generates a random integer between 1 and 10
    this.transferNumber = "WH-TRNS" + new Date().getDate() + "-" + randomInteger
    console.log(this.transferNumber)
}

  submitTo_Warehouse = () => {
    if( this.previousQty>=1){
    let data = {
      stockwidthdrawalID: this.stockwidthdrawalID,
      whse_stockid: this.currentselectedProduct.whse_stockid,
      stockedSelectedProduct: this.selectedProductID,
      controlObject: this.controlObject[0].controlid,
      towarehouse: this.selectedWarehouseoperationID,
      brandid: this.brandID,
      previousQty: this.previousQty,
      quantityWithdraw: this.quantityWithdraw,
      drawaldetails: this.drawaldetails,
      warehouseNumber:this.warehouseNumber,
      storequestID:this.storequestID,
      transferid:this.transferNumber
    }
    
    if(this.warehouseNumber!==this.selectedWarehouseoperationID){
    this.warehouseservice.transfer_to_Warehouse(data).subscribe((response: any) => {
      if (response?.message) {
        this.message = response?.message
        this.messageservice.add({ severity: 'erro', summary: 'Error', detail: this.message, life: 5000 });
      } else {
        if (response?.success) {
          this.destroyWithdrawals()
          this.withdrawals.set(false)
          this.message = response?.success
          this.isTowarehouseTransfer.set(false)
          this.messageservice.add({ severity: 'success', summary: 'SUCCESS', detail: this.message, life: 5000 });
        } else {
          this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Success', detail: this.message, life: 5000 });
        }
      }
    })
  }else{
     this.message = 'You cannot transfer stock to the warehouse you initiated the transfer'
          this.messageservice.add({ severity: 'warn', summary: 'Warning', detail: this.message, life: 5000 });
  }
  }else{
    alert('No stock available for this product brand')
 }
  }

  isApproveWarehousetransfer=signal(false)
isVisibleWrehoustTowarehouse=signal(false);
showVisibleWareseTransferData=signal(false)
toWarehouseData:WarehousetoWarehouse[]=[]
  approveWarehouseTransfer=()=>{
  this.isApproveWarehousetransfer.set(true)
}

ApproveWarehouseRequest=()=>{

let data={
  RequestNumber:this.RequestNumber
}
this.warehouseservice.loadWarehouseRequest(data).subscribe((response:any)=>{
  if(response?.message){
      this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
  }else{
    if(response?.data){
  
      this.toWarehouseData=response?.data
      this.showVisibleWareseTransferData.set(true)
 console.log(this.toWarehouseData)
        this.isVisibleWrehoustTowarehouse.set(true)
   
    }else{
        this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
    }
  }
})
}


warehouseRequeastapproval($event: ToggleSwitchChangeEvent,_t683: any) {
console.log(_t683)
let data={
isApprove:$event.checked,
warehouse_request_id:_t683.warehouse_request_id,
warehouse_transfer_id:_t683.warehouse_transfer_id,
transfered_stock_brand:_t683.transfered_stock_brand,
transfered_quantity:_t683.transfered_quantity,
warehouse_stock_id:_t683.warehouse_stock_id,
to_warehouse_id:_t683.to_warehouse_id,
from_warehouse_id:_t683.from_warehouse_id,
stockoperationid:_t683.stockoperationid,
}
this.warehouseservice.warehouseRequeastapproval(data).subscribe((response:any)=>{
  if(response?.message){
this.message = response?.message
        this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
  }else{
    if(response?.success){
        this.message = response?.success
          this.messageservice.add({ severity: 'success', summary: 'SUCCESS', detail: this.message, life: 5000 });
    }else{
     this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });

    }
  }
})
}
controls:StockControlInterface[]=[]
selectedControl:StockControlInterface|undefined
selectedStoreName:any
selectedWarehouseName:boolean=false
isStockreturns=signal(false)
retuneStock=()=>{
this.isStockreturns.set(true)
this.warehouseservice.returnstockcontrols().subscribe((response:any)=>{
  if(response?.message){
    this.message=response?.message

          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
  }else{
    if(response.control){
      this.controls=response?.control
    }else{
       this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
    }
  }
})
this.loadstores()
}
isReturnFromWarehouse=signal(false)
isReturnfromStore=signal(false)
isStoreSelected=signal(false)
isWarehouseSelected=signal(false)
selectOperation($event: SelectChangeEvent) {
let selected=$event.value.controlname.trim()
// console.log($event.value)
switch(selected){
  case 'RETURN_FROM_WAREHOUSE':
this.isReturnFromWarehouse.set(true)
this.isReturnfromStore=signal(false)
  break;
case 'RETURN_FROM_STORE':
this.isReturnfromStore=signal(true)
this.isReturnFromWarehouse.set(false)
break;
default :
 this.message = 'This operation cannot be applied here'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
          break;
}
}

selectStoreName=($event: SelectChangeEvent)=>{
this.isStoreSelected.set(true)
this.isWarehouseSelected.set(false)
}
selectWarehouseName=($event: SelectChangeEvent)=>{
this.isWarehouseSelected.set(true)
this.isStoreSelected.set(false)
}
selectProductInStore=()=>{
console.log(this.selectedStoreName)
let data={
  storeNumber:this.selectedStoreName.storenumber,
  storetype:this.selectedStoreName.storetype
}
this.warehouseservice.loadStoreProduct_for_selected_store(data).subscribe((response:any)=>{
if(response?.message){
    this.message=response?.message

          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
  }else{
    if(response.control){
      this.controls=response?.control
    }else{
       this.message = 'Unknown error has occured'
          this.messageservice.add({ severity: 'error', summary: 'Error', detail: this.message, life: 5000 });
    }
  }
})
}





}
