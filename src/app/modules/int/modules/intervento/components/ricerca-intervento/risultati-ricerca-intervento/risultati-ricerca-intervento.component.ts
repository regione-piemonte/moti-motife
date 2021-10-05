/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { PaginationDataChange } from 'src/app/models';
import { Intervento, InterventoService, PagedResponseIntervento, RicercaIntervento } from 'src/app/modules/motiapi';
import { UtilitiesService } from 'src/app/services';
import { Utils } from 'src/app/utils';

@Component({
  selector: 'moti-risultati-ricerca-intervento',
  templateUrl: './risultati-ricerca-intervento.component.html',
  styleUrls: ['./risultati-ricerca-intervento.component.scss']
})
export class RisultatiRicercaInterventoComponent implements OnInit {

  @Input() pagedResponse: PagedResponseIntervento;
  @Input() currentPaginationData: PaginationDataChange;
  @Input() ricercaIntervento: RicercaIntervento;
  @Output() readonly changePaginationData = new EventEmitter<PaginationDataChange>();

  selectedIntervento: Intervento;

  constructor(
    private router: Router,
    private utilitiesService: UtilitiesService,
    private interventoService: InterventoService,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
  }

  onChangePaginationData(event: PaginationDataChange) {
    this.currentPaginationData = event;
    this.changePaginationData.emit(event);
  }

  onInterventoSelect(intervento: Intervento) {
    if (this.selectedIntervento && this.selectedIntervento.id === intervento.id) {
      this.selectedIntervento = undefined;
      return;
    }
    this.selectedIntervento = intervento;
  }

  consultaIntervento(interventoId: string) {
    this.router.navigate(['/int', 'intervento', interventoId], {
      // queryParams: {controlDisabled: true}
    });
  }

  get paginationHeader(): string {
    if (this.pagedResponse.totalElements === 0) {
      return '';
    }
    return this.translateService.instant('PAGINATION.INFO_HEADER', { total: this.pagedResponse.totalElements });
  }

  async onClickEsporta() {
    if (this.pagedResponse.totalElements === 0) {
      return;
    }

    this.utilitiesService.showSpinner();
    try {
		// esporta solo la pagina corrente
      // const res = await this.interventoService.postEsportaListaInterventi(this.pagedResponse, 'response').toPromise();
      const res = await this.interventoService.postEsportaRicercaIntervento(this.ricercaIntervento, 'response').toPromise();
      const fileName = Utils.extractFileNameFromContentDisposition(res.headers.get('Content-Disposition'));
      this.utilitiesService.downloadBlobFile(fileName, res.body);
    } catch (e) {
      this.utilitiesService.handleApiErrors(e, 'SIDEBAR.PBA.INTERVENTION.PRINT_EXCEL');
    } finally {
      this.utilitiesService.hideSpinner();
    }
  }

}
