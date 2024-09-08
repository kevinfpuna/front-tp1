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
  turnosFiltrados: Turno[] = []; // Lista de turnos filtrados
  proveedores: { [id: number]: string } = {};
  jaulas: { [id: number]: string } = {};
  fechaFiltro: string | null = null; // Fecha única para el filtro
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
    this.turnosFiltrados = [...this.turnos]; // Inicialmente, todos los turnos se muestran
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

  // Filtrar por una fecha específica
  filtrarPorFecha(): void {
    if (this.fechaFiltro) {
      const fechaSeleccionada = new Date(this.fechaFiltro);

      this.turnosFiltrados = this.turnos.filter(turno => {
        const fechaTurno = new Date(turno.fecha); // Asegúrate de que el formato de turno.fecha es correcto
        return fechaTurno.toDateString() === fechaSeleccionada.toDateString();
      });
    } else {
      // Si no se selecciona una fecha, mostrar todos los turnos
      this.turnosFiltrados = [...this.turnos];
    }
  }
  
  iniciarRecepcion(turno: Turno): void {
    this.turnoSeleccionado = turno;

    if (turno.idJaula) {
      const jaula = this.jaulasService.getJaulaById(turno.idJaula);
      if (jaula && jaula.enUso === 'S') {
        this.mostrarPopup = true;
        this.esFinalizacion = false;
      } else {
        this.marcarJaulaEnUso(turno.idJaula);
        this.actualizarEstadoTurno(turno);
      }
    } else {
      this.mostrarPopup = true;
      this.esFinalizacion = false;
    }
  }

  onPopupAceptar(jaulaId: number | null): void {
    if (jaulaId !== null && this.turnoSeleccionado) {
      this.turnoSeleccionado.idJaula = jaulaId;
      this.marcarJaulaEnUso(jaulaId);
      this.actualizarEstadoTurno(this.turnoSeleccionado);
    }
    this.mostrarPopup = false;
  }

  marcarJaulaEnUso(idJaula: number): void {
    const jaula = this.jaulasService.getJaulaById(idJaula);
    if (jaula) {
      jaula.enUso = 'S';
      this.jaulasService.updateJaula(jaula.idJaula, jaula.nombre, jaula.enUso);
    }
  }

  actualizarEstadoTurno(turno: Turno): void {
    const now = new Date();
    turno.horaInicioRecepcion = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    turno.estado = 'en recepcion';
    this.turnosService.updateTurno(turno);
    this.buscarTurnos();
  }

  finalizarRecepcion(turno: Turno): void {
    this.turnoSeleccionado = turno;
    if (turno.idJaula) {
      this.liberarJaula(turno.idJaula);
    }
    const now = new Date();
    this.turnoSeleccionado.horaFinRecepcion = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    this.turnoSeleccionado.estado = 'completado';
    this.turnosService.updateTurno(this.turnoSeleccionado);
    this.buscarTurnos();
    this.mostrarPopup = false;
  }

  liberarJaula(idJaula: number): void {
    const jaula = this.jaulasService.getJaulaById(idJaula);
    if (jaula) {
      jaula.enUso = 'N';
      this.jaulasService.updateJaula(jaula.idJaula, jaula.nombre, jaula.enUso);
    }
  }

  verDetalles(turno: Turno): void {
    if (this.turnoSeleccionado === turno) {
      this.turnoSeleccionado = null;
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
