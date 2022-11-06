import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilesComponent } from './perfiles.component';
import { CrearPerfilComponent } from './crear-perfil/crear-perfil.component';

const routes: Routes = [
  {
    path: '',
    component: PerfilesComponent
  },
  {
    path: 'crear',
    component: CrearPerfilComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilesRoutingModule { }
