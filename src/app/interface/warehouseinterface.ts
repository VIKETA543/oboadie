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