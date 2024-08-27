import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../../services/turnos.service';
import { Turno } from '../../../models/turno.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recepcion-list',
  templateUrl: './recepcion-list.component.html',
  styleUrls: ['./recepcion-list.component.scss']
})
export class RecepcionListComponent implements OnInit {
  turnos: Turno[] = [];
  turnoSeleccionado: Turno | null = null;
  mostrarPopup: boolean = false;
  esFinalizacion: boolean = false;
  mostrarDetallePopup: boolean = false;

  constructor(
    private turnosService: TurnosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarTurnos();
  }

  buscarTurnos(): void {
    this.turnos = this.turnosService.getTurnos();
  }

  iniciarRecepcion(turno: Turno): void {
    this.turnoSeleccionado = turno;
    this.mostrarPopup = true;
    this.esFinalizacion = false;  // Indica que es un inicio de recepción
  }

  finalizarRecepcion(turno: Turno): void {
    this.turnoSeleccionado = turno;
    this.mostrarPopup = true;
    this.esFinalizacion = true;  // Indica que es una finalización de recepción
  }

  onPopupAceptar(): void {
    if (this.turnoSeleccionado) {
      if (this.esFinalizacion) {
        // Lógica de Finalización de Recepción replicando el inicio de recepción
        const now = new Date();
        this.turnoSeleccionado.horaFinRecepcion = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        this.turnoSeleccionado.estado = 'completado';
        this.turnosService.updateTurno(this.turnoSeleccionado);  // Guardar cambios en el turno
      } else {
        // Lógica de Inicio de Recepción
        const now = new Date();
        this.turnoSeleccionado.horaInicioRecepcion = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        this.turnoSeleccionado.estado = 'en recepcion';
        this.turnosService.updateTurno(this.turnoSeleccionado);  // Guardar cambios en el turno
      }
      
      this.buscarTurnos();  // Refresca la lista para mostrar los cambios
    }
    this.mostrarPopup = false;
  }

  verDetalles(turno: Turno): void {
    this.turnoSeleccionado = turno;
    this.mostrarDetallePopup = true;
  }

  cerrarDetallePopup(): void {
    this.mostrarDetallePopup = false;
  }
}
