import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/demo/models/project.model';
import { HttpBaseService } from '../../../service/httpBase.service';
import { ResponseWebApi } from '../../../api/ResponseWebApi';
import { MessageService } from 'primeng/api';
import { GeneralUtils } from 'src/app/demo/utils/general-utils';
import { Router } from '@angular/router';

@Component({
    selector: 'app-proyectos',
    templateUrl: './proyectos.component.html',
    styleUrls: ['./proyectos.component.scss']
})
export class ProyectosComponent implements OnInit {

    public arrayProjects: Project[] = [];
    public cols: any[] = [];

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
            { header: 'Acciones' },
        ]
        this.findAllProjects();
    }

    findAllProjects() {
        this._httpBase.getMethod('projects').subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.arrayProjects = GeneralUtils.cloneObject(response.data);
                } else {
                    this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Buscar proyectos', detail: response.message });
                }
            },
            error: (error) => {
                this._serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Buscar proyectos', detail: error.message });
            }
        });
    }

    crearNuevo() {
        this._router.navigate(['procesos/proyectos/crear']);
    }

}
