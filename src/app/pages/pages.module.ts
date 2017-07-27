import { routing } from './pages.routing';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MdToolbarModule} from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    routing
  ],
  declarations: [
    PagesComponent
  ]
})
export class PagesModule { }
