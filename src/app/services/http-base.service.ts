import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ObjParam } from '../models/ObjParam';

@Injectable({
  providedIn: 'root'
})
export class HttpBaseService {

  baseURL: string = "http://localhost:3977/api/";

  constructor(private _http: HttpClient) { }

  /**
   * Metodo POST utilizado para enviar peticiones al servidor
   * @param url que define el WebApi que será consumido
   * @param params define los body params
   * @param timeZone define si se requiere parametros de zona horaria
   * @param idPermiso define el tipo de permiso que tiene la peticion
   * @param envTempSeg define el enviroment que se utilizara de manera temporal
   * @returns un observable con la respuesta del servidor
 */
  public postMethod(params: ObjParam): Observable<any> {
    const headers = { 'content-type': 'application/json' }
    const body = JSON.stringify(params);
    return this._http.post(this.baseURL + 'prototiposgenerales/ckeditor', body, { 'headers': headers })
  }

}
