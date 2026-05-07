import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Crmservice {

   url = environment.apiUrl;
  constructor(private http: HttpClient) {

  }
  customerIsSaved=signal(false)
  customerNumber:any
isCustomerSaved(){
  return this.customerIsSaved();
}
setCustomerSaved(isSaved:boolean){
  return  this.customerIsSaved.set(isSaved)
}
  addCustomer=(data:any)=>{
      return this.http.post(this.url + '/crm/addCustomer',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }
  loadcustomers=()=>{
          return this.http.get(this.url + '/crm/loadcustomers', { headers: new HttpHeaders().set('contentType', "application/json") })
  }
  getCustomerNumber=()=>{
  return this.customerNumber;  
  }


  setCustomerNumber=(customer:any)=>{
      return this.customerNumber=customer;  
  }

  loadaccount=(data:any)=>{
          return this.http.post(this.url + '/crm/loadaccount', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  }


   postDesposit=(data:any)=>{
          return this.http.post(this.url + '/crm/postDesposit', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  } 


   getDepositAccounts=()=>{
          return this.http.post(this.url + '/crm/getDepositAccounts',{ headers: new HttpHeaders().set('contentType', "application/json") })
  } 
  

  postAccount(data:any) {
    console.log(data)
    return this.http.post(this.url + '/crm/postAccount', data, { headers: new HttpHeaders().set('contentType', "application/json") });
  }

 uplaodIdCard(data:any) {
    console.log(data)
    return this.http.post(this.url + '/crm/uplaodIdCard', data, { headers: new HttpHeaders().set('contentType',  "multipart/form-data") });
  }
 uploadpassport(data:any) {
    console.log(data)
    return this.http.post(this.url + '/crm/uploadpassport', data, { headers: new HttpHeaders().set('contentType',  "multipart/form-data") });
  }
  
 loadDepositSummeries() {
    return this.http.get(this.url + '/crm/loadDepositSummeries', { headers: new HttpHeaders().set('contentType',  "application/json") });
  }
  
 postWithdrawal(data:any) {
    return this.http.post(this.url + '/crm/postWithdrawal', data,{ headers: new HttpHeaders().set('contentType',  "application/json") });
  }

  
}
