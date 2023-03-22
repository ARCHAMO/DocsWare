import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUtils } from '@utils/auth-utils';
import { User } from '@models/user.model';
import { GeneralUtils } from '@utils/general-utils';
import { HttpBaseService } from '@service/httpBase.service';
import { ResponseWebApi } from '@api/ResponseWebApi';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem, MessageService } from 'primeng/api';
import { Module } from '@models/module.model';
import { Project } from '@models/project.model';
import { IconService } from '../../../../service/icon.service';

@Component({
    selector: 'app-crear-proyecto',
    templateUrl: './crear-proyecto.component.html',
    styleUrls: ['./crear-proyecto.component.scss'],
})
export class CrearProyectoComponent implements OnInit {
    /**
     *
     */
    private _userLogin!: User;
    /**
     *
     */
    public _id!: string;
    /**
     *
     */
    public _idModule!: string;
    /**
     *
     */
    public arrayModules: Module[] = [];

    /**
     *
     */
    public arrayFilterModules: Module[] = [];

    /**
     *
     */
    public menuItems: MenuItem[] = [];

    /**
     *
     */
    public moduleSelDetail!: Module;

    /**
     *
     */
    public moduleDialog: boolean = false;

    /**
     *
     */
    public deleteModuleDialog: boolean = false;

    /**
     *
     */
    public arrayIconsList: any[] = [];

