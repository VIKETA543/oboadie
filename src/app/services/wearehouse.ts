
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',

})
export class Wearehouse {
    url = environment.apiUrl;
    constructor(private http: HttpClient) { }

    saveIsentuty = (data: any) => {
        console.log(data)
        return this.http.post(this.url + '/warehouse/addidentity', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    listIdenties = () => {
        return this.http.get(this.url + '/warehouse/listidentities', { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    auth = (data: any) => {
        return this.http.post(this.url + '/warehouse/auth', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    delIdentity = (data: any) => {
        return this.http.post(this.url + '/warehouse/delIdentity', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    updateIdentity = (data: any) => {
        return this.http.post(this.url + '/warehouse/updateIdentity', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


    listWarehouses = () => {
        return this.http.get(this.url + '/warehouse/listwarehouses', { headers: new HttpHeaders().set('contentType', "application/json") })
    }


    saveWearHouse = (data: any) => {
        return this.http.post(this.url + '/warehouse/saveWearhouse', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    isOpened = (data: any) => {
        console.log(data)
        return this.http.post(this.url + '/warehouse/isopened', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    dropWarehouse = (data: any) => {
        console.log(data)
        return this.http.post(this.url + '/warehouse/dropwarehouse', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    updateRecords = (data: any) => {

        return this.http.post(this.url + '/warehouse/updaterecords', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    findwarehouseforOperation = (data: any) => {

        return this.http.post(this.url + '/warehouse/findwarehouseforOperation', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


    loadProductInfoCart = () => {
        return this.http.post(this.url + '/warehouse/productCartegeory', { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    loadProductInfoProd = (data: any) => {
        return this.http.post(this.url + '/warehouse/products', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    loadProductInfoBrand = (data: any) => {
        return this.http.post(this.url + '/warehouse/productBrand', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


    savenewStock = (data: any) => {
        return this.http.post(this.url + '/warehouse/savenewstock', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


    dropstock = (data: any) => {
        return this.http.post(this.url + '/warehouse/dropstock', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


    updateStock = (data: any) => {
        return this.http.post(this.url + '/warehouse/updatestock', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    isStckOpened = (data: any) => {
        return this.http.post(this.url + '/warehouse/isStckOpened', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }



    loadforIncoming = (data: any) => {
        return this.http.post(this.url + '/warehouse/loadforIncoming', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    loadPreviousStock = (data: any) => {
        return this.http.post(this.url + '/warehouse/loadPreviousStock', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    addIncomingStock = (data: any) => {
        return this.http.post(this.url + '/warehouse/addIncomingStock', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


    loadstockbyBycartegories = (data: any) => {
        return this.http.post(this.url + '/warehouse/loadstockbyBycartegories', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


loadallStock_for_category = (data: any) => {
        return this.http.post(this.url + '/warehouse/loadallStock_for_category', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


    
    loadstockHistory = (data: any) => {
        return this.http.post(this.url + '/warehouse/loadstockHistory', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    createControl = (data: any) => {
        return this.http.post(this.url + '/warehouse/createControl', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    loadControls = () => {
        return this.http.get(this.url + '/warehouse/loadControls', { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    
    transfert_To_stores = (data: any) => {
        return this.http.post(this.url + '/warehouse/tostoretransfer', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


    loadstockcontrol = () => {
        return this.http.get(this.url + '/warehouse/loadstockcontrol', { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    loadstockcontrolforwarehouse = () => {
        return this.http.get(this.url + '/warehouse/loadstockcontrolforwarehouse', { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    
 loadstores = () => {
        return this.http.get(this.url + '/warehouse/loadstores', { headers: new HttpHeaders().set('contentType', "application/json") })
    }


 loadwarehouses = () => {
        return this.http.get(this.url + '/warehouse/loadwarehouses', { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    
  submitToStore=(data:any)=>{
  return this.http.post(this.url + '/warehouse/transfertostores', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  }  

  loadInitialRequest=(data:any)=>{
    console.log(data)
     return this.http.post(this.url + '/warehouse/loadInitialRequest', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  }
  approveRequest=(data:any)=>{
     return this.http.post(this.url + '/warehouse/approveRequest', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  }

    transfer_to_Warehouse=(data:any)=>{
  return this.http.post(this.url + '/warehouse/transfer_to_Warehouse', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  }  

    loadWarehouseRequest=(data:any)=>{
    console.log(data)
     return this.http.post(this.url + '/warehouse/loadWarehouseRequest', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  }

    warehouseRequeastapproval=(data:any)=>{
     return this.http.post(this.url + '/warehouse/warehouseRequeastapproval', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  }


     returnstockcontrols=()=>{
     return this.http.get(this.url + '/warehouse/returnstockcontrols',{ headers: new HttpHeaders().set('contentType', "application/json") })
  }
  
  loadStoreProduct_for_selected_store=(data:any)=>{
    return this.http.post(this.url + '/warehouse/loadStoreProduct_for_selected_store',{ headers: new HttpHeaders().set('contentType', "application/json") })
  }
}
