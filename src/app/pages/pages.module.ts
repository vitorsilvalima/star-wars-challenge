import { routing } from './pages.routing';
import { PagesComponent } from './pages.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdToolbarModule, MdIconModule, MdMenuModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    MdToolbarModule,
    routing,
    MdIconModule,
    MdMenuModule
  ],
  declarations: [
    PagesComponent
  ]
})
export class PagesModule { }
