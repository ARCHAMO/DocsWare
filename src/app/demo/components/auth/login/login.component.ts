import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { HttpBaseService } from '../../../service/httpBase.service';
import { ResponseWebApi } from '../../../api/ResponseWebApi';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent implements OnInit {

    valCheck: string[] = ['remember'];

    password!: string;

    /**
     * Formulario para crear o editar un modulo
     */
    public formGroupLogin: FormGroup = this._formBuilder.group({
        email: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])],
        rememberme: ['', Validators.compose([])]
    })

    constructor(
        public layoutService: LayoutService,
        private _formBuilder: FormBuilder,
        private _httpBase: HttpBaseService,
        private _serviceMessage: MessageService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.initForms();
    }

    /**
     * Inicializa las propiedades de los campos de los formularios utilizados
     */
    initForms(): void {

    }

    /**
     * Metodo que consume el webapi para iniciar sesion
     */
    login(): void {
        const formLogin = this.formGroupLogin?.value;
        this._httpBase.postMethod('user/login', formLogin).subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    this._generateToken();
                    localStorage.setItem('user', JSON.stringify(response.data));
                } else {
                    this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Inicio sesión', detail: response.message });
                }
            },
            error: (error) => {
                this._serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Inicio sesión', detail: error.message });
            }
        });
    }

    private _generateToken(): void {
        const formLogin = this.formGroupLogin?.value;
        formLogin.gethash = true;
        this._httpBase.postMethod('user/login', formLogin).subscribe({
            next: (response: ResponseWebApi) => {
                if (response.status === true) {
                    localStorage.setItem('token', JSON.stringify(response.data.token));
                    localStorage.setItem('isLoggedin', 'true')
                    this._router.navigate(['dashboard']);
                } else {
                    this._serviceMessage.add({ key: 'tst', severity: 'info', summary: 'Generando token', detail: response.message });
                }
            },
            error: (error) => {
                this._serviceMessage.add({ key: 'tst', severity: 'error', summary: 'Generando token', detail: error.message });
            }
        });
    }
}
