/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService, DecodificaService, FonteDati, InterventoService, Luogo, RicercaIntervento, Settore, Tipologia, Utente, UtenteService } from 'src/app/modules/motiapi';
import { LogService, UserService, UtilitiesService } from 'src/app/services';
import { TitoloPaginaService } from 'src/app/services/titolo-pagina.service';
import { RicercaInterventoComponent } from '../ricerca-intervento.component';

@Component({
  selector: 'moti-form-ricerca-intervento',
  templateUrl: './form-ricerca-intervento.component.html',
  styleUrls: ['./form-ricerca-intervento.component.scss']
})
export class FormRicercaInterventoComponent implements OnInit {

  @Input() ricercaIntervento: RicercaIntervento;
  @Output() readonly datiRicerca = new EventEmitter<RicercaIntervento>();
  @Output() readonly datiForm = new EventEmitter<RicercaIntervento>();

  elencoFonteDati: FonteDati[] = [];
  elencoReferente: Utente[] = [];
  elencoTipologia: Settore[] = [];
  elencoLuogo: Luogo[] = [];

  selectedReferentes = [];
  selectedLuogos = [];

  formRicercaIntervento: FormGroup = new FormGroup({
    fonteDati: new FormControl(null),
    codIntervento: new FormControl(null),
    titolo: new FormControl(null),
    tipologia: new FormControl(null)
  });

  get fControls() {
    return this.formRicercaIntervento.controls as any;
  }

  constructor(
    private logService: LogService,
    private utilitiesService: UtilitiesService,
    private router: Router,
    private userService: UserService,
    private utenteService: UtenteService,
    private interventoService: InterventoService,
    private decodificaService: DecodificaService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private titoloPaginaService: TitoloPaginaService,
  ) { }

  async ngOnInit() {
    this.logService.info(this.constructor.name, 'ngOnInit');
    this.utilitiesService.showSpinner();

    this.titoloPaginaService.triggerTitolo('SIDEBAR.INT.INTERVENTION.SEARCH');

    if (this.ricercaIntervento) {
      this.formRicercaIntervento.patchValue(this.ricercaIntervento);

      // referente
      if (this.ricercaIntervento.referentes) {
        this.ricercaIntervento.referentes.forEach(utente => {
          this.selectedReferentes.push(utente);
        });
      }

      // luogo
      if (this.ricercaIntervento.luogos) {
        this.ricercaIntervento.luogos.forEach(luogo => {
          this.selectedLuogos.push(luogo);
        });
      }
    }

    const [
      fonteDatis,
      referentes,
      tipologias,
      luogos,
    ] = await Promise.all([
      this.decodificaService.getFonteDati().toPromise(),
      this.utenteService.getReferenti().toPromise(),
      this.decodificaService.getTipologia().toPromise(),
      this.commonService.getLuogo().toPromise(),
    ]);

    this.elencoFonteDati = fonteDatis;
    this.elencoReferente = referentes;
    this.elencoTipologia = tipologias;
    this.elencoLuogo = luogos;

    this.utilitiesService.hideSpinner();
    this.triggerUiUpdate();
  }

  ngOnDestroy() {
    this.saveDataForm();
    this.datiForm.emit(this.ricercaIntervento);
  }

  triggerUiUpdate() {
    // scatena l'evento su cui è in ascolto la direttiva HasValueClass
    this.userService.triggerUiUpdate();
  }

  onClickPulisci() {
    this.formRicercaIntervento.reset();
    this.selectedReferentes = [];
    this.selectedLuogos = [];
    this.triggerUiUpdate();
  }

  btnApplicaDisabled() {
    this.saveDataForm();
    if (this.ricercaIntervento.fonteDati) {
      return false;
    }
    if (this.ricercaIntervento.codIntervento) {
      return false;
    }
    if (this.ricercaIntervento.titolo) {
      return false;
    }
    if (this.ricercaIntervento.tipologia) {
      return false;
    }
    if (this.ricercaIntervento.referentes && this.ricercaIntervento.referentes.length > 0) {
      return false;
    }
    if (this.ricercaIntervento.luogos && this.ricercaIntervento.luogos.length > 0) {
      return false;
    }
    return true;
  }

  onClickApplica() {
    this.saveDataForm();
    this.datiRicerca.emit(this.ricercaIntervento);
  }

  saveDataForm() {
    const fonteDati = this.formRicercaIntervento.get('fonteDati').value;
    const codIntervento = this.formRicercaIntervento.get('codIntervento').value;
    const titolo = this.formRicercaIntervento.get('titolo').value;
    const tipologia: Tipologia = this.formRicercaIntervento.get('tipologia').value;

    // referente
    var referentes = [];
    this.selectedReferentes.forEach(referente => {
      referentes.push(referente);
    });

    // luogo
    var luogos = [];
    this.selectedLuogos.forEach(luogo => {
      luogos.push(luogo);
    });

    this.ricercaIntervento = {};
    this.ricercaIntervento.fonteDati = fonteDati;
    this.ricercaIntervento.codIntervento = codIntervento;
    this.ricercaIntervento.titolo = titolo;
    this.ricercaIntervento.tipologia = tipologia;
    this.ricercaIntervento.referentes = referentes;
    this.ricercaIntervento.luogos = luogos;
  }

}

