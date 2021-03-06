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
import { Luogo } from '../model/luogo';


import { Configuration }                                     from '../configuration';


export interface CommonServiceInterface {
    defaultHeaders: HttpHeaders;
    configuration: Configuration;
    

    /**
    * 
    * Restituisce dati registrati su sistema.
    */
    getLuogo(extraHttpRequestParams?: any): Observable<Array<Luogo>>;

}
