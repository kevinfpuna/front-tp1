import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JaulasListComponent } from './jaulas-list/jaulas-list.component';
import { JaulasFormComponent } from './jaulas-form/jaulas-form.component';

const routes: Routes = [
  { path: '', component: JaulasListComponent },
  { path: 'nuevo', component: JaulasFormComponent },
  { path: 'editar/:id', component: JaulasFormComponent }, // Ruta para editar
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JaulasRoutingModule { }
