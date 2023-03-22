import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/demo/models/project.model';
import { HttpBaseService } from '../../../service/httpBase.service';
import { ResponseWebApi } from '../../../api/ResponseWebApi';
import { MenuItem, MessageService } from 'primeng/api';
import { GeneralUtils } from 'src/app/demo/utils/general-utils';
import { Router } from '@angular/router';

@Component({
    selector: 'app-proyectos',
    templateUrl: './proyectos.component.html',
    styleUrls: ['./proyectos.component.scss'],
})
export class ProyectosComponent implements OnInit {
    /**
     *
     */
    public arrayProjects: Project[] = [];

    /**
     *
     */
    public arrayFilterProjects: Project[] = [];

    /**
     *
     */
    public cols: any[] = [];

    /**
     *
     */
    public menuItems: MenuItem[] = [];

    /**
     *
     */
    public projectSelDetail!: Project;

    /**
     *
     * @param _httpBase
     * @param _serviceMessage
     * @param _router
     */
    constructor(
        private _httpBase: HttpBaseService,
        private _serviceMessage: MessageService,
        private _router: Router
    ) {}

    /**
     *
     */
    ngOnInit(): void {
        this.cols = [
            { header: 'Icono' },
            { header: 'Nombre' },
            { header: 'Descripción' },
        ];

        this.menuItems = [
            {
                label: 'Ver detalle',
                icon: 'pi pi-eye',
                command: () => this.details(this.projectSelDetail),
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-eraser',
                command: () => this.delete(this.projectSelDetail),
            },
        ];
        this.findAllProjects();
    }

    /**
     *
     * @param menu
     * @param event
     * @param project
     */
    toggleMenu(menu: any, event: any, project: Project) {
        this.projectSelDetail = GeneralUtils.cloneObject(project);
        menu.toggle(event);
    }

    /**
     *
     */
    findAllProjects() {
        this._httpBase.getMethod('projects').subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.arrayProjects = GeneralUtils.cloneObject(
                        response.data
                    );
                    this.arrayFilterProjects = GeneralUtils.cloneObject(
                        this.arrayProjects
                    );
                } else {
                    this._serviceMessage.add({
                        key: 'tst',
                        severity: 'info',
                        summary: 'Buscar proyectos',
                        detail: response.message,
                    });
                }
            },
            error: (error) => {
                this._serviceMessage.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Buscar proyectos',
                    detail: error.message,
                });
            },
        });
    }

    /**
     *
     */
    newProject() {
        this._router.navigate(['procesos/proyectos/crear']);
    }

    /**
     * Metodo para realizar el redireccionamiento a la vista de detalle del vehiculo
     * @param id Codigo unico del registro
     */
    details(project: Project): void {
        this._router.navigate(['procesos/proyectos/consultar/' + project._id]);
    }

    /**
     * Metodo para eliminar un registro especifico por su ID unico
     * @param project Objeto que se va a eliminar
     */
    delete(project: Project): void {
        this._httpBase.delMethod('project/' + project._id).subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.findAllProjects();
                } else {
                    this._serviceMessage.add({
                        key: 'tst',
                        severity: 'info',
                        summary: 'Eliminando proyecto',
                        detail: response.message,
                    });
                }
            },
            error: (error) => {
                this._serviceMessage.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Eliminando proyectos',
                    detail: error.message,
                });
            },
        });
    }

    /**
     * Metodo para filtrar los proyectos
     * @param evento texto predictivo
     */
    public filterProject(evento: any): void {
        const filtro = evento.target.value;
        this.arrayFilterProjects = this.arrayProjects;
        if (!!filtro) {
            this.arrayFilterProjects = this.arrayProjects.filter((project) =>
                (project.name + project.description)
                    .toLowerCase()
                    .includes(filtro.toLowerCase())
            );
        }
    }
}
