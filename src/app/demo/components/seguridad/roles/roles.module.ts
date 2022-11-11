import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { CrearRolComponent } from './crear-rol/crear-rol.component';
import { TableModule } from 'primeng/table';


@NgModule({
  declarations: [
    RolesComponent,
    CrearRolComponent
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    TableModule
  ]
})
export class RolesModule { }
