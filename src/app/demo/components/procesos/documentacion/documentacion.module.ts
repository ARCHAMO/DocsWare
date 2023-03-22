import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentacionRoutingModule } from './documentacion-routing.module';
import { DocumentacionComponent } from './documentacion.component';
import { CrearDocumentacionComponent } from './crear-documentacion/crear-documentacion.component';
import { SharedPrimengModule } from '../../../../shared-primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [DocumentacionComponent, CrearDocumentacionComponent],
    imports: [
        CommonModule,
        DocumentacionRoutingModule,
        SharedPrimengModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class DocumentacionModule {}
