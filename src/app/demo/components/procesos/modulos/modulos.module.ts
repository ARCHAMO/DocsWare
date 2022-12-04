import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulosRoutingModule } from './modulos-routing.module';
import { ModulosComponent } from './modulos.component';
import { CrearModuloComponent } from './crear-modulo/crear-modulo.component';
import { SharedPrimengModule } from '../../../../shared-primeng.module';


@NgModule({
  declarations: [
    ModulosComponent,
    CrearModuloComponent
  ],
  imports: [
    CommonModule,
    ModulosRoutingModule,
    SharedPrimengModule
  ]
})
export class ModulosModule { }
