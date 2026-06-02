import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
<<<<<<< HEAD
  // 1. THE WILDCARD
  // Everything else (like 'admhome/products') will be Prerendered
=======
>>>>>>> 7c2dee3 (02/06/2026@21:40)
  {
    path: '**',
    renderMode: RenderMode.Server
  }
];
