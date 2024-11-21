import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page'),
    children: [
      {
        path: 'privacy',
        loadComponent: () => import('./pages/privacy/privacy.page')
      },
    ]
  },

  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },

];
