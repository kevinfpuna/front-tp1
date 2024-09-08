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
  
    // Verifica si el turno ya tiene una jaula asignada
    if (turno.idJaula) {
      const jaula = this.jaulasService.getJaulaById(turno.idJaula);
  
      // Si la jaula está en uso, mostrar el popup para seleccionar una nueva jaula
      if (jaula && jaula.enUso === 'S') {
        console.log(`La jaula ${jaula.nombre} está en uso, mostrando el popup para seleccionar una nueva jaula.`);
        this.mostrarPopup = true;  // Mostrar el popup para seleccionar jaula libre
        this.esFinalizacion = false;  // Asegurar que no sea finalización
      } else {
        // Si la jaula no está en uso, marcarla como en uso y continuar con el inicio de la recepción
        this.marcarJaulaEnUso(turno.idJaula);
        this.actualizarEstadoTurno(turno);  // Cambiar el estado del turno a "en recepcion"
      }
    } else {
      // Si el turno no tiene una jaula asignada, mostrar el popup para seleccionar una
      this.mostrarPopup = true;
      this.esFinalizacion = false;
    }
  }

  onPopupAceptar(jaulaId: number | null): void {
    if (jaulaId !== null && this.turnoSeleccionado) {
      // Si el usuario selecciona una jaula, asignarla al turno
      this.turnoSeleccionado.idJaula = jaulaId;
  
      // Marcar la jaula seleccionada como "en uso"
      this.marcarJaulaEnUso(jaulaId);
  
      // Actualizar el turno en el sistema
      this.actualizarEstadoTurno(this.turnoSeleccionado);
    }
  
    // Cerrar el popup después de aceptar
    this.mostrarPopup = false;
  }

  marcarJaulaEnUso(idJaula: number): void {
    const jaula = this.jaulasService.getJaulaById(idJaula);
    if (jaula) {
      jaula.enUso = 'S';  // Marcar la jaula como en uso
      this.jaulasService.updateJaula(jaula.idJaula, jaula.nombre, jaula.enUso);
    }
  }

  actualizarEstadoTurno(turno: Turno): void {
    const now = new Date();
    turno.horaInicioRecepcion = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    turno.estado = 'en recepcion';  // Cambiar el estado del turno a "en recepcion"
    this.turnosService.updateTurno(turno);  // Actualizar el turno en el sistema
    this.buscarTurnos();  // Refrescar la lista de turnos
  }

  finalizarRecepcion(turno: Turno): void {
    this.turnoSeleccionado = turno;
  
    // Verifica que el turno tiene una jaula asignada
    if (turno.idJaula) {
      // Cambiar el estado de la jaula a 'N' (no en uso)
      this.liberarJaula(turno.idJaula);
    }
  
    // Actualiza la hora de fin de recepción
    const now = new Date();
    this.turnoSeleccionado.horaFinRecepcion = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    this.turnoSeleccionado.estado = 'completado';  // Cambiar el estado del turno a "completado"
  
    // Actualizar el turno en el sistema
    this.turnosService.updateTurno(this.turnoSeleccionado);
  
    // Refresca la lista de turnos
    this.buscarTurnos();
  
    // Cerrar el popup
    this.mostrarPopup = false;
  }
  
  liberarJaula(idJaula: number): void {
    const jaula = this.jaulasService.getJaulaById(idJaula);
    if (jaula) {
      jaula.enUso = 'N';  // Cambiar el estado de la jaula a "no en uso"
      this.jaulasService.updateJaula(jaula.idJaula, jaula.nombre, jaula.enUso);  // Actualizar la jaula en el sistema
    }
  }
  

  verDetalles(turno: Turno): void {
    if (this.turnoSeleccionado === turno) {
      this.turnoSeleccionado = null;  // Resetear selección temporalmente
      setTimeout(() => {
        this.turnoSeleccionado = turno;
        this.mostrarDetallePopup = true;
      }, 0);
    } else {
      this.turnoSeleccionado = turno;
      this.mostrarDetallePopup = true;
    }
  }

  cerrarDetallePopup(): void {
    this.mostrarDetallePopup = false;
  }
}
