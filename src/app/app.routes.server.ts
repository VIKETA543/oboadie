import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
  path: 'admhome/store-manager/:uac/store-receive-stock',
  renderMode: RenderMode.Server // This fixes the error
},
  {
    path: 'admhome/store-manager/:uac/product-category',
     renderMode: RenderMode.Server // This fixes the error
  },
{
  path:  'admhome/store-manager/:uac/store-type',
      renderMode: RenderMode.Server // This fixes the error
},
{path: 'home/auth/:uac',
   renderMode: RenderMode.Server // This fixes the error
} 

];
