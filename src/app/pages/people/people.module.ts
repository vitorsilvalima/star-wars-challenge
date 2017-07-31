import { ProvidersModule } from './../../providers/providers.module';
import { HttpModule } from '@angular/http';
import { routing } from './people.routing';
import { PeopleComponent } from './people.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonDetailComponent } from './person-detail/person-detail.component';
import { PeopleListComponent, ButtonViewComponent } from './people-list/people-list.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MdInputModule, MdPaginatorModule, MdCardModule, MdChipsModule } from '@angular/material';



@NgModule({
  imports: [
    CommonModule,
    routing,
    ProvidersModule,
    Ng2SmartTableModule,
    MdInputModule,
    MdPaginatorModule,
    MdCardModule,
    MdChipsModule
  ],
  declarations: [
    PeopleComponent,
    PersonDetailComponent,
    PeopleListComponent,
    ButtonViewComponent
  ],
  entryComponents: [
    ButtonViewComponent
  ],
  providers: [

  ]
})
export class PeopleModule { }
