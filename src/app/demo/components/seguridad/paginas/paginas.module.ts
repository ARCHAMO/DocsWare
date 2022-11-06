import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginasRoutingModule } from './paginas-routing.module';
import { PaginasComponent } from './paginas.component';
import { CrearPaginaComponent } from './crear-pagina/crear-pagina.component';


@NgModule({
  declarations: [
    PaginasComponent,
    CrearPaginaComponent
  ],
  imports: [
    CommonModule,
    PaginasRoutingModule
  ]
})
export class PaginasModule { }
