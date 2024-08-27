import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { ProveedoresRoutingModule } from './proveedores-routing.module';
import { ProveedoresListComponent } from './proveedores-list/proveedores-list.component'; // Import ProveedoresListComponent
import { ProveedoresFormComponent } from './proveedores-form/proveedores-form.component'; // Import ProveedoresFormComponent

@NgModule({
  declarations: [
    ProveedoresListComponent, // Declare ProveedoresListComponent
    ProveedoresFormComponent  // Declare ProveedoresFormComponent
  ],
  imports: [
    CommonModule,
    ProveedoresRoutingModule,
    FormsModule // Add FormsModule here
  ]
})
export class ProveedoresModule { }
