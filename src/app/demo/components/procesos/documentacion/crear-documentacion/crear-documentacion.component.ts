import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseWebApi } from '@api/ResponseWebApi';
import { Module } from '@models/module.model';
import { Project } from '@models/project.model';
import { HttpBaseService } from '@service/httpBase.service';
import { GeneralUtils } from '@utils/general-utils';
import { MenuItem, MessageService, TreeNode } from 'primeng/api';
import { Documentation } from '@models/documentation.model';
import { IconService } from '@service/icon.service';
import { StateService } from '@service/state.service';
import { User } from '@models/user.model';
import { AuthUtils } from '@utils/auth-utils';

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
     *
     */
    public arrayIconsList: any[] = [];

    /**
     *
     */
    public arrayDocumentationModule: Documentation[] = [];

    /**
     *
     */
    public esEdit: boolean = false;
    /**
     *
     */
    public esCrear: boolean = false;
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
    public arrayEstados: Array<any> = [];
    /**
     *
     */
    public arrayDocumentationPadre: Documentation[] = [];

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
     */
    private _userLogin!: User;
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
        private _iconsService: IconService,
        private _stateService: StateService
    ) {}

    /**
     *
     */
    ngOnInit(): void {
        this.findAllProjects();
        this._userLogin = GeneralUtils.cloneObject(AuthUtils.getUserLogin());
        this.formGroupCreate.patchValue({
            customerId: this._userLogin.customerId,
            userCreationId: this._userLogin._id,
        });
        // this._menuService.getMenu().subscribe((response) => {
        //     this.nodesMenu = response;
        // });
        this._stateService.getMenu().subscribe((response) => {
            this.arrayEstados = response;
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
        this.getIconList();
        this.findAllDocumentation();
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
     */
    findAllDocumentation() {
        this._httpBase.getMethod('documentations').subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.arrayDocumentationPadre = GeneralUtils.cloneObject(
                        response.data
                    );
                } else {
                    this._serviceMessage.add({
                        key: 'tst',
                        severity: 'info',
                        summary: 'Buscar documentación',
                        detail: response.message,
                    });
                }
            },
            error: (error) => {
                this._serviceMessage.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Buscar documentación',
                    detail: error.message,
                });
            },
        });
    }

    /**
     *
     */
    cancel() {}

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

    /**
     *
     * @param idProject
     */
    findAllDocumentationForIdModule(idModule: string) {
        this._httpBase.getMethod('documentation/module/' + idModule).subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.arrayDocumentationModule = GeneralUtils.cloneObject(
                        response.data
                    );
                    if (this.arrayDocumentationModule.length === 0) {
                        this.createNodeDocumentationIndex();
                    } else {
                        this.createTreeMenu();
                    }
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

    /**
     *
     */
    createTreeMenu() {
        console.log(this.arrayDocumentationModule);
    }

    /**
     *
     */
    getIconList() {
        this._iconsService.getIconsList().subscribe((result: any) => {
            this.arrayIconsList = GeneralUtils.cloneObject(result);
        });
    }

    /**
     *
     */
    createNodeDocumentationIndex() {
        this.formGroupCreate.patchValue({
            name: 'Inicio',
            description: 'Nodo de inicio del menu',
            icon: 'pi pi-home',
            htmlData: '',
            state: 'Created', // TODO Acharris, Cambiar por Enumerable.
        });

        this._httpBase
            .postMethod('documentation', this.formGroupCreate.value)
            .subscribe({
                next: (response: ResponseWebApi) => {
                    if (response.status === true) {
                        this.arrayDocumentationModule.push(response.data);
                        this.createTreeMenu();
                    } else {
                        this._serviceMessage.add({
                            key: 'tst',
                            severity: 'info',
                            summary: 'Generando token',
                            detail: response.message,
                        });
                    }
                },
                error: (error) => {
                    this._serviceMessage.add({
                        key: 'tst',
                        severity: 'error',
                        summary: 'Generando token',
                        detail: error.message,
                    });
                },
            });
    }
}
