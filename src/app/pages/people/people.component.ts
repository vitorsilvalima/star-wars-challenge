import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people',
  template: `
    <router-outlet></router-outlet>
  `
})
export class PeopleComponent implements OnInit {
  constructor() { }

  ngOnInit() { }
}
