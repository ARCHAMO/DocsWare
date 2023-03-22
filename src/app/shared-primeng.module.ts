import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { DialogModule } from 'primeng/dialog';
import { TreeModule } from 'primeng/tree';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        ContextMenuModule,
        DropdownModule,
        CardModule,
        MenuModule,
        DialogModule,
        TreeModule
    ],
    exports: [
        TableModule,
        ButtonModule,
        InputTextModule,
        ContextMenuModule,
        DropdownModule,
        CardModule,
        MenuModule,
        DialogModule,
        TreeModule
    ]
})
export class SharedPrimengModule { }
