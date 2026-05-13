import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Userservice {
  url=environment.apiUrl
  constructor(private http:HttpClient){}
  signup=(data:any)=>{

  return this.http.post(this.url + '/user/signup',data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}
  

 uplaodIdCard(data:any) {
    console.log(data)
    return this.http.post(this.url + '/user/uplaodIdCard', data, { headers: new HttpHeaders().set('contentType',  "multipart/form-data") });
  }
 uploadpassport(data:any) {
    console.log(data)
    return this.http.post(this.url + '/user/uploadpassport', data, { headers: new HttpHeaders().set('contentType',  "multipart/form-data") });
  }
  setPassword=(data:any)=>{
        return this.http.post(this.url + '/user/setpassword', data, { headers: new HttpHeaders().set('contentType',  "application/json") });
  }

  submitpassword=(data:any)=>{
       return this.http.post(this.url + '/user/submitpassword', data, { headers: new HttpHeaders().set('contentType',  "application/json") });
  }
  signIn=(data:any)=>{

  return this.http.post(this.url + '/user/signin', data, { headers: new HttpHeaders().set('contentType',  "application/json") });
  }
}
