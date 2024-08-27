import { Injectable } from '@angular/core';
import { Proveedor } from '../models/proveedor.model';

@Injectable({
  providedIn: 'root'
})
export class ProveedoresService {
  private readonly STORAGE_KEY = 'proveedores';
  private proveedores: Proveedor[] = [];
  private nextId = 1;

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.proveedores = JSON.parse(data);
      this.nextId = this.proveedores.length > 0 ? Math.max(...this.proveedores.map(p => p.idProveedor)) + 1 : 1;
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.proveedores));
  }

  getProveedores(): Proveedor[] {
    return this.proveedores;
  }

  getProveedorById(id: number): Proveedor | undefined {
    return this.proveedores.find(proveedor => proveedor.idProveedor === id);
  }

  addProveedor(nombre: string): void {
    const nuevoProveedor: Proveedor = {
      idProveedor: this.nextId++,
      nombre: nombre
    };
    this.proveedores.push(nuevoProveedor);
    this.saveToLocalStorage();
  }

  updateProveedor(id: number, nombre: string): void {
    const proveedor = this.getProveedorById(id);
    if (proveedor) {
      proveedor.nombre = nombre;
      this.saveToLocalStorage();
    }
  }

  deleteProveedor(id: number): void {
    this.proveedores = this.proveedores.filter(proveedor => proveedor.idProveedor !== id);
    this.saveToLocalStorage();
  }
}
