import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',

})
export class productservice {
    url = environment.apiUrl;
    constructor(private http: HttpClient) { }
    getProductsData() {
        return this.http.get(this.url + '/display/display', { headers: new HttpHeaders().set('contentType', "application/json") })

    }

      getTrendingData() {
        return this.http.get(this.url + '/display/trending', { headers: new HttpHeaders().set('contentType', "application/json") })

    }

 listproduct() {
        return this.http.get(this.url + '/display/listproduct', { headers: new HttpHeaders().set('contentType', "application/json") })

    }

listproductBycartID=(data:any)=>{
  return this.http.post(this.url + '/display/listproductbyCart', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}
    
    cartegories() {
        return this.http.get(this.url + '/display/cartegories', { headers: new HttpHeaders().set('contentType', "application/json") })

    }
    categoryList =() => {
        return this.http.get(this.url + '/category/cartlist', { headers: new HttpHeaders().set('contentType', "application/json") })
    }
    addCartgeory = (data: any) => {
        return this.http.post(this.url + '/category/addcart', data, { headers: new HttpHeaders().set('contentType', "multipart/form-data") })
    }
    dropCart = (data: any) => {
        return this.http.post(this.url + '/category/trashcart', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    clearRecords = () => {
        return this.http.post(this.url + '/category/clearrecords', { headers: new HttpHeaders().set('contentType', "application/json") })
    }
    addProduct=(data:any)=>{
                return this.http.post(this.url + '/category/addproduct', data, { headers: new HttpHeaders().set('contentType', "multipart/form-data") })
    }
addGroup=(data:any)=>{
       return this.http.post(this.url + '/category/addgroup', data, { headers: new HttpHeaders().set('contentType', "multipart/form-data") })
}
loadTargetgrpup=()=>{
     return this.http.get(this.url + '/category/gtgroup', { headers: new HttpHeaders().set('contentType', "application/json") })
}

loadSelectedGroup=(data:any)=>{
     return this.http.post(this.url + '/category/selgrp',data, { headers: new HttpHeaders().set('contentType', "application/json") })
}

dropGroup=(data:any)=>{
 return this.http.post(this.url + '/category/droptgrp', data, { headers: new HttpHeaders().set('contentType', "application/json") })
}


  loadBrandList =() => {
        return this.http.get(this.url + '/category/brndlist', { headers: new HttpHeaders().set('contentType', "application/json") })
    }

    loadBrandData=()=>{
     return this.http.get(this.url + '/category/brnddata', { headers: new HttpHeaders().set('contentType', "application/json") })
}

dropBrand=(data:any)=>{
 return this.http.post(this.url + '/category/dropbrnd', data, { headers: new HttpHeaders().set('contentType', "application/json") })
}
listBrand=()=>{
     return this.http.get(this.url + '/category/listbrnd',{ headers: new HttpHeaders().set('contentType', "application/json") })
}

listBrandByproductID=(data:any)=>{
     return this.http.post(this.url + '/category/listbrndbyID', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}
addBrand=(data:any)=>{
     return this.http.post(this.url + '/category/addbrnd',data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}
loadSelectedBrand=(data:any)=>{
     return this.http.post(this.url + '/category/selbrnd',data, { headers: new HttpHeaders().set('contentType', "application/json") })
}
listPrices=()=>{
    return this.http.get(this.url + '/category/listprices', { headers: new HttpHeaders().set('contentType', "application/json") }) 
}
listPriceTag=()=>{
     return this.http.get(this.url + '/category/listpriceTag', { headers: new HttpHeaders().set('contentType', "application/json") }) 
}
submitQuote=(data:any)=>{
    console.log(data)
    return this.http.post(this.url + '/category/submitquote', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}



dropPriceTag=(data:any)=>{
 return this.http.post(this.url + '/category/droppricetag',data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}
authTag=(data:any)=>{
   return this.http.post(this.url + '/category/authtag',data,{ headers: new HttpHeaders().set('contentType', "application/json") })  
}
}