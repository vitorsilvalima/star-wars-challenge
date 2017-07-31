import { Planet } from '../interfaces/planet';
import { Observable } from 'rxjs/Rx';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class PlanetService {

  constructor(private http: Http) { }

  getPlanet( url: string ): Observable<Planet> {
    return this.http.get(url).map( response => response.json() as Planet );
  }

}
