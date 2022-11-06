import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginasComponent } from './paginas.component';
import { CrearPaginaComponent } from './crear-pagina/crear-pagina.component';

const routes: Routes = [
  {
    path: '',
    component: PaginasComponent
  },
  {
    path: 'crear',
    component: CrearPaginaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaginasRoutingModule { }
