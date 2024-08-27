import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { JaulasRoutingModule } from './jaulas-routing.module';
import { JaulasListComponent } from './jaulas-list/jaulas-list.component';
import { JaulasFormComponent } from './jaulas-form/jaulas-form.component'; // Import JaulasFormComponent


@NgModule({
  declarations: [
    JaulasListComponent,
    JaulasFormComponent // Declare JaulasFormComponent
  ],
  imports: [
    CommonModule,
    JaulasRoutingModule,
    FormsModule // Add FormsModule here
  ]
})
export class JaulasModule { }
