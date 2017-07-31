import { Router } from '@angular/router';
import { Person, PeopleResponse } from './../../../interfaces/person';
import { PeopleService } from './../../../providers/people.service';
import { Observable, Subject, Subscription } from 'rxjs/Rx';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { LocalDataSource, ViewCell } from 'ng2-smart-table';


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
      birth_year: {
        title: 'Birth Year'
      },
      gender: {
        title: 'Gender'
      },
      url: {
        filter: false,
        title: 'Button',
        type: 'custom',
        renderComponent: ButtonViewComponent
      },
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

@Component({
  selector: 'app-button-detalhes',
  template: `
    <button md-raised-button color='primary' (click)="onClick()">{{ renderValue }}</button>
  `,
})
export class ButtonViewComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(private router: Router, private peopleService: PeopleService) {  }
  ngOnInit() {
    this.renderValue = 'Details';
  }

  onClick() {
    this.router.navigate(['/pages/people/' + this.peopleService.getIDFromURL(<string>this.value)]);
  }
}


interface PageEvent {
  pageIndex: number;
  pageSize: number;
  length: number;
}
