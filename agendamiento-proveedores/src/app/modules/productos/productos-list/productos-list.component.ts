import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../../../services/productos.service';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-productos-list',
  templateUrl: './productos-list.component.html',
  styleUrls: ['./productos-list.component.scss']
})
export class ProductosListComponent implements OnInit {
  productos: Producto[] = [];
  filtro: string = '';

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.loadProductos();
  }

  loadProductos(): void {
    this.productos = this.productosService.getProductos();
  }

  deleteProducto(id: number): void {
    this.productosService.deleteProducto(id);
    this.loadProductos();
  }

  getFilteredProductos(): Producto[] {
    if (this.filtro.trim() === '') {
      return this.productos;
    }
    return this.productos.filter(producto =>
      producto.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
