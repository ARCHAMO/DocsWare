import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ResponseWebApi } from 'src/app/demo/api/ResponseWebApi';
import { Project } from 'src/app/demo/models/project.model';
import { User } from 'src/app/demo/models/user.model';
import { HttpBaseService } from 'src/app/demo/service/httpBase.service';
import { AuthUtils } from 'src/app/demo/utils/auth-utils';
import { GeneralUtils } from 'src/app/demo/utils/general-utils';

@Component({
    selector: 'app-crear-modulo',
    templateUrl: './crear-modulo.component.html',
    styleUrls: ['./crear-modulo.component.scss']
})
export class CrearModuloComponent implements OnInit {

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
    public arrayProjects: Project[] = [];
    /**
     * Formulario para crear o editar un modulo
     */
    public formGroupCreate: FormGroup = this._formBuilder.group({
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
        private _activatedRoute: ActivatedRoute

    ) { }

    /**
     *
     */
    ngOnInit(): void {
        this._userLogin = GeneralUtils.cloneObject(AuthUtils.getUserLogin());
        this.formGroupCreate.patchValue({ customerId: this._userLogin.customerId, userCreationId: this._userLogin._id });
        this._id = this._activatedRoute.snapshot.params['id'];
        if (this.esEdit()) this.getById();
        this.getAllProjects();
        this.formGroupCreate.valueChanges.subscribe(forms => {
            console.log(forms);
        })
    }

    /**
     *
     */
    getAllProjects(): void {
        this._httpBase.getMethod('projects').subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.arrayProjects = this.arrayProjects.concat(GeneralUtils.cloneObject(response.data));
                } else {
                    this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Buscar proyectos', detail: response.message });
                }
            },
            error: (error) => {
                this._serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Buscar proyectos', detail: error.message });
            }
        });
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
        this._httpBase.postMethod('module', this.formGroupCreate.value).subscribe((response: ResponseWebApi) => {
            this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Crear modulo', detail: response.message });
            this._router.navigate(['procesos/modulos']);
        });
    }

    /**
     *
     */
    update(): void {
        this._httpBase.putMethod('module/update/' + this._id, this.formGroupCreate.value).subscribe((response: ResponseWebApi) => {
            this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Editar modulo', detail: response.message });
            this._router.navigate(['procesos/modulos']);
        });
    }

    /**
     *
     */
    cancel(): void {
        this._router.navigate(['procesos/modulos']);
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
     */
    getById() {
        this._httpBase.getMethod('module/' + this._id).subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.formGroupCreate.patchValue(response.data);
                } else {
                    this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Buscar modulos', detail: response.message });
                }
            },
            error: (error) => {
                this._serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Buscar modulos', detail: error.message });
            }
        });
    }

}
