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

  userredentials=()=>{

  return this.http.get(this.url + '/user/userredentials', { headers: new HttpHeaders().set('contentType',  "application/json") });
  }


    submitUac=(data:any)=>{

  return this.http.post(this.url + '/user/submitUac',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
  }

    applyUpdate=(data:any)=>{

  return this.http.post(this.url + '/user/applyUpdate',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
  }
  

    authrole=(data:any)=>{

  return this.http.post(this.url + '/user/authrole',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
  }
  getUser=(data:any)=>{
      return this.http.post(this.url + '/user/loadUserInformation',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
  }


    resetPassword=(data:any)=>{
      return this.http.post(this.url + '/user/resetPassword',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
  }

  
    listusers=()=>{
      return this.http.get(this.url + '/user/listusers', { headers: new HttpHeaders().set('contentType',  "application/json") });
  }

  setUserAutoLogin=(data:any)=>{
      return this.http.post(this.url + '/user/setUserAutoLogin',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
  }

 onAccess=(data:any)=>{
      return this.http.post(this.url + '/user/onAccess',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
  }

 onApproval=(data:any)=>{
      return this.http.post(this.url + '/user/onApproval',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
  }

  
onDeleteUser=(data:any)=>{
      return this.http.post(this.url + '/user/onDeleteUser',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
  }

 loadStores=()=>{
    return this.http.get(this.url + '/user/loadStores', { headers: new HttpHeaders().set('contentType',  "application/json") });
 } 

 addStore=(data:any)=>{
    return this.http.post(this.url + '/user/addStore',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
 } 


  unlinkStore=(data:any)=>{
    return this.http.post(this.url + '/user/unlinkStore',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
 } 

  authAccount=(data:any)=>{
    return this.http.post(this.url + '/user/authAccount',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
 } 

   declineAccess=(data:any)=>{
    return this.http.post(this.url + '/user/declineAccess',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
 } 
 loadUserStores=(data:any)=>{
    return this.http.post(this.url + '/user/loadUserStores',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
 }

  replaceStore=(data:any)=>{
    return this.http.post(this.url + '/user/replaceStore',data, { headers: new HttpHeaders().set('contentType',  "application/json") });
 }

}
