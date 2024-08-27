import { Injectable } from '@angular/core';
import { Jaula } from '../models/jaula.model';

@Injectable({
  providedIn: 'root'
})
export class JaulasService {
  private readonly STORAGE_KEY = 'jaulas';
  private jaulas: Jaula[] = [];
  private nextId = 1;

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.jaulas = JSON.parse(data);
      this.nextId = this.jaulas.length > 0 ? Math.max(...this.jaulas.map(j => j.idJaula)) + 1 : 1;
    }
    else {
      this.jaulas = [];  // Inicializa como un arreglo vacío si no hay datos en localStorage
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.jaulas));
  }

  getJaulas(): Jaula[] {
    return this.jaulas;
  }

  getJaulaById(idJaula: number): Jaula | undefined {
    console.log('Jaulas disponibles:', this.jaulas);
    return this.jaulas.find(jaula => jaula.idJaula === Number(idJaula));  // Asegúrate de que ambos sean números
  }
  

  addJaula(nombre: string, enUso: 'S' | 'N'): void {
    const nuevaJaula: Jaula = {
      idJaula: this.nextId++,
      nombre: nombre,
      enUso: enUso
    };
    this.jaulas.push(nuevaJaula);
    this.saveToLocalStorage();
  }

  updateJaula(idJaula: number, nombre: string, enUso: 'S' | 'N'): void {
    const jaulaIndex = this.jaulas.findIndex(j => j.idJaula === idJaula);
    if (jaulaIndex !== -1) {
      this.jaulas[jaulaIndex].nombre = nombre;
      this.jaulas[jaulaIndex].enUso = enUso;
      this.saveToLocalStorage();  // Asegúrate de que los cambios se guarden
    }
  }

  deleteJaula(id: number): void {
    this.jaulas = this.jaulas.filter(jaula => jaula.idJaula !== id);
    this.saveToLocalStorage();
  }
}
