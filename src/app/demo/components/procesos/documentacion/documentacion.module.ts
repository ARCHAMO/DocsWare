import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentacionRoutingModule } from './documentacion-routing.module';
import { DocumentacionComponent } from './documentacion.component';
import { CrearDocumentacionComponent } from './crear-documentacion/crear-documentacion.component';


@NgModule({
  declarations: [
    DocumentacionComponent,
    CrearDocumentacionComponent
  ],
  imports: [
    CommonModule,
    DocumentacionRoutingModule
  ]
})
export class DocumentacionModule { }
