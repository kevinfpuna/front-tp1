import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/proveedor.model';

@Component({
  selector: 'app-proveedores-form',
  templateUrl: './proveedores-form.component.html',
  styleUrls: ['./proveedores-form.component.scss']
})
export class ProveedoresFormComponent implements OnInit {
  nombre: string = '';
  proveedorId: number | null = null;

  constructor(
    private proveedoresService: ProveedoresService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el ID del proveedor desde la URL
    this.proveedorId = +this.route.snapshot.paramMap.get('id')!;
    if (this.proveedorId) {
      const proveedor = this.proveedoresService.getProveedorById(this.proveedorId);
      if (proveedor) {
        this.nombre = proveedor.nombre; // Cargar el nombre en el formulario
      }
    }
  }

  saveProveedor(): void {
    if (this.proveedorId) {
      // Actualizar proveedor existente
      this.proveedoresService.updateProveedor(this.proveedorId, this.nombre);
    } else {
      // Crear un nuevo proveedor
      this.proveedoresService.addProveedor(this.nombre);
    }
    this.router.navigate(['/proveedores']);
  }
}
