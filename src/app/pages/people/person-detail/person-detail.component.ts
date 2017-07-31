import { Planet } from './../../../interfaces/planet';
import { PlanetService } from './../../../providers/planet.service';
import { Observable } from 'rxjs/Rx';
import { Person } from './../../../interfaces/person';
import { PeopleService } from './../../../providers/people.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toArray';
import 'rxjs/add/operator/do';


@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {

  personDetail$: Observable<Person>;
  person: Person;
  planetInfo$: Observable<Planet>;
  planet: Planet;
  residents: Person[] = [];

  constructor(
    private route: ActivatedRoute,
    private peopleService: PeopleService,
    private planetService: PlanetService,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.params.map(params => params.id)
      .switchMap(id => this.peopleService.getPersonByID(id))
      .switchMap( (person: Person) => {
        this.person = person;
        this.residents = [];
        return this.planetService.getPlanet(person.homeworld);
      })
      .switchMap( (planet: Planet) => {

        this.planet = planet;
        const people: Observable<Person>[]  = planet.residents.map(personUrl => this.peopleService.getPersonByURL(personUrl));

        return Observable.merge(people);
      })
      .flatMap(flat => flat)
      //.toArray()
      .subscribe( (resident: Person) => {
        this.residents.push(resident);
      });

  }

  selectPerson(url: string) {
    this.router.navigate(['/pages/people/' + this.peopleService.getIDFromURL(url)]);
  }

}
