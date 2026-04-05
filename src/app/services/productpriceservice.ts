import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Productpriceservice {
   url = environment.apiUrl;
    constructor(private http: HttpClient) { }

  savePrice=(data:any)=>{
    console.log(data)
     return this.http.post(this.url + '/prices/addprice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }
  getpriceTagDetails=()=>{

    return this.http.get(this.url + '/prices/priceTagdetails',{ headers: new HttpHeaders().set('contentType', "application/json") })
}  

loadproductPrices=()=>{

      return this.http.get(this.url + '/prices/pricedetails',{ headers: new HttpHeaders().set('contentType', "application/json") })
}
searchproductPrices=(data:any)=>{
  console.log('Searching prices')
     return this.http.post(this.url + '/prices/searchproductprices',data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}

listcategory=()=>{
       return this.http.get(this.url + '/prices/listcategory',{ headers: new HttpHeaders().set('contentType', "application/json") })
}

searchproductBycategory=(data:any)=>{

     return this.http.post(this.url + '/prices/searchproductpricesbyCategory',data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}

listPricebytag=()=>{

     return this.http.get(this.url + '/prices/listPricebytag',{ headers: new HttpHeaders().set('contentType', "application/json") })
}
searchPricesbyTag=(data:any)=>{
  return this.http.post(this.url + '/prices/searchPricesbyTag',data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}
}
