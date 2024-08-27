import { Component, Input, OnInit } from '@angular/core';
import { Turno } from '../../../models/turno.model';
import { ProductosService } from '../../../services/productos.service'; // Importar el servicio de productos

@Component({
  selector: 'app-recepcion-detalle-popup',
  templateUrl: './recepcion-detalle-popup.component.html',
  styleUrls: ['./recepcion-detalle-popup.component.scss']
})
export class RecepcionDetallePopupComponent implements OnInit {
  @Input() turno: Turno | null = null;

  constructor(private productosService: ProductosService) {} // Inyectar el servicio

  ngOnInit(): void {}

  getNombreProducto(idProducto: number): string {
    const producto = this.productosService.getProductoById(idProducto);
    return producto ? producto.nombre : 'Producto no encontrado';
  }

  cerrarPopup(): void {
    this.turno = null;
  }
}
