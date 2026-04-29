export interface Warehouseinterface {
    serialnumber:string,
    identityid:string,
    name:string,
    location:string,
    digitaladdress:string,
    decription:string,
    date:string,
    isopened:string
}
    export interface Identity{
        id:string,
        name:string,
        desciption:string,
        date:Date,
        auth:boolean
    }
export interface StockControlInterface{
controlid:string,
controlname:string,
dateposted:string,
details:string,
status:string
}

export interface Cartegory{
    cartegoryid:string,
    cartegoryname:string
}

export interface Product{
    productid:string,
    productname:string
}

// export interface Brand{
//     BrandId:string,
//     Brandname:string
// }
export interface stockBrand{
 brandid:string,
    Brandname:string
}
export interface IncomingDataInterface{
cartegory: string,
dateopened:string,
details:string,
identityid:string,
isopened:boolean,
name: string,
productid: string,
warehouseid:string,
whse_stockid: string,
}
export interface Stockbycategories{
     warehouseproductstockid:string,
    productstockcartegory: string,
    warehouseproductstckbrand: string,
    warehouseproductstockproductid:string,
    wareshouseproduct_current_quantity:number,
    datedopened:Date,
    dateclosed:Date,
    comments: string,
    isstockopemend: boolean,
    warehouse_stock_new_quantity:string,
    warehouse_stock_total_quantity:string,
    stocknumber:string,
    title:string,                              
    imageurl:string
}
export interface RequestApprovalData{
    stock_to_storeid: string
    stockoperationid: string
    from_warehouse_id:string
    store_request_id:string
    store_id: string
    withdrawn_productid: string
    drawal_quantity: number
    date_withdrawn: Date
    drawal_details: string
    isdrawn_stock_moved: boolean
    warehouse_stock_id: string
    withdrwanbrand: string
    warehousename: string
    controlname: string
    name: string
    title: string,
    storename:string
}

export interface WarehousetoWarehouse{
warehouse_transfer_id: string
    stockoperationid: string
    from_warehouse_id: string
    warehouse_request_id:string
    to_warehouse_id: string
    transfered_product_id: string
    transfered_quantity:number
    date_transfered: Date
    transfer_id:  string
    transfered_details: string
    is_transfered_stock_moved: boolean,
    warehouse_stock_id: string
    transfered_stock_brand: string
    warehousename:string
    controlname: string
    name: string
    title: string
    to_warehouse_name:string
}

