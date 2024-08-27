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

  constructor(private turnosService: TurnosService) {}

  ngOnInit(): void {
    this.turnos = this.turnosService.getTurnos();
  }

  deleteTurno(id: number): void {
    this.turnosService.deleteTurno(id);
    this.turnos = this.turnosService.getTurnos();
  }
}
