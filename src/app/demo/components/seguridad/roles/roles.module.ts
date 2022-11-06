import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { CrearRolComponent } from './crear-rol/crear-rol.component';


@NgModule({
  declarations: [
    RolesComponent,
    CrearRolComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule
  ]
})
export class RolesModule { }
