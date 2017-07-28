import { HttpModule } from '@angular/http';
import { PeopleService } from './people.service';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [HttpModule],
  providers: [PeopleService],
})
export class ProvidersModule { }
