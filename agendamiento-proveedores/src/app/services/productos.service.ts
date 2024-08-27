import { Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private readonly STORAGE_KEY = 'productos';
  private productos: Producto[] = [];
  private nextId = 1;

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      this.productos = JSON.parse(data);
      this.nextId = this.productos.length > 0 ? Math.max(...this.productos.map(p => p.idProducto)) + 1 : 1;
    }
  }

  private saveToLocalStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.productos));
  }

  getProductos(): Producto[] {
    return this.productos;
  }

  getProductoById(id: number): Producto | undefined {
    return this.productos.find(producto => producto.idProducto === id);
  }

  addProducto(nombre: string): void {
    const nuevoProducto: Producto = {
      idProducto: this.nextId++,
      nombre: nombre
    };
    this.productos.push(nuevoProducto);
    this.saveToLocalStorage();
  }

  updateProducto(id: number, nombre: string): void {
    const producto = this.getProductoById(id);
    if (producto) {
      producto.nombre = nombre;
      this.saveToLocalStorage();
    }
  }

  deleteProducto(id: number): void {
    this.productos = this.productos.filter(producto => producto.idProducto !== id);
    this.saveToLocalStorage();
  }
}
