import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoaderService } from '../service/loader.service';
import { AuthUtils } from '../utils/auth-utils';

@Injectable({ providedIn: 'root' })
export class LoaderInterceptor implements HttpInterceptor {

    /**
     * Atributo que define el comportamiento del Spinner
     */
    private count = 0;

    /**
     * Constructor del servicio interceptor
     */
    constructor(private _loaderService: LoaderService) { }

    /**
     * Metodo utilizado para interceptar cada peticion http
     * @param request Objeto con la informacion de respuesta
     * @param next Handler para el manejo de la respuesta
     * @returns Handler con accion a ejecutar
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const authorization: string | null = AuthUtils.getUserToken();

        // header de autorizacion
        if (authorization) {
            request = request.clone({ setHeaders: { Authorization: `${authorization}` } });
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
            request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
        }

        // header del spinner de la peticion
        if (!request.url.includes('assets')) {
            request = request.clone({ setHeaders: { spinner: 'S' } });
            if (request.headers.get('spinner') === 'S') {
                this._loaderService.show();
                this.count++;
            }
        }

        return next.handle(request).pipe(
            finalize(() => {
                if (request.headers.get('spinner') === 'S') {
                    this.count--;
                }
                if (this.count === 0) {
                    this._loaderService.hide();
                }
            }),
            catchError(this.handleError)
        );
    }

    /**
     * Metodo encargado de manejar errores del retorno del interceptor
     * @param error Objeto con la informacion del error
     * @returns Exception generada
     */
    private handleError(error: HttpErrorResponse) {
        return throwError(error);
    }

}
