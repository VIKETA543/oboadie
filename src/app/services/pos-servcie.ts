import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})


export class PosServcie {
  url = environment.apiUrl;
  constructor(private http: HttpClient) {

  }

  getAllproducts=()=>{
     return this.http.get(this.url + '/pos/getAllproducts', { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  getTemp=(data:any)=>{
   return this.http.post(this.url + '/pos/loadTempSales',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  AddCart=(data:any)=>{
   return this.http.post(this.url + '/pos/AddCart',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }
  submitInvoice=(data:any)=>{
       return this.http.post(this.url + '/pos/submitInvoice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }
  
  openInvoice=(data:any)=>{
     return this.http.post(this.url + '/pos/openInvoice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }



  // Credit purchase routes

  
  getCreditTemp=(data:any)=>{
   return this.http.post(this.url + '/pos/loadcreditTempSales',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  AddCreditCart=(data:any)=>{
   return this.http.post(this.url + '/pos/AddcreditCart',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }
  submitCreditInvoice=(data:any)=>{
       return this.http.post(this.url + '/pos/submitcreditInvoice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }
  
  openOpenInvoice=(data:any)=>{
     return this.http.post(this.url + '/pos/opencreditInvoice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  // setting profoma routes

  
  profomatemp=(data:any)=>{
   return this.http.post(this.url + '/profoma/promomatemp',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  profomacart=(data:any)=>{
   return this.http.post(this.url + '/profoma/profomacart',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }
  profomainvoice=(data:any)=>{
       return this.http.post(this.url + '/profoma/profomainvoice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }
  
  submit_profoma_Invoice=(data:any)=>{

     return this.http.post(this.url + '/profoma/submit_profoma_Invoice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  loadInvoiceQuote=(data:any)=>{
   console.log('Loading invoice quote with data:', data)
   
     return this.http.post(this.url + '/pos/loadInvoiceQuote', data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

   makePayment=(data:any)=>{
       return this.http.post(this.url + '/pos/makePayment', data, { headers: new HttpHeaders().set('contentType', "application/json") })
   }

   loadPaymentReceipt=(data:any)=>{
 return this.http.post(this.url + '/pos/loadPaymentReceipt', data, { headers: new HttpHeaders().set('contentType', "application/json") })
   }

    makeCreditPayment=(data:any)=>{
       return this.http.post(this.url + '/pos/makecreditpayment', data, { headers: new HttpHeaders().set('contentType', "application/json") })
   }
   loadCreditPaymentReceipt=(data:any)=>{
         return this.http.post(this.url + '/pos/loadCreditPaymentReceipt', data, { headers: new HttpHeaders().set('contentType', "application/json") })
   }

   loadcreditInvoices=(data:any)=>{
         return this.http.post(this.url + '/pos/loadcreditInvoices', data, { headers: new HttpHeaders().set('contentType', "application/json") })
   }

   
}
