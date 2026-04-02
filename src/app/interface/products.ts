export interface ProductsList {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}



export interface ProductsTrends {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    price?: number;
    quantity?: number;
    inventoryStatus?: string;
    category?: string;
    image?: string;
    rating?: number;
}
export interface ProductCategory {
    serialnumber: string
    category_name: string
    image: string;
    imageurl:string

}
export interface CategoryList {
    serial: string
    category: string
    description: string
    image: string
    Reviews: string
    Status: string
    date: string,
    url:string,
    Action:any
}
export interface Group{
   category_name:string, 
   title:string,
   role:string,
   productcart:string
   imageurl:string,
   image:string,
   groupid:string,
   date_created:string
}
export interface TargetGroup{
   title:string,
   role:string,
   imageurl:string,
   image:string,
   groupid:string,
}
export interface Brand{
   brandid:string, 
   title:string,
   role:string,
   image:string
   productcart:string,
   date_created:string,
   imageurl:string,
   category_name:string
}
export interface Prices{
    
}
export interface PriceTag{
    no:number,
    priceid:string,
    pricetag:string,
    peicequote:number,
    dateAdded:string,
    description:string,
    auth:boolean
}
export interface PriceData{
    productid:string,
    name:string,
    category:string,
    category_name:string,
    brand:string,
    title:string,
    targetgroup:string,
    grouptitle:string,
    price:number,
    priceid:string
}

