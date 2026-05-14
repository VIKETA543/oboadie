import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
 {
  path: 'home/redirect-user/:uacp', // Add the comma here
  renderMode: RenderMode.Server
}
  {
    path: 'admhome/store-manager/:uac',
    renderMode: RenderMode.Server
  },{
    'home/redirect-user/:uacp',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
