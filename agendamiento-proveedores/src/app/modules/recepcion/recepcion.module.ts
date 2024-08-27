import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecepcionListComponent } from './recepcion-list/recepcion-list.component';
import { RecepcionPopupComponent } from './recepcion-popup/recepcion-popup.component';
import { RecepcionDetallePopupComponent } from './recepcion-detalle-popup/recepcion-detalle-popup.component'; // Importa el nuevo componente
import { RecepcionRoutingModule } from './recepcion-routing.module';

@NgModule({
  declarations: [
    RecepcionListComponent,
    RecepcionPopupComponent,
    RecepcionDetallePopupComponent // Declara el nuevo componente
  ],
  imports: [
    CommonModule,
    FormsModule,
    RecepcionRoutingModule
  ]
})
export class RecepcionModule { }
