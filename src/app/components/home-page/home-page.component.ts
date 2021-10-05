/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TitoloPaginaService } from 'src/app/services/titolo-pagina.service';
import { SidebarService, UtilitiesService } from '../../services';

@Component({
  selector: 'moti-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  // @ViewChild('ts', { static: true }) myTabs: NgbTabset;
  tabTitolo: boolean = true;
  tabCode: boolean = false;

  clickTab(tabName: string) {
    if (tabName == 'titolo') {
      this.tabTitolo = true;
      this.tabCode = false;
    } else if (tabName == 'code') {
      this.tabTitolo = false;
      this.tabCode = true;
    }
  }

  formSearchIntervento: FormGroup = new FormGroup({
    titolo: new FormControl(null),
    codIntervento: new FormControl(null)
  });

  constructor(
    private sidebarService: SidebarService,
    private utilitiesService: UtilitiesService,
    private titoloPaginaService: TitoloPaginaService,
    private router: Router
  ) { }

  ngOnInit() {
    this.utilitiesService.hideSpinner();
    this.sidebarService.loadContent(null);
    this.titoloPaginaService.triggerTitolo('APP.TITLE');
    // this.myTabs.select('tabDatiGenerali');
  }

  ngOnDestroy() {
  }

  async onClickCerca(tabName: string) {
    this.utilitiesService.showSpinner();
    try {
      if (tabName == 'titolo') {
        var titolo = this.formSearchIntervento.get('titolo').value;
        if (titolo && !this.isBlank(titolo)) {
          // link diretto alla consultazione
          // var tmpIntervento: Intervento = await this.interventoService.getInterventoByCodIntervento(codIntervento).toPromise();
          // this.router.navigateByUrl('/int/intervento/' + tmpIntervento.id + '');
          this.router.navigateByUrl('/int/intervento/ricerca-reset?titolo=' + titolo);
        }
      }

      if (tabName == 'code') {
        var codIntervento = this.formSearchIntervento.get('codIntervento').value;
        if (codIntervento && !this.isBlank(codIntervento)) {
          // link diretto alla consultazione
          // var tmpIntervento: Intervento = await this.interventoService.getInterventoByCodIntervento(codIntervento).toPromise();
          // this.router.navigateByUrl('/int/intervento/' + tmpIntervento.id + '');
          this.router.navigateByUrl('/int/intervento/ricerca-reset?codIntervento=' + codIntervento);
        }
      }

    } catch (e) {
      this.utilitiesService.handleApiErrors(e, 'SIDEBAR.INT.INTERVENTION.TITLE');
    } finally {
      this.utilitiesService.hideSpinner();
    }
  }

  onClickRicerca() {
    this.router.navigateByUrl('/int/intervento/ricerca-reset');
  }

  onClickInserisci() {
    this.router.navigateByUrl('/int/intervento');
  }

  isBlank(str) {
    return (!str || /^\s*$/.test(str));
  }

}
