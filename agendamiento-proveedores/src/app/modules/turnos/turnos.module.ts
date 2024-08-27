import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { TurnosRoutingModule } from './turnos-routing.module';
import { TurnosListComponent } from './turnos-list/turnos-list.component'; // Import TurnosListComponent
import { TurnosFormComponent } from './turnos-form/turnos-form.component'; // Import TurnosFormComponent

@NgModule({
  declarations: [
    TurnosListComponent, // Declare TurnosListComponent
    TurnosFormComponent  // Declare TurnosFormComponent
  ],
  imports: [
    CommonModule,
    TurnosRoutingModule,
    FormsModule // Add FormsModule here
  ]
})
export class TurnosModule { }
