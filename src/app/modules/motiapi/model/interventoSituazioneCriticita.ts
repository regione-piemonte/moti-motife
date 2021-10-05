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
import { FonteDati } from './fonteDati';
import { Intervento } from './intervento';
import { SituazioneCriticita } from './situazioneCriticita';
import { TipoCriticita } from './tipoCriticita';
import { Utente } from './utente';


export interface InterventoSituazioneCriticita { 
    dataCancellazione?: Date;
    dataInserimento?: Date;
    dataUltimaModifica?: Date;
    descrizione?: string;
    fonteDati?: FonteDati;
    id?: number;
    intervento?: Intervento;
    situazioneCriticita?: SituazioneCriticita;
    situazioneCriticitaDescrizione?: string;
    tipoCriticita?: TipoCriticita;
    utenteInserimento?: Utente;
    utenteUltimaModifica?: Utente;
}