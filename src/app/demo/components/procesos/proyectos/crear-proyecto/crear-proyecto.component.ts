import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-crear-proyecto',
    templateUrl: './crear-proyecto.component.html',
    styleUrls: ['./crear-proyecto.component.scss']
})
export class CrearProyectoComponent implements OnInit {



    /**
    * Formulario para crear o editar un modulo
    */
    public formGroupCreate: FormGroup = this._formBuilder.group({
        nombre: ['', Validators.compose([Validators.required])],
    })

    constructor(
        private _formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
    }

    submit() {

    }

}
