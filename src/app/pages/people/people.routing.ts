import { PeopleListComponent } from './people-list/people-list.component';
import { PeopleComponent } from './people.component';
import { ModuleWithProviders } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {
    component: PeopleComponent,
    path: '',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'list' }
      { path: 'list', component: PeopleListComponent },
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
