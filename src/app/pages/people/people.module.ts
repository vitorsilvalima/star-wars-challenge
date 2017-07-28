import { ProvidersModule } from './../../providers/providers.module';
import { HttpModule } from '@angular/http';
import { routing } from './people.routing';
import { PeopleComponent } from './people.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PeopleListComponent } from './people-list/people-list.component';

@NgModule({
  imports: [
    CommonModule,
    routing,
    ProvidersModule
  ],
  declarations: [
    PeopleComponent,
    PersonDetailComponent,
    PeopleListComponent
  ],
  providers: [

  ]
})
export class PeopleModule { }
