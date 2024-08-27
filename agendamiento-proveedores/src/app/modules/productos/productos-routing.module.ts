import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductosListComponent } from './productos-list/productos-list.component';
import { ProductosFormComponent } from './productos-form/productos-form.component';

const routes: Routes = [
  { path: '', component: ProductosListComponent },
  { path: 'nuevo', component: ProductosFormComponent },
  { path: 'editar/:id', component: ProductosFormComponent }, // Ruta para editar
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductosRoutingModule { }
