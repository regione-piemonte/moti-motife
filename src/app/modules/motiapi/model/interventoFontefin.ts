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
import { FonteFinanziamento } from './fonteFinanziamento';
import { Intervento } from './intervento';
import { Utente } from './utente';


export interface InterventoFontefin { 
    dataCancellazione?: Date;
    dataInserimento?: Date;
    dataUltimaModifica?: Date;
    descrizione?: string;
    fonteDati?: FonteDati;
    fonteFinanziamento?: FonteFinanziamento;
    id?: number;
    importoLiquidato?: number;
    importoStanziato?: number;
    intervento?: Intervento;
    note?: string;
    utenteInserimento?: Utente;
    utenteUltimaModifica?: Utente;
}
