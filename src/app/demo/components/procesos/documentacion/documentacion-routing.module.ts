import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentacionComponent } from './documentacion.component';

const routes: Routes = [
  {
    path: '',
    component: DocumentacionComponent
  },
  {
    path: 'crear',
    component: DocumentacionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentacionRoutingModule { }
