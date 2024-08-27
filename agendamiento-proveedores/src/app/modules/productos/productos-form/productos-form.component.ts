import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-productos-form',
  templateUrl: './productos-form.component.html',
  styleUrls: ['./productos-form.component.scss']
})
export class ProductosFormComponent implements OnInit {
  nombre: string = '';
  productoId: number | null = null;

  constructor(
    private productosService: ProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el ID del producto desde la URL
    this.productoId = +this.route.snapshot.paramMap.get('id')!;
    if (this.productoId) {
      const producto = this.productosService.getProductoById(this.productoId);
      if (producto) {
        this.nombre = producto.nombre; // Cargar el nombre en el formulario
      }
    }
  }

  saveProducto(): void {
    if (this.productoId) {
      // Actualizar producto existente
      this.productosService.updateProducto(this.productoId, this.nombre);
    } else {
      // Crear un nuevo producto
      this.productosService.addProducto(this.nombre);
    }
    this.router.navigate(['/productos']);
  }
}
