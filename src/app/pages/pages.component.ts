import { Component } from '@angular/core';

@Component({
  selector: '<app-pages></app-pages>',
  template: `
    <md-toolbar color='primary'>Star Wars Chanllenge</md-toolbar>
    <router-outlet></router-outlet>
  `
})
export class PagesComponent {
  constructor() {

  }
}
