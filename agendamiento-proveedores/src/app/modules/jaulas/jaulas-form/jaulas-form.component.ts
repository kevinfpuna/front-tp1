import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JaulasService } from '../../../services/jaulas.service';

@Component({
  selector: 'app-jaulas-form',
  templateUrl: './jaulas-form.component.html',
  styleUrls: ['./jaulas-form.component.scss']
})
export class JaulasFormComponent implements OnInit {
  nombre: string = '';
  enUso: 'S' | 'N' = 'N';
  jaulaId: number | null = null;

  constructor(
    private jaulasService: JaulasService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la jaula desde la URL
    this.jaulaId = +this.route.snapshot.paramMap.get('id')!;
    if (this.jaulaId) {
      const jaula = this.jaulasService.getJaulaById(this.jaulaId);
      if (jaula) {
        this.nombre = jaula.nombre; // Cargar el nombre en el formulario
        this.enUso = jaula.enUso; // Cargar el estado enUso en el formulario
      }
    }
  }

  saveJaula(): void {
    if (this.jaulaId) {
      // Actualizar jaula existente
      this.jaulasService.updateJaula(this.jaulaId, this.nombre, this.enUso);
    } else {
      // Crear una nueva jaula
      this.jaulasService.addJaula(this.nombre, this.enUso);
    }
    this.router.navigate(['/jaulas']);
  }
}
