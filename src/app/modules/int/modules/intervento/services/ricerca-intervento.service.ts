/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Injectable } from '@angular/core';
import { RicercaIntervento } from 'src/app/modules/motiapi';
import { LogService } from 'src/app/services';

@Injectable()
export class RicercaInterventoService {

  private ricercaIntervento: RicercaIntervento;

  constructor(
    private logService: LogService
  ) {
    this.logService.info(this.constructor.name, 'constructor', 'RicercaInterventoService');
  }

  setRicercaIntervento(ricercaIntervento: RicercaIntervento) {
    this.ricercaIntervento = ricercaIntervento;
  }

  getRicercaIntervento() {
    return this.ricercaIntervento;
  }

}
