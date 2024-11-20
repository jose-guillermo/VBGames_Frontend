import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page')
  },
  {
    path: 'privacy',
    loadComponent: () => import('./pages/privacy/privacy.page')
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];
