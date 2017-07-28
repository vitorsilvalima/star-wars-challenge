import { AppComponent } from './app.component';
import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pages/people',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'pages/people'
  }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
