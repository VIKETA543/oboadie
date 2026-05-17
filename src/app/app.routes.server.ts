import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // 1. THE WILDCARD
  // Everything else (like 'admhome/products') will be Prerendered
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
