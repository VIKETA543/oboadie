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

    load_invoice_for_update=(data:any)=>{
   return this.http.post(this.url + '/pos/load_invoice_for_update',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  verify_invoice=(data:any)=>{
   return this.http.post(this.url + '/pos/verify_invoice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

verify_credit_invoice=(data:any)=>{
   return this.http.post(this.url + '/pos/verify_credit_invoice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  
    load_credit_invoice_for_update=(data:any)=>{
   return this.http.post(this.url + '/pos/load_credit_invoice_for_update',data, { headers: new HttpHeaders().set('contentType', "application/json") })
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

   removePurchase=(data:any)=>{
       return this.http.post(this.url + '/pos/removepurchase', data, { headers: new HttpHeaders().set('contentType', "application/json") }) 
   }

  remove_credit_urchase=(data:any)=>{
       return this.http.post(this.url + '/pos/remove_credit_purchase', data, { headers: new HttpHeaders().set('contentType', "application/json") }) 
   }



   
   getAllinvoice=()=>{
       return this.http.post(this.url + '/pos/getAllinvoice', { headers: new HttpHeaders().set('contentType', "application/json") }) 
   }

    getAll_CREDIT_invoice=()=>{
       return this.http.post(this.url + '/pos/getAll_CREDIT_invoice', { headers: new HttpHeaders().set('contentType', "application/json") }) 
   }

   
    prepared_invoices=(data:any)=>{
       return this.http.post(this.url + '/pos/prepared_cash_invoices', data, { headers: new HttpHeaders().set('contentType', "application/json") }) 
   }

     prepared_credit_invoices=(data:any)=>{
       return this.http.post(this.url + '/pos/prepared_credit_invoices', data, { headers: new HttpHeaders().set('contentType', "application/json") }) 
   }


       join_credit_cash_salse=(data:any)=>{
       return this.http.post(this.url + '/pos/join_credit_cash_salse', data, { headers: new HttpHeaders().set('contentType', "application/json") }) 
   }


}
