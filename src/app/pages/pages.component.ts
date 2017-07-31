import { Component } from '@angular/core';

@Component({
  selector: '<app-pages></app-pages>',
  template: `
    <md-toolbar color='primary'>Star Wars Chanllenge</md-toolbar>
    <div class="container-fluid">
      <router-outlet></router-outlet>
    </div>
  `
})
export class PagesComponent {
  constructor() {

  }
}
