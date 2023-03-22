import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentacionComponent } from './documentacion.component';
import { CrearDocumentacionComponent } from './crear-documentacion/crear-documentacion.component';

const routes: Routes = [
    {
        path: '',
        component: CrearDocumentacionComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DocumentacionRoutingModule {}
