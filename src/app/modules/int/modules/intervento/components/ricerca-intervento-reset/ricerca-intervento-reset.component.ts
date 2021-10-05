/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RicercaIntervento } from 'src/app/modules/motiapi';
import { RicercaInterventoService } from '../../services/ricerca-intervento.service';

@Component({
  selector: 'moti-ricerca-intervento-reset',
  templateUrl: './ricerca-intervento-reset.component.html',
  styleUrls: []
})
export class RicercaInterventoResetComponent implements OnInit {

  constructor(
    private router: Router,
    private ricercaInterventoService: RicercaInterventoService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      var codIntervento = params['codIntervento'];
      var titolo = params['titolo'];
      var ricercaIntervento: RicercaIntervento = {};

      if (codIntervento) {
        ricercaIntervento.codIntervento = codIntervento;

      } else if (titolo) {
        ricercaIntervento.titolo = titolo;

      } else {
        ricercaIntervento = null;
      }
      this.ricercaInterventoService.setRicercaIntervento(ricercaIntervento);

      this.router.navigateByUrl('/int/intervento/ricerca');
    });
  }

}
