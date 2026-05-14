import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // --- DYNAMIC ROUTES (Must be Server rendered) ---
  {
    path: 'home/auth/:uac',
    renderMode: RenderMode.Server
  },
  {
    path: 'home/redirect-user/:uacp',
    renderMode: RenderMode.Server
  },
  {
    path: 'admhome/store-manager/:uac',
    renderMode: RenderMode.Server
  },
  // --- STATIC ROUTES (Can be Prerendered) ---
  {
    path: 'home/sign-up',
    renderMode: RenderMode.Prerender
  },


  // --- FALLBACK / WILDCARD ---
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
