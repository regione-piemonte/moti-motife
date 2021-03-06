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
import { Fase } from './fase';
import { Intervento } from './intervento';
import { Utente } from './utente';


export interface InterventoFase { 
    dataCancellazione?: Date;
    dataEffettiva?: Date;
    dataInserimento?: Date;
    dataPrevista?: Date;
    dataUltimaModifica?: Date;
    fase?: Fase;
    id?: number;
    intervento?: Intervento;
    utenteInserimento?: Utente;
    utenteUltimaModifica?: Utente;
}
