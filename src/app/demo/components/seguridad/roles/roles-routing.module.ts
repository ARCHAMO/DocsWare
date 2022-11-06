import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolesComponent } from './roles.component';
import { CrearRolComponent } from './crear-rol/crear-rol.component';

const routes: Routes = [
  {
    path: '',
    component: RolesComponent
  },
  {
    path: 'crear',
    component: CrearRolComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesRoutingModule { }
