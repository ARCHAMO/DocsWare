import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ObjParam } from '../api/objParam';
import { AuthUtils } from '../utils/auth-utils';

@Injectable({
    providedIn: 'root'
})
export class HttpBaseService {

    // baseURL: string = "http://localhost:3977/api/";
    baseURL: string = "/api/";

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
    public postMethod(urlEndpoint: string, params: ObjParam): Observable<any> {
        let headers = new HttpHeaders();
        headers.append("Content-Type", "application/json");
        return this._http.post(this.baseURL + urlEndpoint, params, { 'headers': headers })
    }

    /**
     * Metodo POST utilizado para enviar peticiones al servidor
     * @param url que define el WebApi que será consumido
     * @param params define los body params
     * @param timeZone define si se requiere parametros de zona horaria
     * @param idPermiso define el tipo de permiso que tiene la peticion
     * @param envTempSeg define el enviroment que se utilizara de manera temporal
     * @returns un observable con la respuesta del servidor
   */
    public getMethod(urlEndpoint: string, params: ObjParam[] = []): Observable<any> {
        const authorization: string | null = AuthUtils.getUserToken();
        const headers = { 'content-type': 'application/json', 'Authorization': `${authorization}` }
        return this._http.get(this.baseURL + urlEndpoint, { 'headers': headers })
    }

}
