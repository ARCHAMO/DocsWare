import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProyectosComponent } from './proyectos.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';

const routes: Routes = [
  {
    path: '',
    component: ProyectosComponent
  },
  {
    path: 'crear',
    component: CrearProyectoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProyectosRoutingModule { }
