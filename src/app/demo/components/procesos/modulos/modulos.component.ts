import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { ResponseWebApi } from 'src/app/demo/api/ResponseWebApi';
import { HttpBaseService } from 'src/app/demo/service/httpBase.service';
import { GeneralUtils } from 'src/app/demo/utils/general-utils';
import { Module } from '../../../models/module.model';

@Component({
  selector: 'app-modulos',
  templateUrl: './modulos.component.html',
  styleUrls: ['./modulos.component.scss']
})
export class ModulosComponent implements OnInit {

    public arrayModules: Module[] = [];
    public cols: any[] = [];
    public menuItems: MenuItem[] = [];
    public moduleSelDetail!: Module;

    constructor(
        private _httpBase: HttpBaseService,
        private _serviceMessage: MessageService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.cols = [
            { header: 'Icono' },
            { header: 'Nombre' },
            { header: 'Descripción' },
        ]

        this.menuItems = [
            {
                label: 'Ver detalle',
                icon: 'pi pi-eye',
                command: () => this.details(this.moduleSelDetail)
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-eraser',
                command: () => this.delete(this.moduleSelDetail)
            }
        ];
        this.findAllModules();
    }

    findAllModules() {
        this._httpBase.getMethod('modules').subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.arrayModules = GeneralUtils.cloneObject(response.data);
                } else {
                    this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Buscar modulos', detail: response.message });
                }
            },
            error: (error) => {
                this._serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Buscar modulos', detail: error.message });
            }
        });
    }

    createNew() {
        this._router.navigate(['procesos/modulos/crear']);
    }

    /**
     * Metodo para realizar el redireccionamiento a la vista de detalle del vehiculo
     * @param id Codigo unico del registro
     */
    details(module: Module): void {
        this._router.navigate(['procesos/modulos/consultar/' + module._id]);
    }

    /**
     * Metodo para eliminar un registro especifico por su ID unico
     * @param module Objeto que se va a eliminar
     */
     delete(module: Module): void {
        this._httpBase.delMethod('module/' + module._id).subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.findAllModules();
                } else {
                    this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Eliminando modulo', detail: response.message });
                }
            },
            error: (error) => {
                this._serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Eliminando modulo', detail: error.message });
            }
        });
    }
}
