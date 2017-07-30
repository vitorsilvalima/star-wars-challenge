import { Person, PeopleResponse } from './../../../interfaces/person';
import { PeopleService } from './../../../providers/people.service';
import { Observable, Subject } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';

import 'rxjs/add/operator/distinctUntilChanged';
import {DataSource} from '@angular/cdk';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  peopleResponse$: Observable<Person[]>;
  dataSource: StarWarsDataSource | null;
  displayedColumns = ['name'];
  private peopleSearch: Subject<string> = new Subject<string>();

  constructor(private peopleService: PeopleService) {

  }

  search( name: string = '' ) {
    this.peopleSearch.next(name);
  }

  ngOnInit() {
    this.peopleResponse$ = this.peopleSearch
      .distinctUntilChanged()
      .debounceTime(450)
      .switchMap( (term: string) => {

          if ( term !== undefined || term !== '') {
            if ( term.indexOf('html') > -1 ) {
              return this.peopleService.getByURL(term);
            }else {
              return this.peopleService.searchByName(term);
            }
          }else {
            return this.peopleService.getAll();
          }
        }

    ).map((data: PeopleResponse ) => data.results );

    this.dataSource = new StarWarsDataSource(<any>this.peopleResponse$);
    setTimeout(() => this.search() , 500);
  }

}


export class StarWarsDataSource extends DataSource<any> {
  constructor(private dataStream: Observable<Person[]> ) {
    super();
  }

  connect(): Observable<Person[]> {
    return this.dataStream;
  }

  disconnect() {}
}
