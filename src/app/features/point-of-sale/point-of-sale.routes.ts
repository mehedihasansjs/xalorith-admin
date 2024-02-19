import { Routes } from '@angular/router';

export const pointOfSaleRoutes: Routes = [
  {
    path: 'terminal',
    title: 'Terminal',
    loadComponent: () => import('./terminal/terminal.component').then(c => c.TerminalComponent)
  },
  {
    path: '',
    redirectTo: 'terminal',
    pathMatch: 'full'
  }
];
