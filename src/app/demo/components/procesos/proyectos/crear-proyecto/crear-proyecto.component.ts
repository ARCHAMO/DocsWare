import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthUtils } from '../../../../utils/auth-utils';
import { User } from '../../../../models/user.model';
import { GeneralUtils } from '../../../../utils/general-utils';
import { HttpBaseService } from '../../../../service/httpBase.service';
import { ResponseWebApi } from '../../../../api/ResponseWebApi';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Project } from '../../../../models/project.model';

@Component({
    selector: 'app-crear-proyecto',
    templateUrl: './crear-proyecto.component.html',
    styleUrls: ['./crear-proyecto.component.scss']
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
    }

    /**
     *
     */
    submit(): void {
        if (this.formGroupCreate.valid) {
            this.esEdit() ? this.update() : this.save();
        } else {
            this.formGroupCreate.markAllAsTouched();
        }
    }

    /**
     *
     */
    save(): void {
        this._httpBase.postMethod('project', this.formGroupCreate.value).subscribe((response: ResponseWebApi) => {
            this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Inicio sesión', detail: response.message });
            this._router.navigate(['procesos/proyectos']);
        });
    }

    /**
     *
     */
    update(): void {
        this._httpBase.putMethod('project/update/' + this._id, this.formGroupCreate.value).subscribe((response: ResponseWebApi) => {
            this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Inicio sesión', detail: response.message });
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
     */
    getById() {
        this._httpBase.getMethod('project/' + this._id).subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this.formGroupCreate.patchValue(response.data);
                } else {
                    this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Buscar proyectos', detail: response.message });
                }
            },
            error: (error) => {
                this._serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Buscar proyectos', detail: error.message });
            }
        });
    }

}
