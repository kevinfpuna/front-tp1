import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../../services/turnos.service';
import { Turno } from '../../../models/turno.model';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/proveedor.model';
import { JaulasService } from '../../../services/jaulas.service'; // Importa el servicio de jaulas
import { Jaula } from '../../../models/jaula.model'; // Importa el modelo de jaula
import { ProductosService } from '../../../services/productos.service'; // Importa el servicio de productos
import { Producto } from '../../../models/producto.model'; // Importa el modelo de producto

@Component({
  selector: 'app-turnos-list',
  templateUrl: './turnos-list.component.html',
  styleUrls: ['./turnos-list.component.scss']
})
export class TurnosListComponent implements OnInit {
  turnos: Turno[] = [];
  proveedores: { [id: number]: string } = {}; // Diccionario para almacenar los nombres de los proveedores
  jaulas: { [id: number]: string } = {}; // Diccionario para almacenar los nombres de las jaulas
  productos: { [id: number]: string } = {}; // Diccionario para almacenar los nombres de los productos
  isExpanded: boolean[] = [];

  constructor(
    private turnosService: TurnosService,
    private proveedoresService: ProveedoresService,
    private jaulasService: JaulasService, // Añade el servicio de jaulas
    private productosService: ProductosService // Añade el servicio de productos
  ) {}

  ngOnInit(): void {
    this.loadTurnos();
    this.cargarProductos(); // Cargar los productos
  }

  loadTurnos(): void {
    // Obtener turnos directamente del servicio
    this.turnos = this.turnosService.getTurnos();

    // Cargar todos los proveedores y almacenarlos en un diccionario
    const allProveedores = this.proveedoresService.getProveedores();
    allProveedores.forEach((proveedor: Proveedor) => {
      this.proveedores[proveedor.idProveedor] = proveedor.nombre; // Guardar el nombre del proveedor
    });

    // Cargar todas las jaulas y almacenarlas en un diccionario
    const allJaulas = this.jaulasService.getJaulas();
    allJaulas.forEach((jaula: Jaula) => {
      this.jaulas[jaula.idJaula] = jaula.nombre; // Guardar el nombre de la jaula
    });

    // Inicializar el estado expandido
    this.isExpanded = new Array(this.turnos.length).fill(false);
  }

  cargarProductos(): void {
    const allProductos = this.productosService.getProductos(); // Suponiendo que este método obtiene los productos
    allProductos.forEach((producto: Producto) => {
      this.productos[producto.idProducto] = producto.nombre; // Guardar el nombre del producto
    });
  }

  toggleDetalles(index: number): void {
    this.isExpanded[index] = !this.isExpanded[index]; // Alternar la visibilidad de los detalles
  }

  deleteTurno(id: number): void {
    this.turnosService.deleteTurno(id); // Eliminar el turno
    this.loadTurnos(); // Recargar la lista de turnos
  }
}
