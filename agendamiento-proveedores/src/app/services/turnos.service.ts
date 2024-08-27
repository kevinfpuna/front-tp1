import { Injectable } from '@angular/core';
import { Turno } from '../models/turno.model';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {
  private readonly STORAGE_KEY = 'turnos';
  private turnos: Turno[] = [];
  private nextId = 1;

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.turnos = JSON.parse(data);
      this.nextId = this.turnos.length > 0 ? Math.max(...this.turnos.map(t => t.idTurno)) + 1 : 1;
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.turnos));
  }

  getTurnos(): Turno[] {
    return this.turnos;
  }

  getTurnoById(id: number): Turno | undefined {
    return this.turnos.find(turno => turno.idTurno === id);
  }

  addTurno(turno: Turno): void {
    turno.idTurno = this.nextId++;
    turno.estado = 'pendiente';  // Estado por defecto
    this.turnos.push(turno);
    this.saveToLocalStorage();
  }

  updateTurno(turno: Turno): void {
    const index = this.turnos.findIndex(t => t.idTurno === turno.idTurno);
    if (index !== -1) {
      this.turnos[index] = turno;
      this.saveToLocalStorage();
    }
  }

  iniciarRecepcion(turno: Turno): void {
    const now = new Date();
    turno.horaInicioRecepcion = now.toTimeString().split(' ')[0];  // Guarda la hora en formato hh:mm
    turno.estado = 'en recepcion';
    this.updateTurno(turno);
  }

  finalizarRecepcion(turno: Turno): void {
    const now = new Date();
    turno.horaFinRecepcion = now.toTimeString().split(' ')[0];  // Guarda la hora en formato hh:mm
    turno.estado = 'completado';
    this.updateTurno(turno);
  }

  deleteTurno(id: number): void {
    this.turnos = this.turnos.filter(turno => turno.idTurno !== id);
    this.saveToLocalStorage();
  }
}
