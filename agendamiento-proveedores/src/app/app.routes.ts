import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'proveedores', loadChildren: () => import('./modules/proveedores/proveedores.module').then(m => m.ProveedoresModule) },
  { path: 'productos', loadChildren: () => import('./modules/productos/productos.module').then(m => m.ProductosModule) },
  { path: 'jaulas', loadChildren: () => import('./modules/jaulas/jaulas.module').then(m => m.JaulasModule) },
  { path: 'turnos', loadChildren: () => import('./modules/turnos/turnos.module').then(m => m.TurnosModule) },
  { path: 'recepcion', loadChildren: () => import('./modules/recepcion/recepcion.module').then(m => m.RecepcionModule) },
  { path: '', redirectTo: '/proveedores', pathMatch: 'full' },
  { path: '**', redirectTo: '/proveedores' } // Ruta para manejar rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Asegúrate de usar RouterModule.forRoot
  exports: [RouterModule]
})
export class AppRoutingModule { }
