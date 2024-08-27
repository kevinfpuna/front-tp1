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
  @Output() aceptar = new EventEmitter<void>();
  @Output() cancelar = new EventEmitter<void>();  // Emitir evento para cancelar

  jaulasDisponibles: Jaula[] = [];
  jaulaSeleccionada: number | null = null;

  constructor(private jaulasService: JaulasService) {}

  ngOnInit(): void {
    if (this.turnoSeleccionado && !this.esFinalizacion) {
      this.jaulasDisponibles = this.jaulasService.getJaulas().filter(jaula => jaula.enUso === 'N');
    }
  }

  seleccionarJaula(): void {
    if (this.jaulaSeleccionada !== null && this.turnoSeleccionado) {
      this.turnoSeleccionado.idJaula = this.jaulaSeleccionada;
      this.aceptar.emit();  // Emitir evento para iniciar o finalizar la recepción
    }
  }

  cancelarPopup(): void {  // Definir el método cancelarPopup
    this.cancelar.emit();
  }
}
