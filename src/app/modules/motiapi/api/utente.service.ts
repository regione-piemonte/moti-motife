/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
/**
 * Moti
 * API per il backend della suite di Moti.
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { ApiError } from '../model/apiError';
import { Utente } from '../model/utente';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration, FormParams }                         from '../configuration';
import { UtenteServiceInterface }                            from './utente.serviceInterface';


@Injectable()
export class UtenteService implements UtenteServiceInterface {

    protected basePath = 'http://localhost:8080/motibe/api/v1';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * 
     * Cancella l&#39;utente per id.
     * @param id L&#39;id dell&#39;utente.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public deleteUtenteById(id: string, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public deleteUtenteById(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public deleteUtenteById(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public deleteUtenteById(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling deleteUtenteById.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.delete<string>(`${this.basePath}/utente/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Restituisce dati registrati su sistema.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getReferenti(observe?: 'body', reportProgress?: boolean): Observable<Array<Utente>>;
    public getReferenti(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Utente>>>;
    public getReferenti(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Utente>>>;
    public getReferenti(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<Utente>>(`${this.basePath}/utente/referenti`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Restituisce l&#39;utente per id.
     * @param id L&#39;id dell&#39;utente.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUtenteById(id: string, observe?: 'body', reportProgress?: boolean): Observable<Utente>;
    public getUtenteById(id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Utente>>;
    public getUtenteById(id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Utente>>;
    public getUtenteById(id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling getUtenteById.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Utente>(`${this.basePath}/utente/${encodeURIComponent(String(id))}`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Restituisce l&#39;utente che effettua la chiamata.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUtenteSelf(observe?: 'body', reportProgress?: boolean): Observable<Utente>;
    public getUtenteSelf(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Utente>>;
    public getUtenteSelf(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Utente>>;
    public getUtenteSelf(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Utente>(`${this.basePath}/utente/self`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Restituisce gli utenti .
     * @param offset Il numero di record da ignorare prima di iniziare a raccogliere i risultati.
     * @param limit Il numero di record da restituire.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getUtenti(offset?: number, limit?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<Utente>>;
    public getUtenti(offset?: number, limit?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<Utente>>>;
    public getUtenti(offset?: number, limit?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<Utente>>>;
    public getUtenti(offset?: number, limit?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (offset !== undefined && offset !== null) {
            queryParameters = queryParameters.set('offset', <any>offset);
        }
        if (limit !== undefined && limit !== null) {
            queryParameters = queryParameters.set('limit', <any>limit);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<Utente>>(`${this.basePath}/utente`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Post per cancellare l&#39;utente per id.
     * @param X_HTTP_Method_Override 
     * @param id L&#39;id dell&#39;utente.
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postDeleteUtenteById(X_HTTP_Method_Override: string, id: string, observe?: 'body', reportProgress?: boolean): Observable<string>;
    public postDeleteUtenteById(X_HTTP_Method_Override: string, id: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public postDeleteUtenteById(X_HTTP_Method_Override: string, id: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public postDeleteUtenteById(X_HTTP_Method_Override: string, id: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (X_HTTP_Method_Override === null || X_HTTP_Method_Override === undefined) {
            throw new Error('Required parameter X_HTTP_Method_Override was null or undefined when calling postDeleteUtenteById.');
        }
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling postDeleteUtenteById.');
        }

        let headers = this.defaultHeaders;
        if (X_HTTP_Method_Override !== undefined && X_HTTP_Method_Override !== null) {
            headers = headers.set('X-HTTP-Method-Override', String(X_HTTP_Method_Override));
        }

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.post<string>(`${this.basePath}/utente/${encodeURIComponent(String(id))}`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Inserisce un utente su sistema.
     * @param utente 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public postUtente(utente: Utente, observe?: 'body', reportProgress?: boolean): Observable<Utente>;
    public postUtente(utente: Utente, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Utente>>;
    public postUtente(utente: Utente, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Utente>>;
    public postUtente(utente: Utente, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (utente === null || utente === undefined) {
            throw new Error('Required parameter utente was null or undefined when calling postUtente.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<Utente>(`${this.basePath}/utente`,
            utente,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * 
     * Aggiorna l&#39;utente per id.
     * @param id L&#39;id dell&#39;utente.
     * @param utente 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public putUtenteById(id: string, utente: Utente, observe?: 'body', reportProgress?: boolean): Observable<Utente>;
    public putUtenteById(id: string, utente: Utente, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Utente>>;
    public putUtenteById(id: string, utente: Utente, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Utente>>;
    public putUtenteById(id: string, utente: Utente, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {
        if (id === null || id === undefined) {
            throw new Error('Required parameter id was null or undefined when calling putUtenteById.');
        }
        if (utente === null || utente === undefined) {
            throw new Error('Required parameter utente was null or undefined when calling putUtenteById.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.put<Utente>(`${this.basePath}/utente/${encodeURIComponent(String(id))}`,
            utente,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
