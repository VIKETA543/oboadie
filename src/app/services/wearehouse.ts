
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root',

})
export class Wearehouse {
       url = environment.apiUrl;
    constructor(private http: HttpClient) { }

    saveIsentuty=(data:any)=>{
      console.log(data)
   return this.http.post(this.url + '/warehouse/addidentity',data,{ headers: new HttpHeaders().set('contentType', "application/json") })  
}

listIdenties=()=>{
    return this.http.get(this.url + '/warehouse/listidentities',{ headers: new HttpHeaders().set('contentType', "application/json") })  
}

auth=(data:any)=>{
  return this.http.post(this.url + '/warehouse/auth',data,{ headers: new HttpHeaders().set('contentType', "application/json") })  
}
}
