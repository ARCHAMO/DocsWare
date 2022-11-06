import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModulosComponent } from './modulos.component';
import { CrearModuloComponent } from './crear-modulo/crear-modulo.component';

const routes: Routes = [
  {
    path: '',
    component: ModulosComponent
  },
  {
    path: 'crear',
    component: CrearModuloComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulosRoutingModule { }
