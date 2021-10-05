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
import { Attuatore } from '../model/attuatore';
import { Fase } from '../model/fase';
import { FonteDati } from '../model/fonteDati';
import { FonteFinanziamento } from '../model/fonteFinanziamento';
import { Ruolo } from '../model/ruolo';
import { Settore } from '../model/settore';
import { SituazioneCriticita } from '../model/situazioneCriticita';
import { StatoAttuaz } from '../model/statoAttuaz';
import { TipoCriticita } from '../model/tipoCriticita';
import { Tipologia } from '../model/tipologia';


import { Configuration }                                     from '../configuration';


export interface DecodificaServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    

    /**
    * 
    * Restituisce dati registrati su sistema.
    * @param tipologia tipologia della fase.
    * @param idFonteDati idFonteDati della fase.
    */
    getFase(tipologia: string, idFonteDati: number, extraHttpRequestParams?: any): Observable<Array<Fase>>;

    /**
    * 
    * Restituisce dati registrati su sistema.
    */
    getFonteDati(extraHttpRequestParams?: any): Observable<Array<FonteDati>>;

    /**
    * 
    * Restituisce dati registrati su sistema.
    */
    getFonteFinanziamento(extraHttpRequestParams?: any): Observable<Array<FonteFinanziamento>>;

    /**
    * 
    * Restituisce dati registrati su sistema.
    */
    getRuolo(extraHttpRequestParams?: any): Observable<Array<Ruolo>>;

    /**
    * 
    * Restituisce dati registrati su sistema.
    */
    getSettore(extraHttpRequestParams?: any): Observable<Array<Settore>>;

    /**
    * 
    * Restituisce dati registrati su sistema.
    */
    getSituazioneCriticita(extraHttpRequestParams?: any): Observable<Array<SituazioneCriticita>>;

    /**
    * 
    * Restituisce dati registrati su sistema.
    */
    getStatoAttuaz(extraHttpRequestParams?: any): Observable<Array<StatoAttuaz>>;

    /**
    * 
    * Restituisce dati registrati su sistema.
    */
    getTipoCriticita(extraHttpRequestParams?: any): Observable<Array<TipoCriticita>>;

    /**
    * 
    * Restituisce dati registrati su sistema.
    */
    getTipologia(extraHttpRequestParams?: any): Observable<Array<Tipologia>>;

    /**
    * 
    * Restituisce dati registrati su sistema.
    * @param attuatore 
    */
    postAttuatore(attuatore: Attuatore, extraHttpRequestParams?: any): Observable<Attuatore>;

    /**
    * 
    * Restituisce dati registrati su sistema.
    * @param attuatore 
    */
    postRicercaAttuatore(attuatore: Attuatore, extraHttpRequestParams?: any): Observable<Array<Attuatore>>;

}