    /**
     * Formulario para crear o editar un proyecto
     */
    public formGroupCreate: FormGroup = this._formBuilder.group({
        name: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.required])],
        icon: ['', Validators.compose([Validators.required])],
        customerId: ['', Validators.compose([])],
        userCreationId: ['', Validators.compose([])],
    });

    /**
     * Formulario para crear o editar un modulo
     */
    public formGroupCreateModule: FormGroup = this._formBuilder.group({
        name: ['', Validators.compose([Validators.required])],
        description: ['', Validators.compose([Validators.required])],
        icon: ['', Validators.compose([Validators.required])],
        projectId: ['', Validators.compose([Validators.required])],
        customerId: ['', Validators.compose([])],
        userCreationId: ['', Validators.compose([])],
    });

    /**
     *
     * @param _formBuilder
     */
    constructor(
        private _formBuilder: FormBuilder,
        private _httpBase: HttpBaseService,
        private _router: Router,
        private _serviceMessage: MessageService,
        private _activatedRoute: ActivatedRoute,
        private _iconsService: IconService
    ) {}

    /**
     *
     */
    ngOnInit(): void {
        this._userLogin = GeneralUtils.cloneObject(AuthUtils.getUserLogin());
        this.formGroupCreate.patchValue({
            customerId: this._userLogin.customerId,
            userCreationId: this._userLogin._id,
        });
        this._id = this._activatedRoute.snapshot.params['id'];

        if (this.esEdit()) this.getById();

        this.menuItems = [
            {
                label: 'Ver detalle',
                icon: 'pi pi-eye',
                command: () => this.details(this.moduleSelDetail),
            },
            {
                label: 'Eliminar',
                icon: 'pi pi-eraser',
                command: () => this.delete(this.moduleSelDetail),
            },
        ];

        this.getIconList();
    }

    /**
     *
     */
    submit(): void {
        if (this.formGroupCreate.valid) {
            this.esEdit() ? this.update() : this.save();
        } else {
            for (let i in this.formGroupCreate.controls) {
                this.formGroupCreate.controls[i].markAsDirty();
            }
        }
    }

    /**
     *
     */
    save(): void {
        this._httpBase
            .postMethod('project', this.formGroupCreate.value)
            .subscribe((response: ResponseWebApi) => {
                this._serviceMessage.add({
                    key: 'tst',
                    severity: 'info',
                    summary: 'Inicio sesión',
                    detail: response.message,
                });
                this._router.navigate(['procesos/proyectos']);
            });
    }

    /**
     *
     */
    update(): void {
        this._httpBase
            .putMethod('project/update/' + this._id, this.formGroupCreate.value)
            .subscribe((response: ResponseWebApi) => {
                this._serviceMessage.add({
                    key: 'tst',
                    severity: 'info',
                    summary: 'Inicio sesión',
                    detail: response.message,
                });
                this._router.navigate(['procesos/proyectos']);
            });
    }

    /**
     *
     */
    cancel(): void {
        this._router.navigate(['procesos/proyectos']);
    }

    /**
     *
     * @returns
     */
    esEdit(): boolean {
        return this._id === undefined ? false : true;
    }

    /**
     *
     * @returns
     */
    esEditModule(): boolean {
        return this._idModule === '' ? false : true;
    }

    /**
     *
     */
    getById() {
        this._httpBase.getMethod('project/' + this._id).subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.formGroupCreate.patchValue(response.data);
                    this.findAllModulesForIdProject(response.data._id);
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
    newModule() {
        this._idModule = '';
        this.moduleDialog = true;
    }

    /**
     * Metodo para filtrar los modulos de un proyecto
     * @param evento texto predictivo
     */
    filterModule(evento: any): void {
        const filtro = evento.target.value;
        this.arrayFilterModules = this.arrayModules;
        if (!!filtro) {
            this.arrayFilterModules = this.arrayFilterModules.filter((module) =>
                (module.name + module.description)
                    .toLowerCase()
                    .includes(filtro.toLowerCase())
            );
        }
    }

    /**
     *
     * @param idProject
     */
    findAllModulesForIdProject(idProject: string) {
        this._httpBase.getMethod('modules/project/' + idProject).subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.arrayFilterModules = response.data;
                    this.arrayModules = GeneralUtils.cloneObject(
                        this.arrayFilterModules
                    );
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
     * Metodo para realizar el redireccionamiento a la vista de detalle del vehiculo
     * @param id Codigo unico del registro
     */
    details(module: Module): void {
        this._idModule = module._id;
        this.formGroupCreateModule.patchValue(module);
        this.moduleDialog = true;
    }

    /**
     * Metodo para eliminar un registro especifico por su ID unico
     * @param module Objeto que se va a eliminar
     */
    delete(module: Module): void {
        this._httpBase.delMethod('module/' + module._id).subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.findAllModulesForIdProject(module.projectId);
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
     *
     * @param menu
     * @param event
     * @param module
     */
    toggleMenu(menu: any, event: any, module: Module) {
        this.moduleSelDetail = GeneralUtils.cloneObject(module);
        menu.toggle(event);
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
    hideDialog() {
        this.moduleDialog = false;
        this._idModule = '';
    }

    /**
     *
     */
    submitModule(): void {
        this.formGroupCreateModule.patchValue({
            customerId: this._userLogin.customerId,
            projectId: this._id,
            userCreationId: this._userLogin._id,
        });
        if (this.formGroupCreateModule.valid) {
            this.esEditModule() ? this.updateModule() : this.saveModule();
        } else {
            for (let i in this.formGroupCreateModule.controls) {
                this.formGroupCreateModule.controls[i].markAsDirty();
            }
        }
    }

    /**
     *
     */
    saveModule(): void {
        this._httpBase
            .postMethod('module', this.formGroupCreateModule.value)
            .subscribe((response: ResponseWebApi) => {
                this._serviceMessage.add({
                    key: 'tst',
                    severity: 'info',
                    summary: 'Crear modulo',
                    detail: response.message,
                });
                this.hideDialog();
                this.findAllModulesForIdProject(this._id);
            });
    }

    /**
     *
     */
    updateModule(): void {
        this._httpBase
            .putMethod(
                'module/update/' + this._idModule,
                this.formGroupCreateModule.value
            )
            .subscribe((response: ResponseWebApi) => {
                this._serviceMessage.add({
                    key: 'tst',
                    severity: 'info',
                    summary: 'Editar modulo',
                    detail: response.message,
                });
                this.hideDialog();
                this.findAllModulesForIdProject(this._id);
            });
    }
}
