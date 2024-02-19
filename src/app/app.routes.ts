import { Routes } from '@angular/router';
import { pointOfSaleRoutes } from './features/point-of-sale/point-of-sale.routes';

export const routes: Routes = [
  {
    path: 'pos',
    title: 'Point of Sale',
    children: pointOfSaleRoutes
  },
  {
    path: '',
    redirectTo: 'pos',
    pathMatch: 'full'
  }
];
