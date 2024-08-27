import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TurnosService } from '../../../services/turnos.service';
import { ProveedoresService } from '../../../services/proveedores.service';
import { JaulasService } from '../../../services/jaulas.service';
import { ProductosService } from '../../../services/productos.service';
import { Turno, DetalleTurno } from '../../../models/turno.model';
import { Proveedor } from '../../../models/proveedor.model';
import { Jaula } from '../../../models/jaula.model';
import { Producto } from '../../../models/producto.model';

@Component({
  selector: 'app-turnos-form',
  templateUrl: './turnos-form.component.html',
  styleUrls: ['./turnos-form.component.scss']
})
export class TurnosFormComponent implements OnInit {
  turnos: Turno[] = [];
  proveedores: Proveedor[] = [];
  jaulas: Jaula[] = [];
  productos: Producto[] = [];
  
  turno: Turno = {
    idTurno: 0,
    fecha: '',
    horaInicioAgendamiento: '',
    horaFinAgendamiento: '',
    idProveedor: 0,
    idJaula: 0,
    estado: 'pendiente',  // Inicializar el estado como 'pendiente'
    horaInicioRecepcion: '',
    horaFinRecepcion: '',
    detalles: []
  };
  
  horasDisponibles: string[] = [
    '07:00', '07:30', '08:00', '08:30', '09:00', '09:30',
    '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
    '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30', '18:00'
  ];
  
  constructor(
    private turnosService: TurnosService,
    private proveedoresService: ProveedoresService,
    private jaulasService: JaulasService,
    private productosService: ProductosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.proveedores = this.proveedoresService.getProveedores();
    this.jaulas = this.jaulasService.getJaulas();
    this.productos = this.productosService.getProductos();

    const turnoId = +this.route.snapshot.paramMap.get('id')!;
    if (turnoId) {
      const turno = this.turnosService.getTurnoById(turnoId);
      if (turno) {
        this.turno = turno;
      }
    }
  }

  addDetalle(idProducto: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement | null;
    if (inputElement) {
      const cantidad = parseInt(inputElement.value, 10);
      if (!isNaN(cantidad)) {
        const detalleExistente = this.turno.detalles.find(d => d.idProducto === idProducto);
        if (detalleExistente) {
          detalleExistente.cantidad = cantidad;
        } else {
          this.turno.detalles.push({ idProducto, cantidad });
        }
      }
    }
  }

  saveTurno(): void {
    if (this.turno.idTurno) {
      this.turnosService.updateTurno(this.turno);
    } else {
      this.turnosService.addTurno(this.turno);
    }
    this.router.navigate(['/turnos']);
  }
}
