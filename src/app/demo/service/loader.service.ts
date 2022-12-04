import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  /**
   * Atributo que se encarga de manejar los estados de carga en el sistema
   */
  private isLoading = new Subject<boolean>();

  /**
   * Constructor del servicio que maneja los estados en el sistema
   * @param spinner servicio encargado de construir el spinner
   */
  constructor(private _spinner: NgxSpinnerService) { }

  /**
   * Metodo encargado de mostrar el spinner principal
   * @param name nombre del spinner
   */
  public show(name = 'spinnerPrincipal'): void {
    this._spinner.show(name);
    this.isLoading.next(true);
  }

  /**
   * Metodo encargado de ocultar el spinner principal
   * @param name nombre del spinner
   */
  hide(name = 'spinnerPrincipal'): void {
    this._spinner.hide(name);
    this.isLoading.next(false);
  }
}
