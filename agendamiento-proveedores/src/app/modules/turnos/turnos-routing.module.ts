import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TurnosListComponent } from './turnos-list/turnos-list.component';
import { TurnosFormComponent } from './turnos-form/turnos-form.component';

const routes: Routes = [
  { path: '', component: TurnosListComponent },
  { path: 'nuevo', component: TurnosFormComponent },
  { path: 'editar/:id', component: TurnosFormComponent }, // Ruta para editar
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TurnosRoutingModule { }
