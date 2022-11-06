import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    CrearUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule
  ]
})
export class UsuariosModule { }
