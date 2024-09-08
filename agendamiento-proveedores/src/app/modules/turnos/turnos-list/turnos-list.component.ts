import { Component, OnInit } from '@angular/core';
import { TurnosService } from '../../../services/turnos.service';
import { Turno } from '../../../models/turno.model';

@Component({
  selector: 'app-turnos-list',
  templateUrl: './turnos-list.component.html',
  styleUrls: ['./turnos-list.component.scss']
})
export class TurnosListComponent implements OnInit {
  turnos: Turno[] = [];
  isExpanded: boolean[] = []; // Controlar la expansión de los detalles

  constructor(private turnosService: TurnosService) {}

  ngOnInit(): void {
    this.turnos = this.turnosService.getTurnos();
    this.isExpanded = new Array(this.turnos.length).fill(false); // Inicializar los desplegables en estado cerrado
  }

  toggleDetalles(index: number): void {
    this.isExpanded[index] = !this.isExpanded[index]; // Alternar la visibilidad de los detalles
  }

  deleteTurno(id: number): void {
    this.turnosService.deleteTurno(id);
    this.turnos = this.turnosService.getTurnos();
    this.isExpanded = new Array(this.turnos.length).fill(false); // Resetear despliegue tras la eliminación
  }
}
