import { Routes } from '@angular/router';
import { Admhome } from './admin/admhome/admhome';
import { Home } from './home/home';
import path from 'path';
import { Addcartegory } from './admin/addcartegory/addcartegory';
import { Products } from './admin/products/products';
import { Targetgroup } from './admin/targetgroup/targetgroup';
import { Productbrand } from './admin/productbrand/productbrand';
import { Pricing } from './pricing/pricing';
import { Supplierprices } from './admin/supplierprices/supplierprices';
import { Wearhousemanager } from './wearhousemanager/wearhousemanager';
import { StoreManager } from './store-manager/store-manager';
import { StoreReceiveStock } from './store-manager/store-receive-stock/store-receive-stock';
import { NewStore } from './store-manager/new-store/new-store';
import { StoreType } from './store-manager/store-type/store-type';
import { MainStores } from './stores/main-stores/main-stores';
import { Stockreceived } from './stores/stockreceived/stockreceived';
import { PointOfSale } from './pos/point-of-sale/point-of-sale';
import { PosPanager } from './pos/pos-panager/pos-panager';
import { CreateProducts } from './stores/create-products/create-products';
import { ProductCategory } from './stores/product-category/product-category';
import { CashSales } from './pos/cash-sales/cash-sales';
import { CreateCustomer } from './crm/create-customer/create-customer';
import { CrmManager } from './crm/crm-manager/crm-manager';
import { CreditSales } from './pos/credit-sales/credit-sales';
import { ProfomaInvoice } from './profoma/profoma-invoice/profoma-invoice';
import { NewProfoma } from './profoma/new-profoma/new-profoma';
import { DepositManager } from './Deposits/deposit-manager/deposit-manager';
import { NewDeposit } from './Deposits/new-deposit/new-deposit';
import { DepositAccounts } from './Deposits/deposit-accounts/deposit-accounts';
import { CreateAccount } from './Deposits/create-account/create-account';
import { DepositDetails } from './Deposits/deposit-details/deposit-details';
import { Withdraw } from './Deposits/withdraw/withdraw';
import { CashManager } from './cashier/cash-manager/cash-manager';
import { CashPayments } from './cashier/cash-payments/cash-payments';
import { ScannerPayment } from './cashier/scanner-payment/scanner-payment';
import { MobileScanner } from './cashier/mobile-scanner/mobile-scanner';
import { ManualVerification } from './cashier/manual-verification/manual-verification';
import { PayCredit } from './cashier/pay-credit/pay-credit';
import { VerifyCashSales } from './stores/verify-cash-sales/verify-cash-sales';
import { VerifyCreditSales } from './stores/verify-credit-sales/verify-credit-sales';
import { VerifySales } from './stores/verify-sales/verify-sales';
import { SecurityManager } from './userAuth/security-manager/security-manager';
import { UACGenerator } from './userAuth/uacgenerator/uacgenerator';
import { DepartmentHook } from './userAuth/department-hook/department-hook';
import { SignUp } from './userAuth/sign-up/sign-up';
import { UserLogin } from './userAuth/user-login/user-login';
import { Auth } from './userAuth/auth/auth';
import { RedirectUser } from './userAuth/redirect-user/redirect-user';





