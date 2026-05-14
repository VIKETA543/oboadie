import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
  path: 'admhome/store-manager/:uac',
  renderMode: RenderMode.Server
},
{path: 'home/auth/:uac',
   renderMode: RenderMode.Server
} ,
{ path: 'redirect-user/:uacp',
  renderMode: RenderMode.Server
}

];
