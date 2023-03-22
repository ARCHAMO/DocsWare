import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResponseWebApi } from '@api/ResponseWebApi';
import { Module } from '@models/module.model';
import { Project } from '@models/project.model';
import { HttpBaseService } from '@service/httpBase.service';
import { GeneralUtils } from '@utils/general-utils';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { MenuService } from '../../../../service/menu.service';

@Component({
    selector: 'app-crear-documentacion',
    templateUrl: './crear-documentacion.component.html',
    styleUrls: ['./crear-documentacion.component.scss'],
})
export class CrearDocumentacionComponent implements OnInit {
    /**
     *
     */
    public arrayProjects: Project[] = [];

    /**
     *
     */
    public arrayModules: Module[] = [];
    /**
     * Formulario para crear o editar una documentacion
     */
    public formGroupCreate: FormGroup = this._formBuilder.group({
        name: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.required])],
        icon: ['', Validators.compose([Validators.required])],
        customerId: ['', Validators.compose([Validators.required])],
        documentationPadreId: ['', Validators.compose([])],
        htmlData: ['', Validators.compose([])],
        state: ['', Validators.compose([Validators.required])],
        projectId: ['', Validators.compose([])],
        moduloId: ['', Validators.compose([])],
        userCreationId: ['', Validators.compose([])],
    });

    /**
     *
     */
    public nodesMenu: TreeNode[] = [];

    /**
     *
     */
    public selectedFile!: TreeNode;

    /**
     *
     */
    public items!: MenuItem[];

    /**
     *
     * @param _formBuilder
     * @param _httpBase
     * @param _serviceMessage
     * @param _router
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _httpBase: HttpBaseService,
        private _serviceMessage: MessageService,
        private _router: Router,
        private _menuService: MenuService
    ) {}

    /**
     *
     */
    ngOnInit(): void {
        this.findAllProjects();
        this._menuService.getMenu().subscribe((response) => {
            this.nodesMenu = response;
        });
        this.items = [
            {
                label: 'Agregar',
                icon: 'pi pi-search',
                command: (event) => this.addNode(this.selectedFile),
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-times',
                command: (event) => this.removeNode(this.selectedFile),
            },
        ];
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
     * @param node
     */
    addNode(node: TreeNode = {}) {}

    /**
     *
     * @param node
     */
    removeNode(node: TreeNode) {}

    /**
     *
     */
    submit() {}

    /**
     *
     * @param idProject
     */
    findAllModulesForIdProject(idProject: string) {
        this._httpBase.getMethod('modules/project/' + idProject).subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.arrayModules = GeneralUtils.cloneObject(response.data);
                } else {
                    this._serviceMessage.add({
                        key: 'tst',
                        severity: 'info',
                        summary: 'Buscar modulos del proyecto',
                        detail: response.message,
                    });
                }
            },
            error: (error) => {
                this._serviceMessage.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Buscar modulos del proyecto',
                    detail: error.message,
                });
            },
        });
    }
}
