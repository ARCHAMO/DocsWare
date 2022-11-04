import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationRoutingModule } from './documentation-routing.module';
import { DocumentationComponent } from '../documentation/documentation.component';
import { MenuComponent } from './menu/menu.component';


@NgModule({
  declarations: [
    DocumentationComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    DocumentationRoutingModule
  ]
})
export class DocumentationModule { }
