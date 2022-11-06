import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) },
  { path: 'perfiles', loadChildren: () => import('./perfiles/perfiles.module').then(m => m.PerfilesModule) },
  { path: 'paginas', loadChildren: () => import('./paginas/paginas.module').then(m => m.PaginasModule) },
  { path: 'clientes', loadChildren: () => import('./clientes/clientes.module').then(m => m.ClientesModule) },
  { path: 'usuarios', loadChildren: () => import('./usuarios/usuarios.module').then(m => m.UsuariosModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
