export interface StoreListInterface {
    storenumber: string,
    storename: string,
    storetype: string,
    storelacation: string,
    digitaladdress: string,
    storedescription: string,
    dateposted: string,
    isstoreopened: string,
    storeidentityname: string
}
export interface Storeinterface {
    storeIdentityid: string,
    storeIdentityname: string,
    storeidenetitydesc: string,
    dateposeted: string,
    authstore: string
}
export interface Store {
    storenumber: string,
    storename: string,
    storetype: string,
    storelacation: string,
    digitaladdress: string,
    storedescription: string,
    dateposted: string,
    isstoreopened: string,
}
export interface Control {
    controlid: string,
    controlname: string,
    dateposted: string,
    details: string,
    status: string,
}
export interface ReceivedStock {
    stock_to_storeid: string,
    stockoperationid: string,
    from_warehouse_id: string,
    warehousename: string,
    store_id: string,
    received_productid: string,
    name: string,
    store_request_id: string,
    quantity_requested: string,
    date_received: string,
    received_details: string,
    approve_receipt: string,
    warehouse_stock_id: string,
    received_brand: string,
    title: string,
    quantity_received: string

}
export interface StoreProducts {
    product_number: string,
    store_type: string,
    product_category: string,
    date_created: string,
    details: string,
    isopened: string,
    store_number: string,
}

export interface Request {
    product_number: string,
    brand_number: string,
    cartegory: string,
    request_number: string,
    quantity: string,
    store_number: string,
    date_resquested: string,
    is_submitted: string,
    request_approved: string,
    date_approved: string,
    name: string, 
    title: string,
    decription:string
}

export interface stockBalanceData{
    product_number:string,
    product_brand:string,
    store_number:string, 
    avaible_quantity:string,
    quantity_sold:string,
    stock_balance:string, 
    is_current:string,
    date_posted:string,
    new_quantity:string,
    name:string, 
    title:string
}