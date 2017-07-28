import { PeopleService } from './../../../providers/people.service';
import { PeopleResponse } from '../../../interfaces/person';
import { Observable, Subject } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/distinctUntilChanged';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css']
})
export class PeopleListComponent implements OnInit {

  peopleResponse$: Observable<PeopleResponse>;
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

    );
    setTimeout(() => this.search() , 500);
  }

}
