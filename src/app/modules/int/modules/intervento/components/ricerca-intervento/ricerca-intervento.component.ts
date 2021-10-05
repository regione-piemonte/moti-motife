/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbAccordion } from '@ng-bootstrap/ng-bootstrap';
import { PaginationDataChange, SortEvent } from 'src/app/models';
import { InterventoService, PagedResponseIntervento, RicercaIntervento } from 'src/app/modules/motiapi';
import { LogService, UtilitiesService } from 'src/app/services';
import { RicercaInterventoService } from '../../services/ricerca-intervento.service';

@Component({
  selector: 'moti-ricerca-intervento',
  templateUrl: './ricerca-intervento.component.html',
  styleUrls: ['./ricerca-intervento.component.scss']
})
export class RicercaInterventoComponent implements OnInit {

  @ViewChild('accordionRicerca', { static: false }) accordionRicerca: NgbAccordion;
  activeIds = ['panelRicerca'];

  ricercaEffettuata = false;
  currentPaginationData: PaginationDataChange;
  pagedResponse: PagedResponseIntervento;
  ricercaIntervento: RicercaIntervento;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private logService: LogService,
    private utilitiesService: UtilitiesService,
    private interventoService: InterventoService,
    private ricercaInterventoService: RicercaInterventoService,
  ) { }

  ngOnInit() {
    this.initForm();
    this.currentPaginationData = {
      limit: this.activatedRoute.snapshot.params.limit || 10,
      page: this.activatedRoute.snapshot.params.page || 0,
      offset: 0,
      sort: this.activatedRoute.snapshot.params.sort
    };

    var ricercaIntervento = this.ricercaInterventoService.getRicercaIntervento();
    if (ricercaIntervento) {
      this.onCercaIntervento(ricercaIntervento);
    }
  }

  private initForm() {
    const now = new Date();
    // this.formPristine = {
    //   ordineAnnoDa: null,
    // };
    // this.formRicerca = this.formPristine;
  }

  numFiltri() {
    var numFiltri: number = 0;
    if (this.ricercaIntervento) {
      if (this.ricercaIntervento.fonteDati) {
        numFiltri++;
      }
      if (this.ricercaIntervento.codIntervento) {
        numFiltri++;
      }
      if (this.ricercaIntervento.titolo) {
        numFiltri++;
      }
      if (this.ricercaIntervento.tipologia) {
        numFiltri++;
      }
      if (this.ricercaIntervento.luogos && this.ricercaIntervento.luogos.length > 0) {
        numFiltri++;
      }
      if (this.ricercaIntervento.referentes && this.ricercaIntervento.referentes.length > 0) {
        numFiltri++;
      }
    }
    return numFiltri;
  }

  onClickInserisci() {
    this.router.navigateByUrl('/int/intervento');
  }

  onSalvaDatiRicerca(ricercaIntervento: RicercaIntervento) {
    this.logService.info(this.constructor.name, 'onSalvaDatiRicerca');
    this.ricercaIntervento = ricercaIntervento;
  }

  async onCercaIntervento(ricercaIntervento: RicercaIntervento) {
    this.logService.info(this.constructor.name, 'onCercaIntervento');
    this.ricercaIntervento = ricercaIntervento;
    this.ricercaEffettuata = false;

    this.effettuaRicerca(this.currentPaginationData.page, this.currentPaginationData.limit);
  }

  async onChangePaginationData(paginationData: PaginationDataChange) {
    this.effettuaRicerca(paginationData.page, paginationData.limit, paginationData.sort);
  }

  private async effettuaRicerca(page: number, limit: number, sort?: SortEvent) {
    try {
      this.utilitiesService.showSpinner();
      this.ricercaInterventoService.setRicercaIntervento(this.ricercaIntervento);

      this.pagedResponse = await this.interventoService.getRicercaInterventi(
        this.ricercaIntervento,
        page,
        limit,
        sort ? sort.column : undefined,
        sort ? sort.direction : undefined)
        .toPromise();

      this.ricercaEffettuata = true;

      // collassa l'accordion quando la ricerca ottiene dei risultati. Commentare la seguente istruzione per disabilitare l'automatismo
      this.accordionRicerca.collapseAll();

    } catch (e) {
      this.logService.error(this.constructor.name, 'effettuaRicerca', e);
      this.utilitiesService.handleApiErrors(e, 'SIDEBAR.INT.INTERVENTION.TITLE');
    } finally {
      this.utilitiesService.hideSpinner();
    }
  }

}
