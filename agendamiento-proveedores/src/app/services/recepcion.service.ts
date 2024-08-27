import { Injectable } from '@angular/core';
import { TurnosService } from './turnos.service';
import { JaulasService } from './jaulas.service';
import { Turno } from '../models/turno.model';
import { Jaula } from '../models/jaula.model';

@Injectable({
  providedIn: 'root'
})
export class RecepcionService {
  constructor(
    private turnosService: TurnosService,
    private jaulasService: JaulasService
  ) {}

  getTurnosByFecha(fecha: string): Turno[] {
    return this.turnosService.getTurnos()
      .filter(turno => turno.fecha === fecha)
      .sort((a, b) => a.horaInicioAgendamiento.localeCompare(b.horaInicioAgendamiento));
  }

  getJaulasDisponibles(): Jaula[] {
    return this.jaulasService.getJaulas().filter(jaula => jaula.enUso === 'N');
  }

  iniciarRecepcion(turno: Turno, jaula: Jaula): void {
    const now = new Date();
    turno.horaInicioRecepcion = now.toTimeString().split(' ')[0]; // Cargar la hora actual
    turno.idJaula = jaula.idJaula;
    jaula.enUso = 'S'; // Marcar la jaula como en uso
    this.turnosService.updateTurno(turno);
    this.jaulasService.updateJaula(jaula.idJaula, jaula.nombre, jaula.enUso);
  }

  finalizarRecepcion(turno: Turno): void {
    const now = new Date();
    turno.horaFinRecepcion = now.toTimeString().split(' ')[0];
    
    const jaula = this.jaulasService.getJaulaById(turno.idJaula);
    if (jaula) {
      jaula.enUso = 'N';
      this.jaulasService.updateJaula(jaula.idJaula, jaula.nombre, jaula.enUso);
    }
    
    this.turnosService.updateTurno(turno);
  }
}
