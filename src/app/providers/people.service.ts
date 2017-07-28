import { Person, PersonResponse } from './../interfaces/person';
import { Observable } from 'rxjs/Rx';
import { Http, RequestOptionsArgs, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class PeopleService {

  private api = 'http://swapi.co/api/people';

  constructor(private http: Http) { }

  /**
   * Get a list of people that participated in the movie
   */
  getAll(): Observable<PersonResponse> {

    return this.http.get( this.api , ).map( response =>  response.json() as PersonResponse);

  }

  /**
   * Search people by a given name
   * @param name
   */
  searchByName(name: string): Observable<PersonResponse> {

    const urlSearchParams: URLSearchParams = new URLSearchParams();

    if ( name.length > 1 ) {
      urlSearchParams.set('search', name );
    }
    const reqOptsArgs: RequestOptionsArgs = {
      params: urlSearchParams
    };

    return this.http.get( this.api , reqOptsArgs).map( response =>  response.json() as PersonResponse);

  }

  /**
   * Gets a list of people by their url
   * It will usually be used for pagination
   * @param url
   */
  getByURL( url: string ): Observable<PersonResponse> {
      return this.http.get( url ).map( response =>  response.json() as PersonResponse);
  }

  /**
   * Gets one person by his url
   * @param url the url to get one person
   */
  getPerson(url: string): Observable<Person> {
      return this.http.get( url ).map( response =>  response.json() as Person);
  }
}
