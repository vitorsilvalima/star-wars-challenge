import { Observable } from 'rxjs/Rx';
import { Person } from './../../../interfaces/person';
import { PeopleService } from './../../../providers/people.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  personDetail$: Observable<Person>;

  constructor(private route: ActivatedRoute, private peopleService: PeopleService) { }

  ngOnInit() {
    this.personDetail$ = this.peopleService.getPerson(this.peopleService.getSelectedPerson());
  }

}
