import { Planet } from './../../../interfaces/planet';
import { PlanetService } from './../../../providers/planet.service';
import { Observable } from 'rxjs/Rx';
import { Person } from './../../../interfaces/person';
import { PeopleService } from './../../../providers/people.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
//import 'rxjs/transforming/operator/flatMap';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/do';


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  personDetail$: Observable<Person>;
  person: Person;
  planetInfo$: Observable<Planet>;
  planet: Planet;
  residents: Person[];

  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private planetService: PlanetService
  ) { }

  ngOnInit() {
    this.peopleService
      .getPerson( this.peopleService.getSelectedPerson() )
      .switchMap( (person: Person) => {
        this.person = person;
        return this.planetService.getPlanet(person.homeworld);
      })
      .switchMap( (planet: Planet) => {
        this.planet = planet;
        const people: Observable<Person>[]  = planet
           .residents
           .map(personUrl => this.peopleService.getPerson(personUrl));
        return Observable.merge(people);
      })
      .flatMap(flat => flat)
      .toArray()
      .subscribe( (residents: Person[]) => this.residents = residents);
  }

}
