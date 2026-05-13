import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class Departments {
  url = environment.apiUrl;
    constructor(private http: HttpClient) {
  
    }

  submitNewDepartment=(data:any)=>{

         return this.http.post(this.url + '/departments/submitNewDepartment', data, { headers: new HttpHeaders().set('contentType', "application/json") })
  
  }
  getDepartments=()=>{
         return this.http.post(this.url + '/departments/getDepartments', { headers: new HttpHeaders().set('contentType', "application/json") })
  }
}
