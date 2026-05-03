import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class Crmservice {
   url = environment.apiUrl;
  constructor(private http: HttpClient) {

  }

  addCustomer=(data:any)=>{
      return this.http.post(this.url + '/crm/addCustomer',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }
  loadcustomers=()=>{
          return this.http.get(this.url + '/crm/loadcustomers', { headers: new HttpHeaders().set('contentType', "application/json") })
  }
}
