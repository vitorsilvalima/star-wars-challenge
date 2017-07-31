import { Component } from '@angular/core';

@Component({
  selector: 'app-pages',
  styleUrls: ['./pages.component.scss'],
  template: `
    <md-toolbar color='primary'>
      <div routerLink="/pages/people/list">Star Wars Chanllenge</div>
      <span class="toolbar-spacer"></span>
      <md-icon [mdMenuTriggerFor]="menu">info</md-icon>
    </md-toolbar>
    <md-menu #menu="mdMenu">
      <button md-menu-item routerLink="/pages/about"> ABOUT </button>
    </md-menu>
    <div class="container-fluid">
      <router-outlet></router-outlet>
    </div>
  `
})
export class PagesComponent {
  constructor() {

  }
}
