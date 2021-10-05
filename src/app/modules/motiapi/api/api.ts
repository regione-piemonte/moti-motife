/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
export * from './common.service';
import { CommonService } from './common.service';
export * from './common.serviceInterface'
export * from './decodifica.service';
import { DecodificaService } from './decodifica.service';
export * from './decodifica.serviceInterface'
export * from './intervento.service';
import { InterventoService } from './intervento.service';
export * from './intervento.serviceInterface'
export * from './utente.service';
import { UtenteService } from './utente.service';
export * from './utente.serviceInterface'
export const APIS = [CommonService, DecodificaService, InterventoService, UtenteService];
