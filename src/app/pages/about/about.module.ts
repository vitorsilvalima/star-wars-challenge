import { MdCardModule, MdButtonModule } from '@angular/material';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule,
    MdButtonModule,
    RouterModule.forChild([
      {path: '', component: AboutComponent}
    ])
  ],
  declarations: [AboutComponent]
})
export class AboutModule { }
