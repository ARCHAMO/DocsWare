import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulosRoutingModule } from './modulos-routing.module';
import { ModulosComponent } from './modulos.component';
import { CrearModuloComponent } from './crear-modulo/crear-modulo.component';


@NgModule({
  declarations: [
    ModulosComponent,
    CrearModuloComponent
  ],
  imports: [
    CommonModule,
    ModulosRoutingModule
  ]
})
export class ModulosModule { }
