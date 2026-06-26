import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class StoreService {
      url = environment.apiUrl;
  constructor(private http:HttpClient){

  }

    saveStoreIdentity = (data: any) => {
   
        return this.http.post(this.url + '/stores/addStoretype', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


  
    liststoretypes = () => {
  
        return this.http.get(this.url + '/stores/liststoretypes', { headers: new HttpHeaders().set('contentType', "application/json") })
    }
  saveStore=(data:any)=>{
   return this.http.post(this.url + '/stores/savestore', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  }
  
  receive_stock=(data:any)=>{
return this.http.post(this.url + '/stores/receive_stock', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  }


 poststocksummeries=(data:any)=>{
return this.http.post(this.url + '/stores/poststocksummeries', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
  }

  listallStores=()=>{
    return this.http.get(this.url + '/stores/listallStores', { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  pushProductToStore = (data: any) => {
        return this.http.post(this.url + '/stores/pushProductToStore', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


      listAllProducts = (data: any) => {
        return this.http.post(this.url + '/stores/listAllProducts', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }


      dropStoreproduct = (data: any) => {
        return this.http.post(this.url + '/stores/dropStoreproduct', data, { headers: new HttpHeaders().set('contentType', "application/json") })
    }
    
authStoreType=(data:any)=>{
   return this.http.post(this.url + '/stores/authStoreType', data, { headers: new HttpHeaders().set('contentType', "application/json") })
}

    
droptType=(data:any)=>{
   return this.http.post(this.url + '/stores/droptType', data, { headers: new HttpHeaders().set('contentType', "application/json") })
}


loadStoreRecivedStock=()=>{
   return this.http.post(this.url + '/stores/loadStoreRecivedStock', { headers: new HttpHeaders().set('contentType', "application/json") })
}

loadsalseforVerification=(data:any)=>{
   return this.http.post(this.url + '/stores/loadsalseforVerification', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}

submitProductVerification=(data:any)=>{
   return this.http.post(this.url + '/stores/submitProductVerification', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}


submit_credit_for_verification=(data:any)=>{
   return this.http.post(this.url + '/stores/submit_credit_for_verification', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}



closeInVoice=(data:any)=>{
   return this.http.post(this.url + '/stores/closeInVoice', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}



creditVerification=(data:any)=>{
   return this.http.post(this.url + '/stores/load_for_credit_verification', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}

closeCreditInVoice=(data:any)=>{
   return this.http.post(this.url + '/stores/closeCreditInVoice', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}

load_store_request=(data:any)=>{
    return this.http.post(this.url + '/stores/load_store_request', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}

submitReques=(data:any)=>{
    return this.http.post(this.url + '/stores/submitReques', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}



addmoreProducts=(data:any)=>{
    return this.http.post(this.url + '/stores/addmoreProducts', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}




find_store_request=(data:any)=>{
    return this.http.post(this.url + '/stores/find_store_request', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}

dropRequest=(data:any)=>{
    return this.http.post(this.url + '/stores/dropRequest', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}


findPending=(data:any)=>{
    return this.http.post(this.url + '/stores/findPending',data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}

dropRequest_Item=(data:any)=>{
    return this.http.post(this.url + '/stores/dropRequest_Item',data,{ headers: new HttpHeaders().set('contentType', "application/json") })
}

loadUnsubmitted=(data:any)=>{
  return this.http.post(this.url + '/stores/loadUnsubmitted', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
   
}
load_selected_Unsubmitted=(data:any)=>{
  return this.http.post(this.url + '/stores/load_selected_Unsubmitted', data,{ headers: new HttpHeaders().set('contentType', "application/json") })
   
}

submitRequest=(data:any)=>{
   return this.http.post(this.url + '/stores/submitRequest', data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}

findPendingItem=(data:any)=>{
   return this.http.post(this.url + '/stores/findPendingItem', data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}

warehouseLoad_Request=(data:any)=>{
   return this.http.post(this.url + '/stores/warehouserequestload',data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}

warehouserequestloadbyrequestnumber=(data:any)=>{
   return this.http.post(this.url + '/stores/warehouserequestloadbyrequestnumber',data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}


requestHistory=(data:any)=>{
   return this.http.post(this.url + '/stores/requestHistory',data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}

loadcurrentStocklevel=(data:any)=>{
   return this.http.post(this.url + '/stores/loadcurrentStocklevel',data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}


loadtransactions=(data:any)=>{
   return this.http.post(this.url + '/stores/loadtransactions',data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}


liststoreproduct_dtock=(data:any)=>{
   return this.http.post(this.url + '/stores/liststoreproduct',data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}


savePrice=(data:any)=>{
   return this.http.post(this.url + '/stores/liststoreproduct',data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}

dropPush=(data:any)=>{
   return this.http.post(this.url + '/stores/dropPush',data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}

from_storemanager_to_Store=(data:any)=>{
   return this.http.post(this.url + '/stores/from_storemanager_to_Store',data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}



authoriseStore=(data:any)=>{
   return this.http.post(this.url + '/stores/authoriseStore',data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}

dropStore=(data:any)=>{
   return this.http.post(this.url + '/stores/dropStore',data,{ headers: new HttpHeaders().set('contentType', "application/json") }) 
}

 daily_verified_invoice=(data:any)=>{
   return this.http.post(this.url + '/stores/daily_verified_invoice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

   join_credit_cash_salse=(data:any)=>{

       return this.http.post(this.url + '/stores/join_credit_cash_sale', data, { headers: new HttpHeaders().set('contentType', "application/json") }) 
   }

 join_credit_cash_sale_store_unverified=(data:any)=>{

       return this.http.post(this.url + '/stores/join_credit_cash_sale_store_unverified', data, { headers: new HttpHeaders().set('contentType', "application/json") }) 
   }


   
verify_credit_invoice=(data:any)=>{
   return this.http.post(this.url + '/stores/verify_credit_invoice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

   prepared_credit_invoices=(data:any)=>{
 return this.http.post(this.url + '/stores/prepared_credit_invoices', data, { headers: new HttpHeaders().set('contentType', "application/json") }) 
   }

 prepared_invoices=(data:any)=>{
       return this.http.post(this.url + '/stores/prepared_cash_invoices', data, { headers: new HttpHeaders().set('contentType', "application/json") }) 
   }
verify_invoice=(data:any)=>{
   return this.http.post(this.url + '/stores/verify_invoice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  loadstoreProducts=(data:any)=>{
   return this.http.post(this.url + '/stores/loadstoreProducts',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  editPrice=(data:any)=>{
   return this.http.post(this.url + '/stores/editPrice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }



 loadpriceGroups=()=>{
   return this.http.post(this.url + '/stores/loadpriceGroups', { headers: new HttpHeaders().set('contentType', "application/json") })
  }
  

addUnitPrice=(data:any)=>{
   return this.http.post(this.url + '/stores/addUnitPrice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

 
  
addPackprice=(data:any)=>{
   return this.http.post(this.url + '/stores/addPackprice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  addCustomPriceprice=(data:any)=>{
   return this.http.post(this.url + '/stores/addcustomprice',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  
loadstoreprices=(data:any)=>{
   return this.http.post(this.url + '/stores/loadstoreprices',data, { headers: new HttpHeaders().set('contentType', "application/json") })
  }


loadAllprices=()=>{
   return this.http.post(this.url + '/stores/loadAllprices', { headers: new HttpHeaders().set('contentType', "application/json") })
  }

  
  
}
