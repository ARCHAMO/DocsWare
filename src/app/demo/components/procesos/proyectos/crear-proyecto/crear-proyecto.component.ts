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
    private _idEdit!: boolean;
    /**
     *
     */
    public _id!: string;
    /**
     *
     */
    private _projectEdit!: Project;

    /**
    * Formulario para crear o editar un modulo
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
    }

    /**
     *
     */
    submit(): void {
        if (this.formGroupCreate.valid) {
            this._httpBase.postMethod('project', this.formGroupCreate.value).subscribe((response: ResponseWebApi) => {
                this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Inicio sesión', detail: response.message });
                this._router.navigate(['procesos/proyectos']);
            });
        } else {
            this.formGroupCreate.markAllAsTouched();
        }

    }

    /**
     *
     */
    cancel(): void {
        this._router.navigate(['procesos/proyectos']);
    }

}
