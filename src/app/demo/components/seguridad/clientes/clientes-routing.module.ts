import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { CrearClienteComponent } from './crear-cliente/crear-cliente.component';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent
  },
  {
    path: 'crear',
    component: CrearClienteComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
