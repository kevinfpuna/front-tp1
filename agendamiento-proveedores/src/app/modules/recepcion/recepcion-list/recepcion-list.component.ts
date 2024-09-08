import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../../services/turnos.service';
import { ProveedoresService } from '../../../services/proveedores.service';  // Importa el servicio de proveedores
import { JaulasService } from '../../../services/jaulas.service';  // Importa el servicio de jaulas
import { Turno } from '../../../models/turno.model';
import { Proveedor } from '../../../models/proveedor.model';
import { Jaula } from '../../../models/jaula.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recepcion-list',
  templateUrl: './recepcion-list.component.html',
  styleUrls: ['./recepcion-list.component.scss']
})
export class RecepcionListComponent implements OnInit {
  turnos: Turno[] = [];
  proveedores: { [id: number]: string } = {}; // Diccionario para los nombres de proveedores
  jaulas: { [id: number]: string } = {}; // Diccionario para los nombres de jaulas
  turnoSeleccionado: Turno | null = null;
  mostrarPopup: boolean = false;
  esFinalizacion: boolean = false;
  mostrarDetallePopup: boolean = false;

  constructor(
    private turnosService: TurnosService,
    private proveedoresService: ProveedoresService,  // Servicio de proveedores
    private jaulasService: JaulasService,  // Servicio de jaulas
    private router: Router
  ) {}

  ngOnInit(): void {
    this.buscarTurnos();
    this.cargarProveedoresYJaulas();  // Cargar los proveedores y jaulas al inicio
  }

  buscarTurnos(): void {
    this.turnos = this.turnosService.getTurnos();
  }

  cargarProveedoresYJaulas(): void {
    // Cargar proveedores
    const proveedores = this.proveedoresService.getProveedores();
    proveedores.forEach((proveedor: Proveedor) => {
      this.proveedores[proveedor.idProveedor] = proveedor.nombre; // Guardar el nombre del proveedor
    });

    // Cargar jaulas
    const jaulas = this.jaulasService.getJaulas();
    jaulas.forEach((jaula: Jaula) => {
      this.jaulas[jaula.idJaula] = jaula.nombre; // Guardar el nombre de la jaula
    });
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
      const now = new Date();
      if (this.esFinalizacion) {
        this.turnoSeleccionado.horaFinRecepcion = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        this.turnoSeleccionado.estado = 'completado';
      } else {
        this.turnoSeleccionado.horaInicioRecepcion = now.getHours().toString().padStart(2, '0') + ':' + now.getMinutes().toString().padStart(2, '0');
        this.turnoSeleccionado.estado = 'en recepcion';
      }
      this.turnosService.updateTurno(this.turnoSeleccionado);  // Guardar los cambios
      this.buscarTurnos();  // Refrescar la lista de turnos
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
