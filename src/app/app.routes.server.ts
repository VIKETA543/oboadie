import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // 1. DYNAMIC ROUTES (Handle IDs and Parameters)
  // We use RenderMode.Server because these depend on runtime data
  {
    path: 'home/auth/:uac',
    renderMode: RenderMode.Server
  },
  {
    path: 'home/redirect-user/:uacp',
    renderMode: RenderMode.Server
  },
  {
    // This handles the specific route that gave you the error
    path: 'admhome/store-manager/:uac/store-receive-stock',
    renderMode: RenderMode.Server
  },
  {
    // This is a "Catch-all" for any other store-manager sub-pages
    path: 'admhome/store-manager/:uac/**',
    renderMode: RenderMode.Server
  },

  // 2. STATIC ROUTES (Optional specific definitions)
  {
    path: 'home/user-login',
    renderMode: RenderMode.Server
  },

  // 3. THE WILDCARD
  // Everything else (like 'admhome/products') will be Prerendered
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
