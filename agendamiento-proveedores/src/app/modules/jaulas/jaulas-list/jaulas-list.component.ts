import { Component, OnInit } from '@angular/core';
import { JaulasService } from '../../../services/jaulas.service';
import { Jaula } from '../../../models/jaula.model';

@Component({
  selector: 'app-jaulas-list',
  templateUrl: './jaulas-list.component.html',
  styleUrls: ['./jaulas-list.component.scss']
})
export class JaulasListComponent implements OnInit {
  jaulas: Jaula[] = [];
  filtro: string = '';

  constructor(private jaulasService: JaulasService) {}

  ngOnInit(): void {
    this.loadJaulas();
  }

  loadJaulas(): void {
    this.jaulas = this.jaulasService.getJaulas();
  }

  deleteJaula(id: number): void {
    this.jaulasService.deleteJaula(id);
    this.loadJaulas();
  }

  getFilteredJaulas(): Jaula[] {
    if (this.filtro.trim() === '') {
      return this.jaulas;
    }
    return this.jaulas.filter(jaula =>
      jaula.nombre.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }
}
