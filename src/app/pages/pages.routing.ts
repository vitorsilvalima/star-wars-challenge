import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages.component';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    component: PagesComponent,
    path: 'pages'
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
