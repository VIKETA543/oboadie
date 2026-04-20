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

export const routes: Routes = [
    {
        path: 'admhome', component: Admhome, children: [
            { path: 'addcartegory', component: Addcartegory },
            { path: 'products', component: Products },
            { path: 'targetgroup', component: Targetgroup },
            { path: 'productbrand', component: Productbrand },
            { path: 'pricing', component: Pricing },
            { path: 'supplierprices', component: Supplierprices },
            { path: 'wearhousemanager', component: Wearhousemanager },
            {path:'store-manager',component:StoreManager},

            { path: '', redirectTo: 'products', pathMatch: 'full' }
        ]
    },

    { path: 'home', component: Home },

    { path: '', redirectTo: 'home', pathMatch: 'full' }

];
