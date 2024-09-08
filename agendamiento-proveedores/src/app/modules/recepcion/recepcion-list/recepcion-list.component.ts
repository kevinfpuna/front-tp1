import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../../services/turnos.service';
import { ProveedoresService } from '../../../services/proveedores.service';
import { JaulasService } from '../../../services/jaulas.service';
import { Turno } from '../../../models/turno.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recepcion-list',
  templateUrl: './recepcion-list.component.html',
  styleUrls: ['./recepcion-list.component.scss']
})
export class RecepcionListComponent implements OnInit {
  turnos: Turno[] = [];
  proveedores: { [id: number]: string } = {};
  jaulas: { [id: number]: string } = {};
  turnoSeleccionado: Turno | null = null;
  mostrarPopup: boolean = false;
  esFinalizacion: boolean = false;
  mostrarDetallePopup: boolean = false;

  constructor(
    private turnosService: TurnosService,
    private proveedoresService: ProveedoresService,
    private jaulasService: JaulasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarTurnos();
    this.cargarProveedoresYJaulas();
  }

  buscarTurnos(): void {
    this.turnos = this.turnosService.getTurnos();
  }

  cargarProveedoresYJaulas(): void {
    const proveedores = this.proveedoresService.getProveedores();
    proveedores.forEach(proveedor => {
      this.proveedores[proveedor.idProveedor] = proveedor.nombre;
    });

    const jaulas = this.jaulasService.getJaulas();
    jaulas.forEach(jaula => {
      this.jaulas[jaula.idJaula] = jaula.nombre;
    });
  }

  iniciarRecepcion(turno: Turno): void {
    this.turnoSeleccionado = turno;
    this.mostrarPopup = true;
    this.esFinalizacion = false;
  }

  finalizarRecepcion(turno: Turno): void {
    this.turnoSeleccionado = turno;
    this.mostrarPopup = true;
    this.esFinalizacion = true;
  }

  verDetalles(turno: Turno): void {
    // Si el turno seleccionado es el mismo, resetear y forzar el estado del popup
    if (this.turnoSeleccionado === turno) {
      this.turnoSeleccionado = null;  // Resetear selección temporalmente
      setTimeout(() => {
        this.turnoSeleccionado = turno;
        this.mostrarDetallePopup = true;  // Mostrar popup después del reset
      }, 0);  // Asegurarse de que Angular detecte el cambio
    } else {
      this.turnoSeleccionado = turno;
      this.mostrarDetallePopup = true;
    }
  }

  cerrarDetallePopup(): void {
    this.mostrarDetallePopup = false;
  }

  onPopupAceptar(): void {
    if (this.turnoSeleccionado) {
      const now = new Date();
      if (this.esFinalizacion) {
        this.turnoSeleccionado.horaFinRecepcion = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        this.turnoSeleccionado.estado = 'completado';
      } else {
        this.turnoSeleccionado.horaInicioRecepcion = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        this.turnoSeleccionado.estado = 'en recepcion';
      }
      this.turnosService.updateTurno(this.turnoSeleccionado);
      this.buscarTurnos();
    }
    this.mostrarPopup = false;
  }
}
