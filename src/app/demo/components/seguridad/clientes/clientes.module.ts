import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from '../clientes/clientes.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';


@NgModule({
  declarations: [
    ClientesComponent,
    CrearClienteComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule
  ]
})
export class ClientesModule { }
