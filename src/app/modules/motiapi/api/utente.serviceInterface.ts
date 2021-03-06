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
import { HttpHeaders }                                       from '@angular/common/http';

import { Observable }                                        from 'rxjs';

import { ApiError } from '../model/apiError';
import { Utente } from '../model/utente';


import { Configuration }                                     from '../configuration';


export interface UtenteServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    

    /**
    * 
    * Cancella l&#39;utente per id.
    * @param id L&#39;id dell&#39;utente.
    */
    deleteUtenteById(id: string, extraHttpRequestParams?: any): Observable<string>;

    /**
    * 
    * Restituisce dati registrati su sistema.
    */
    getReferenti(extraHttpRequestParams?: any): Observable<Array<Utente>>;

    /**
    * 
    * Restituisce l&#39;utente per id.
    * @param id L&#39;id dell&#39;utente.
    */
    getUtenteById(id: string, extraHttpRequestParams?: any): Observable<Utente>;

    /**
    * 
    * Restituisce l&#39;utente che effettua la chiamata.
    */
    getUtenteSelf(extraHttpRequestParams?: any): Observable<Utente>;

    /**
    * 
    * Restituisce gli utenti .
    * @param offset Il numero di record da ignorare prima di iniziare a raccogliere i risultati.
    * @param limit Il numero di record da restituire.
    */
    getUtenti(offset?: number, limit?: number, extraHttpRequestParams?: any): Observable<Array<Utente>>;

    /**
    * 
    * Post per cancellare l&#39;utente per id.
    * @param X_HTTP_Method_Override 
    * @param id L&#39;id dell&#39;utente.
    */
    postDeleteUtenteById(X_HTTP_Method_Override: string, id: string, extraHttpRequestParams?: any): Observable<string>;

    /**
    * 
    * Inserisce un utente su sistema.
    * @param utente 
    */
    postUtente(utente: Utente, extraHttpRequestParams?: any): Observable<Utente>;

    /**
    * 
    * Aggiorna l&#39;utente per id.
    * @param id L&#39;id dell&#39;utente.
    * @param utente 
    */
    putUtenteById(id: string, utente: Utente, extraHttpRequestParams?: any): Observable<Utente>;

}
