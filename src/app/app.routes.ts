import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { rolGuard } from './shared/guards/rol.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/layout.page'),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page')
      },
      {
        path: 'privacy',
        loadComponent: () => import('./pages/privacy/privacy.page')
      },
      {
        path: 'login',
        loadComponent: () => import('./pages/login/login.page'),
        canMatch: [authGuard]
      },
      {
        path: 'signup',
        loadComponent: () => import('./pages/signup/signup.page'),
        canMatch: [authGuard]
      },
      {
        path: 'feedback',
        loadComponent: () => import('./pages/feedback/feedback.page'),
        canMatch: [authGuard, rolGuard]
      },
      {
        path: 'messages',
        loadComponent: () => import('./pages/messages/messages.page'),
        canMatch: [authGuard]
      },
      {
        path: 'profile',
        loadComponent: () => import('./pages/profile/profile.page'),
        canMatch: [authGuard, rolGuard]
      },
      {
        path: '',
        redirectTo: "home",
        pathMatch: "full"
      },
    ]
  },

  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },

];
