import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosComponent } from './proyectos.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';


@NgModule({
  declarations: [
    ProyectosComponent,
    CrearProyectoComponent
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule
  ]
})
export class ProyectosModule { }
