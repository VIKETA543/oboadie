export interface Customers{
    customer_number:string,
    dateposted:Date,
    is_verified:boolean,
    customername:string,
    telephone:string,
    emailadress:string,
    addresss:string,
    mobile_number:string,
    customertype:string,
    remarks:string
}
export interface accountData{
   accountnumber:string,
   customername:string,
   date:Date,
   is_verified:boolean,
   telephone:string,
   emailaddress:string,
   address:string,
   mobile_number:string,
   remarks:string,
   isopened:boolean,
   ghanacardnumber:string,
   passportpicture:string,
   ghanacardimage:string
}
export interface DepositSummary{
 accountNumber:string,
 transaction_number:string,
 transaction_date:Date,
 credit:number,
 balance:number,
 iscurrent:boolean
 widrawal:number
}
