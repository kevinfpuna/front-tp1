import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosListComponent } from './productos-list/productos-list.component'; // Import ProductosListComponent
import { ProductosFormComponent } from './productos-form/productos-form.component'; // Import ProductosFormComponent

@NgModule({
  declarations: [
    ProductosListComponent, // Declare ProductosListComponent
    ProductosFormComponent  // Declare ProductosFormComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    FormsModule // Add FormsModule here
  ]
})
export class ProductosModule { }
