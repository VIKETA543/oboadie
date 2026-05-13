import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'home/auth/:uac',
    renderMode: RenderMode.Server // This tells Angular NOT to prerender this at build time
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
