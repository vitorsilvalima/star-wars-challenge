import { Person, PeopleResponse } from './../../../interfaces/person';
import { PeopleService } from './../../../providers/people.service';
import { Observable, Subject, Subscription } from 'rxjs/Rx';
import { Component, OnDestroy, OnInit } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { LocalDataSource } from 'ng2-smart-table';


@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})
export class PeopleListComponent implements OnInit, OnDestroy {

  peopleResponse$: Observable<Person[]>;
  private peopleStorage: LocalDataSource;
  private subscription: Subscription;
  private nextUrl: string;
  private previousUrl: string;
  private actualPage = 1 ;
  totalOfItems = 0;
  settings = {
    actions: false,
    columns: {
      name: {
        title: 'NAME',
        filter: false,
      },
      height: {
        title: 'HEIGHT'
      },
      mass: {
        title: 'MASS'
      },
      hair_color: {
        title: 'Hair Color'
      },
      skin_color: {
        title: 'SKIN COLOR'
      },
      eye_color: {
        title: 'EYE COLOR'
      },
      birth_year: {
        title: 'Birth Year'
      },
      gender: {
        title: 'Gender'
      }
    }
  };
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
            if ( term.indexOf('http') > -1 ) {
              return this.peopleService.getByURL(term);
            }else {
              this.actualPage = 0;
              return this.peopleService.searchByName(term);
            }
          }else {
            this.actualPage = 0;
            return this.peopleService.getAll();
          }
        }

    ).map((data: PeopleResponse ) => {
      this.totalOfItems = data.count;
      this.nextUrl = data.next;
      this.previousUrl = data.previous;
      return data.results;
    } );

    this.subscription = this.peopleResponse$.subscribe((data: Person[])  => {
      if (!this.peopleStorage) {
        this.peopleStorage = new LocalDataSource(data);
      }else {
        this.peopleStorage.load(data);
      }
    });

    setTimeout(() => this.search() , 200);
  }

  page(params: PageEvent) {
    if ( this.actualPage < params.pageIndex ) {
      this.actualPage = params.pageIndex;
      console.log(this.nextUrl);
      this.search(this.nextUrl);
    }else if ( this.actualPage > params.pageIndex ) {
      this.actualPage = params.pageIndex;
      this.search(this.previousUrl);
    }
  }

  public ngOnDestroy(): void {
      /* Unsubscribe events from observable */
      if ( this.subscription ) {
         this.subscription.unsubscribe();
      }
  }
}


interface PageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}
