import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerfilesRoutingModule } from './perfiles-routing.module';
import { PerfilesComponent } from './perfiles.component';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';


@NgModule({
  declarations: [
    PerfilesComponent,
    CrearPerfilComponent
  ],
  imports: [
    CommonModule,
    PerfilesRoutingModule
  ]
})
export class PerfilesModule { }
