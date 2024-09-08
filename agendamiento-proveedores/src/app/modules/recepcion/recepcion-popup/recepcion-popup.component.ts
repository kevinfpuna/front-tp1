import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Jaula } from '../../../models/jaula.model';
import { Turno } from '../../../models/turno.model';
import { JaulasService } from '../../../services/jaulas.service';

@Component({
  selector: 'app-recepcion-popup',
  templateUrl: './recepcion-popup.component.html',
  styleUrls: ['./recepcion-popup.component.scss']
})
export class RecepcionPopupComponent implements OnInit {
  @Input() turnoSeleccionado: Turno | null = null;
  @Input() esFinalizacion: boolean = false;
  @Output() aceptar = new EventEmitter<number | null>();  // Emitir el ID de la jaula seleccionada o null si no se selecciona.
  @Output() cancelar = new EventEmitter<void>();  // Emitir evento para cancelar

  jaulasDisponibles: Jaula[] = [];
  jaulaSeleccionada: number | null = null;  // Variable para almacenar la jaula seleccionada

  constructor(private jaulasService: JaulasService) {}

  ngOnInit(): void {
    if (this.turnoSeleccionado && !this.esFinalizacion) {
      // Solo cargar las jaulas disponibles si no es una finalización
      this.jaulasDisponibles = this.jaulasService.getJaulas().filter(jaula => jaula.enUso === 'N');
    }
  }

  seleccionarJaula(jaulaId: number): void {
    this.jaulaSeleccionada = jaulaId;  // Asigna la jaula seleccionada
  }

  aceptarSeleccion(): void {
    this.aceptar.emit(this.jaulaSeleccionada);  // Emitir la jaula seleccionada
  }

  cancelarPopup(): void {
    this.cancelar.emit();  // Emitir evento de cancelar
  }
}