export const routes: Routes = [
    {

        path: 'admhome', component: Admhome, children: [
            {
                path: 'security-manager', component: SecurityManager, children: [
                    { path: 'uacgenerator', component: UACGenerator },
                    { path: 'department-hook', component: DepartmentHook }
                ]
            },
            { path: 'addcartegory', component: Addcartegory },
            { path: 'products', component: Products },
            { path: 'targetgroup', component: Targetgroup },
            { path: 'productbrand', component: Productbrand },
            { path: 'pricing', component: Pricing },
            { path: 'supplierprices', component: Supplierprices },
            { path: 'wearhousemanager', component: Wearhousemanager },
            {
                path: 'crm-manager', component: CrmManager, children: [
                    { path: 'create-customer', component: CreateCustomer }
                ]
            },
            {
                path: 'main-stores', component: MainStores, children: [
                    { path: 'store-receive-stock', component: StoreReceiveStock },
                    { path: 'stockreceived', component: Stockreceived },
                    { path: 'create-products', component: CreateProducts },
                    { path: 'product-category', component: ProductCategory },
                    {
                        path: 'verify-sales', component: VerifySales, children: [
                            { path: 'verify-cash-sales', component: VerifyCashSales },
                            { path: 'verify-credit-sales', component: VerifyCreditSales }
                        ]
                    },
                    { path: 'productbrand', component: Productbrand },

                ]
            },
            {
                path: 'store-manager/:uac', component: StoreManager, children: [
                    { path: 'store-receive-stock', component: StoreReceiveStock },
                    { path: 'new-store', component: NewStore },
                    { path: 'store-type', component: StoreType },
                    { path: 'create-products', component: CreateProducts },
                    { path: 'product-category', component: ProductCategory },

                ]
            },
            { path: 'pos-panager', component: PosPanager },
            {
                path: 'point-of-sale', component: PointOfSale, children: [
                    { path: 'cash-sales', component: CashSales },
                    { path: 'credit-sales', component: CreditSales },
                    { path: 'new-deposit', component: NewDeposit },
                    { path: 'create-account', component: CreateAccount },
                    {
                        path: 'profoma-invoice', component: ProfomaInvoice, children: [
                            { path: 'new-profoma', component: NewProfoma }
                        ]
                    },
                    {
                        path: 'crm-manager', component: CrmManager, children: [
                            { path: 'create-customer', component: CreateCustomer },

                        ]
                    }
                ]
            },
            {
                path: 'deposit-manager', component: DepositManager, children: [
                    {
                        path: 'new-deposit', component: NewDeposit, children: [
                            { path: 'create-customer', component: CreateCustomer }
                        ]
                    },
                    { path: 'deposit-accounts', component: DepositAccounts },
                    { path: 'create-account', component: CreateAccount },
                    { path: 'deposit-details', component: DepositDetails },
                    { path: 'withdraw', component: Withdraw }
                ]

            },
            {
                path: 'cash-manager', component: CashManager, children: [
                    {
                        path: 'cash-payments', component: CashPayments, children: [
                            { path: 'scanner-payment', component: ScannerPayment },
                            { path: 'mobile-scanner', component: MobileScanner },
                            { path: 'manual-verification', component: ManualVerification }
                        ]
                    },
                    { path: 'pay-credit', component: PayCredit }
                ]
            },

            { path: '', redirectTo: 'admhome', pathMatch: 'full' }
        ]
    },
    {
        path: 'main-stores', component: MainStores, children: [
            { path: 'store-receive-stock', component: StoreReceiveStock },
            { path: 'stockreceived', component: Stockreceived },
            { path: 'create-products', component: CreateProducts },
            { path: 'product-category', component: ProductCategory },
             { path: 'productbrand', component: Productbrand },
            {
                path: 'verify-sales', component: VerifySales, children: [
                    { path: 'verify-cash-sales', component: VerifyCashSales },
                    { path: 'verify-credit-sales', component: VerifyCreditSales }
                ]
            },

        ]
    },

        {
                path: 'point-of-sale', component: PointOfSale, children: [
                    { path: 'cash-sales', component: CashSales },
                    { path: 'credit-sales', component: CreditSales },
                    { path: 'new-deposit', component: NewDeposit },
                    { path: 'create-account', component: CreateAccount },
                    {
                        path: 'profoma-invoice', component: ProfomaInvoice, children: [
                            { path: 'new-profoma', component: NewProfoma }
                        ]
                    },
                    {
                        path: 'crm-manager', component: CrmManager, children: [
                            { path: 'create-customer', component: CreateCustomer },

                        ]
                    }
                ]
            },
    {
        path: 'home', component: Home, children: [
            { path: 'sign-up', component: SignUp },
            { path: 'user-login', component: UserLogin },
            { path: 'auth/:uac', component: Auth },
            { path: 'redirect-user/:uacp', component: RedirectUser }
        ]
    },

    { path: '', redirectTo: 'home', pathMatch: 'full' }
    //  { path: '', redirectTo: 'admhome', pathMatch: 'full' }

];
