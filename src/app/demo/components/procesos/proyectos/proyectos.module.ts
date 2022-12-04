import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProyectosRoutingModule } from './proyectos-routing.module';
import { ProyectosComponent } from './proyectos.component';
import { CrearProyectoComponent } from './crear-proyecto/crear-proyecto.component';
import { SharedPrimengModule } from '../../../../shared-primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProyectosComponent,
    CrearProyectoComponent
  ],
  imports: [
    CommonModule,
    ProyectosRoutingModule,
    SharedPrimengModule,
    FormsModule,
    ReactiveFormsModule,
]
})
export class ProyectosModule { }
