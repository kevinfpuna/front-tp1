import { Component, OnInit } from '@angular/core';
import { ProveedoresService } from '../../../services/proveedores.service';
import { Proveedor } from '../../../models/proveedor.model';

@Component({
  selector: 'app-proveedores-list',
  templateUrl: './proveedores-list.component.html',
  styleUrls: ['./proveedores-list.component.scss']
})
export class ProveedoresListComponent implements OnInit {
  proveedores: Proveedor[] = [];
  filtro: string = '';

  constructor(private proveedoresService: ProveedoresService) {}

  ngOnInit(): void {
    this.loadProveedores();
  }

  loadProveedores(): void {
    this.proveedores = this.proveedoresService.getProveedores();
  }

  deleteProveedor(id: number): void {
    this.proveedoresService.deleteProveedor(id);
    this.loadProveedores();
  }

  getFilteredProveedores(): Proveedor[] {
    if (this.filtro.trim() === '') {
      return this.proveedores;
    }
    return this.proveedores.filter(proveedor =>
      proveedor.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
