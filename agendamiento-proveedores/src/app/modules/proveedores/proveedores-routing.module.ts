import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresListComponent } from './proveedores-list/proveedores-list.component';
import { ProveedoresFormComponent } from './proveedores-form/proveedores-form.component';

const routes: Routes = [
  { path: '', component: ProveedoresListComponent },
  { path: 'nuevo', component: ProveedoresFormComponent },
  { path: 'editar/:id', component: ProveedoresFormComponent }, // Ruta para editar
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProveedoresRoutingModule { }
