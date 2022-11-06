import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'proyectos', loadChildren: () => import('./proyectos/proyectos.module').then(m => m.ProyectosModule) },
  { path: 'modulos', loadChildren: () => import('./modulos/modulos.module').then(m => m.ModulosModule) },
  { path: 'documentacion', loadChildren: () => import('./documentacion/documentacion.module').then(m => m.DocumentacionModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcesosRoutingModule { }
