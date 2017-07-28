import { Person, PersonResponse } from './../interfaces/person';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PeopleService {

  constructor(private http: Http) { }

  getAll(): Observable<PersonResponse> {

  }
}
