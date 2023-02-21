import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ContextMenuModule
    ],
    exports: [
        TableModule,
        ButtonModule,
        InputTextModule,
        ContextMenuModule
    ]
})
export class SharedPrimengModule { }
