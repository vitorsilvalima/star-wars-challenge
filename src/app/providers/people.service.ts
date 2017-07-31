import { Person, PeopleResponse } from './../interfaces/person';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PeopleService {

  private api = 'http://swapi.co/api/people';
  /**
   * This shared variable should be replace by ngrx for a more dynamic
   * and complex state
   */
  private selectedPerson = '';

  constructor(private http: Http) { }

  /**
   * Get a list of people that participated in the movie
   */
  getAll(): Observable<PeopleResponse> {

    return this.http.get( this.api ).map( response =>  response.json() as PeopleResponse);

  }

  /**
   * Search people by a given name
   * @param name
   */
  searchByName(name: string): Observable<PeopleResponse> {

    const urlSearchParams: URLSearchParams = new URLSearchParams();

    if ( name.length > 1 ) {
      urlSearchParams.set('search', name );
    }
    const reqOptsArgs: RequestOptionsArgs = {
      params: urlSearchParams
    };

    return this.http.get( this.api , reqOptsArgs).map( response =>  response.json() as PeopleResponse);

  }

  /**
   * Gets a list of people by their url
   * It will usually be used for pagination
   * @param url
   */
  getByURL( url: string ): Observable<PeopleResponse> {
      return this.http.get( url ).map( response =>  response.json() as PeopleResponse);
  }

  /**
   * Gets one person by his url
   * @param url the url to get one person
   */
  getPerson(url: string): Observable<Person> {
      return this.http.get( url ).map( response =>  response.json() as Person);
  }

  selectPerson(url: string) {
    this.selectedPerson = url;
  }

  getSelectedPerson(): string {
    return this.selectedPerson;
  }
}
