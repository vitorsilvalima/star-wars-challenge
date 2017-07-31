import { ModuleWithProviders } from '@angular/core';
import { PagesComponent } from './pages.component';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    component: PagesComponent,
    path: 'pages',
    children: [
      {
        path: '',
        redirectTo: 'people',
        pathMatch: 'full'
      },
      {
        path: 'people',
        loadChildren: './people/people.module#PeopleModule'
      },
      {
        path: 'about',
        loadChildren: './about/about.module#AboutModule'
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
