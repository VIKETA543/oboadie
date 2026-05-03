import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class StoreService {
      url = environment.apiUrl;
  constructor(private http:HttpClient){

  }

    saveStoreIdentity = (data: any) => {
   
        return this.http.post(this.url + '/stores/addStoretype', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


  
    liststoretypes = () => {
  
        return this.http.get(this.url + '/stores/liststoretypes', { headers: new HttpHeaders().set('contentType', "application/json") })
    }
  saveStore=(data:any)=>{
   return this.http.post(this.url + '/stores/savestore', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  }
  
  receive_stock=(data:any)=>{
return this.http.post(this.url + '/stores/receive_stock', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  }


 poststocksummeries=(data:any)=>{
return this.http.post(this.url + '/stores/poststocksummeries', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  }

  listallStores=()=>{
    return this.http.get(this.url + '/stores/listallStores', { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  pushProductToStore = (data: any) => {
        return this.http.post(this.url + '/stores/pushProductToStore', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


      listAllProducts = (data: any) => {
        return this.http.post(this.url + '/stores/listAllProducts', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


      dropStoreproduct = (data: any) => {
        return this.http.post(this.url + '/stores/dropStoreproduct', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }
    
authStoreType=(data:any)=>{
   return this.http.post(this.url + '/stores/authStoreType', data, { headers: new HttpHeaders().set('contentType', "application/json") })
}

    
droptType=(data:any)=>{
   return this.http.post(this.url + '/stores/droptType', data, { headers: new HttpHeaders().set('contentType', "application/json") })
}


loadStoreRecivedStock=()=>{
   return this.http.post(this.url + '/stores/loadStoreRecivedStock', { headers: new HttpHeaders().set('contentType', "application/json") })
}
}
