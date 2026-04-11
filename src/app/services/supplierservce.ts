import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Supplierservce {
     url = environment.apiUrl;
    constructor(private http: HttpClient) { }

listProducts=()=>{

      return this.http.post(this.url + '/supplier/listproductsofsuppliers',{ headers: new HttpHeaders().set('contentType', "application/json") })
    
}
savePrice=(data:any)=>{
   return this.http.post(this.url + '/supplier/saveprice',data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}

deletePrice=(data:any)=>{
  return this.http.post(this.url + '/supplier/deleteprice',data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}
}
