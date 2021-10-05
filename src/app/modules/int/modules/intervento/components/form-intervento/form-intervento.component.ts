/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Component, ElementRef, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Attuatore, CommonService, DecodificaService, Fase, FonteDati, FonteFinanziamento, Intervento, InterventoCosti, InterventoFase, InterventoFontefin, InterventoLuogo, InterventoReferente, InterventoService, InterventoSituazioneCriticita, Luogo, Settore, SituazioneCriticita, StatoAttuaz, TipoCriticita, Utente, UtenteService } from 'src/app/modules/motiapi';
import { LogService, UserService, UtilitiesService } from 'src/app/services';
import { Utils } from 'src/app/utils';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TitoloPaginaService } from 'src/app/services/titolo-pagina.service';

@Component({
  selector: 'moti-form-intervento',
  templateUrl: './form-intervento.component.html',
  styleUrls: ['./form-intervento.component.scss']
})
export class FormInterventoComponent implements OnInit {

  @ViewChild('refElReferente', { static: false }) refElReferente: any;
  @ViewChild('refElLuogo', { static: false }) refElLuogo: any;

  @ViewChild('modalConfirmElimina', { static: false }) modalConfirmElimina: any;
  @ViewChild('modalInsert', { static: false }) modalInsert: any;
  @ViewChild('modalUpdate', { static: false }) modalUpdate: any;
  @ViewChild('modalDelete', { static: false }) modalDelete: any;
  @ViewChild('modalBack', { static: false }) modalBack: any;

  @ViewChild('modalRicercaAttuatore', { static: false }) modalRicercaAttuatore: any;
  @ViewChild('modalAttuatoreNonTrovato', { static: false }) modalAttuatoreNonTrovato: any;
  @ViewChild('modalInserisciAttuatore', { static: false }) modalInserisciAttuatore: any;
  @ViewChild('modalConfirmInserisci', { static: false }) modalConfirmInserisci: any;


  public MODAL_TIMEOUT: number = 3000;

  public FONTE_DATI_NUOVO_OIMP_ID: number = 1;
  public FONTE_DATI_NUOVO_MOTI_ID: number = 2;
  public FONTE_DATI_NUOVO_OTI_ID: number = 3;
  public FONTE_DATI_NUOVO_MOTI_DESC: string = "MOTI";

  utente: Utente;
  intervento: Intervento;
  initialIntervento: Intervento;
  controlDisabled: boolean = false;

  elencoFonteDati: FonteDati[] = [];
  elencoReferente: Utente[] = [];
  elencoSettore: Settore[] = [];
  elencoTipologia: Settore[] = [];
  elencoLuogo: Luogo[] = [];
  elencoStatoAttuaz: StatoAttuaz[] = [];
  elencoFaseProgrammazione: Fase[] = [];
  elencoFaseRealizzazione: Fase[] = [];
  elencoSituazioneCriticita: SituazioneCriticita[] = [];
  elencoTipoCriticita: TipoCriticita[] = [];
  elencoFonteFinanziamento: FonteFinanziamento[] = [];

  fonteDatiMoti: FonteDati;

  selectedReferentes = [];
  selectedLuogos = [];

  bFaseProgrammazioneValid: boolean = true;
  bFaseRealizzazioneValid: boolean = true;
  bCriticitaValid: boolean = true;
  bFinanziamentoValid: boolean = true;

  activeIds = ['panelDatiGenerali', 'panelStatiDiAttuazione'];
  saveBtnDisabled: boolean = false;

  formIntervento: FormGroup = new FormGroup({
    id: new FormControl({ value: null, disabled: true }),
    optlock: new FormControl({ value: null, disabled: true }),
    codIntervento: new FormControl(null, [Validators.required]),
    titolo: new FormControl(null, [Validators.required]),
    fonteDati: new FormControl({ value: null, disabled: true }),
    settore: new FormControl(null, [Validators.required]),
    // attuatore: new FormControl(null, [Validators.required]),
    tipologia: new FormControl(null, [Validators.required]),
    // cup: new FormControl(null, Validators.compose([ this.isLengthValid, primaAnnualitaValidator(1, 2) ])),
    // cup: new FormControl(null, Validators.compose([ this.isLengthValid ])),
    cup: new FormControl(null, Validators.compose([control => this.validateLength(control, 15)])),
    cig: new FormControl(null, Validators.compose([control => this.validateLength(control, 10)])),
    descrTecnica: new FormControl(),
    statoAttuaz: new FormControl(null, [Validators.required]),

    fonteDatiProgrammazione: new FormControl(),
    noteProgrammazione: new FormControl(),
    fonteDatiRealizzazione: new FormControl(),
    noteRealizzazione: new FormControl(),

    fasiProgrammazione: this.formBuilder.array([]),
    fasiRealizzazione: this.formBuilder.array([]),

    criticita: this.formBuilder.array([]),

    attuatoreObj: new FormGroup({
      id: new FormControl(),
      descrizione: new FormControl(null, [Validators.required]),
      codiceFiscale: new FormControl()
    }),

    costi: new FormGroup({
      costoPrevisto: new FormControl(),
      fonteRiferimento: new FormControl(),
      fonteDati: new FormControl(),
      dataUltimaLiquidazione: new FormControl(),
      noteEconomiche: new FormControl()
    }),

    finanziamenti: this.formBuilder.array([]),

    datiOti: new FormGroup({
      annoInizioLavori: new FormControl({ value: null, disabled: true }),
      annoProssimaFase: new FormControl({ value: null, disabled: true }),
      annoUltimazioneOpera: new FormControl({ value: null, disabled: true }),
      dataUltimoAggiornamento: new FormControl({ value: null, disabled: true }),
      descrizioneProgettazione: new FormControl({ value: null, disabled: true }),
      dettagliProssimaFase: new FormControl({ value: null, disabled: true }),
      dettaglioCosti: new FormControl({ value: null, disabled: true }),
      finanziamentiDisponibili: new FormControl({ value: null, disabled: true }),
      finanziamentiNonDisponibili: new FormControl({ value: null, disabled: true }),
      rispettoTempi: new FormControl({ value: null, disabled: true }),
      soggettiCoinvolti: new FormControl({ value: null, disabled: true })
    })

  });

  formModalRicercaAttuatore: FormGroup = new FormGroup({
    descrizione: new FormControl(),
    codiceFiscale: new FormControl()
  });
  modalElencoAttuatori: Attuatore[];
  attuatoreSelected: boolean = false;
  messageConfirmInsert: string;

  formModalInserisciAttuatore: FormGroup = new FormGroup({
    descrizione: new FormControl(null, [Validators.required]),
    codiceFiscale: new FormControl(null, [Validators.required])
  });

  isLengthValid(control: AbstractControl) {
    const value = control.value;
    if (value.length != 15) {
      return { wrongLength: true };
    }
  }

  validateLength(control: AbstractControl, length: number) {
    const value = control.value;
    if (value !== undefined && value && value != '') {
      if (value.length != length) {
        return {
          wrongLength: true
        };
      }
    }
  }

  get fControls() {
    return this.formIntervento.controls as any;
  }
  get fFasiProgrammazione() {
    return this.fControls.fasiProgrammazione as FormArray;
  }
  get fFasiRealizzazione() {
    return this.fControls.fasiRealizzazione as FormArray;
  }
  get fCriticita() {
    return this.fControls.criticita as FormArray;
  }
  get fFinanziamenti() {
    return this.fControls.finanziamenti as FormArray;
  }
  get fCosti() {
    return this.fControls.costi as FormGroup;
  }
  get fDatiOti() {
    return this.fControls.datiOti as FormGroup;
  }

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private utenteService: UtenteService,
    private userService: UserService,
    private utilitiesService: UtilitiesService,
    private logService: LogService,
    private interventoService: InterventoService,
    private translateService: TranslateService,
    private modalService: NgbModal,
    private decodificaService: DecodificaService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private titoloPaginaService: TitoloPaginaService,
  ) {
  }

  async ngOnInit() {
    this.logService.info(this.constructor.name, 'ngOnInit');
    this.utilitiesService.showSpinner();
    let tmpIntervento;
    // data e' restituito dal resolver, ha una proprieta' intervento definita nel routing
    // inizializzato l'oggetto
    this.subscriptions.push(
      this.route.data.subscribe((data: { intervento: Intervento }) => tmpIntervento = data.intervento),
      // this.route.queryParams.subscribe(queryParams => this.controlDisabled = queryParams.controlDisabled === 'true'),
    );
    this.utente = await this.utenteService.getUtenteSelf().toPromise();

    await this.initIntervento(tmpIntervento);
    this.formIntervento.patchValue(this.initialIntervento);

    if (this.initialIntervento.id) {
      this.controlDisabled = true;
      this.titoloPaginaService.triggerTitolo('SIDEBAR.INT.INTERVENTION.CONSULT');
    } else {
      this.titoloPaginaService.triggerTitolo('SIDEBAR.INT.INTERVENTION.INSERT');
    }

    // referente
    if (this.initialIntervento.interventoReferentes) {
      this.initialIntervento.interventoReferentes.forEach(interventoReferente => {
        this.selectedReferentes.push(interventoReferente.utente);
      });
    }

    // luogo
    if (this.initialIntervento.interventoLuogos) {
      this.initialIntervento.interventoLuogos.forEach(interventoLuogo => {
        this.selectedLuogos.push(interventoLuogo.luogo);
      });
    }

    this.formIntervento.controls.fasiProgrammazione = this.formBuilder.array([]);
    this.formIntervento.controls.fasiRealizzazione = this.formBuilder.array([]);
    this.formIntervento.controls.criticita = this.formBuilder.array([]);
    this.formIntervento.controls.finanziamenti = this.formBuilder.array([]);

    // fasi
    if (this.initialIntervento.interventoFases) {
      this.initialIntervento.interventoFases.forEach(interventoFase => {
        if (interventoFase.fase.tipologia == 'Programmazione') {
          this.fFasiProgrammazione.push(
            this.formBuilder.group({
              fase: interventoFase.fase,
              dataPrevista: interventoFase.dataPrevista,
              dataEffettiva: interventoFase.dataEffettiva
            })
          );
        } else if (interventoFase.fase.tipologia == 'Realizzazione') {
          this.fFasiRealizzazione.push(
            this.formBuilder.group({
              fase: interventoFase.fase,
              dataPrevista: interventoFase.dataPrevista,
              dataEffettiva: interventoFase.dataEffettiva
            })
          );
        }
      });
    }

    // criticità
    if (this.initialIntervento.interventoSituazioneCriticitas) {
      this.initialIntervento.interventoSituazioneCriticitas.sort(
        function (a, b) {
          return (a.situazioneCriticita.id > b.situazioneCriticita.id) ? 1 : -1;
        }
      );
      this.initialIntervento.interventoSituazioneCriticitas.forEach(interventoSituazioneCriticita => {
        this.fCriticita.push(
          this.formBuilder.group({
            situazioneCriticita: interventoSituazioneCriticita.situazioneCriticita,
            tipoCriticita: interventoSituazioneCriticita.tipoCriticita,
            descrizione: interventoSituazioneCriticita.descrizione,
            fonteDati: interventoSituazioneCriticita.fonteDati
          })
        );
      });
    }

    // finanziamenti
    if (this.initialIntervento.interventoFontefins) {
      this.initialIntervento.interventoFontefins.forEach(interventoFontefin => {
        this.fFinanziamenti.push(
          this.formBuilder.group({
            fonteFinanziamento: interventoFontefin.fonteFinanziamento,
            descrizione: interventoFontefin.descrizione,
            importoStanziato: interventoFontefin.importoStanziato,
            importoLiquidato: interventoFontefin.importoLiquidato,
            fonteDati: interventoFontefin.fonteDati,
            note: interventoFontefin.note
          })
        );
      });
    }

    // costi
    if (this.initialIntervento.interventoCostis) {
      this.initialIntervento.interventoCostis.forEach(interventoCosti => {
        this.fCosti.patchValue(interventoCosti);
      });
    }

    // dati oti
    if (this.initialIntervento.interventoDatiOtis) {
      this.initialIntervento.interventoDatiOtis.forEach(interventoDatiOti => {
        this.fDatiOti.patchValue(interventoDatiOti);
      });
    }

    const [
      fonteDatis,
      referentes,
      settores,
      tipologias,
      luogos,
      statoAttuazs,
      faseProgrammaziones,
      faseRealizzaziones,
      situazioneCriticitas,
      tipoCriticitas,
      fonteFinanziamentos
    ] = await Promise.all([
      this.decodificaService.getFonteDati().toPromise(),
      this.utenteService.getReferenti().toPromise(),
      this.decodificaService.getSettore().toPromise(),
      this.decodificaService.getTipologia().toPromise(),
      this.commonService.getLuogo().toPromise(),
      this.decodificaService.getStatoAttuaz().toPromise(),
      this.decodificaService.getFase('Programmazione', this.FONTE_DATI_NUOVO_MOTI_ID).toPromise(),
      this.decodificaService.getFase('Realizzazione', this.FONTE_DATI_NUOVO_MOTI_ID).toPromise(),
      this.decodificaService.getSituazioneCriticita().toPromise(),
      this.decodificaService.getTipoCriticita().toPromise(),
      this.decodificaService.getFonteFinanziamento().toPromise(),
    ]);

    this.elencoFonteDati = fonteDatis;
    this.elencoReferente = referentes;
    this.elencoSettore = settores;
    this.elencoTipologia = tipologias;
    this.elencoLuogo = luogos;
    this.elencoStatoAttuaz = statoAttuazs;
    this.elencoFaseProgrammazione = faseProgrammaziones;
    this.elencoFaseRealizzazione = faseRealizzaziones;
    this.elencoSituazioneCriticita = situazioneCriticitas;
    this.elencoTipoCriticita = tipoCriticitas;
    this.elencoFonteFinanziamento = fonteFinanziamentos;

    this.elencoFonteDati.forEach(fonteDati => {
      if (fonteDati.id == this.FONTE_DATI_NUOVO_MOTI_ID) {
        this.fonteDatiMoti = fonteDati;
      }
    });

    this.utilitiesService.hideSpinner();
    this.changeFormState();

    this.triggerUiUpdate();

    if (this.selectedReferentes.length == 0) {
      if (this.refElReferente) {
        this.refElReferente.element.classList.add('is-invalid');
      }
    }
    if (this.selectedLuogos.length == 0) {
      if (this.refElLuogo) {
        this.refElLuogo.element.classList.add('is-invalid');
      }
    }

  }

  private async initIntervento(tmpIntervento: Intervento) {
    if (!tmpIntervento || !tmpIntervento.codIntervento) {
      this.initialIntervento = {
        id: null,
        titolo: null,
        codIntervento: null,
        fonteDati: {
          id: this.FONTE_DATI_NUOVO_MOTI_ID,
          descrizione: this.FONTE_DATI_NUOVO_MOTI_DESC
        },
        settore: null,
        // attuatore: null,
        tipologia: null,
        cup: null,
        cig: null,
        descrTecnica: null,
        statoAttuaz: null
        // attuatoreObj: null
      }
      this.intervento = Utils.clone(this.initialIntervento);
    } else {
      this.intervento = tmpIntervento;
      this.initialIntervento = Utils.clone(this.intervento);

      this.modalElencoAttuatori = [];
      this.modalElencoAttuatori.push(this.initialIntervento.attuatoreObj);
    }

    this.logService.debug(this.constructor.name, 'initIntervento', 'intervento', this.intervento);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.intervento && !changes.intervento.isFirstChange()) {
      this.logService.info(this.constructor.name, 'ngOnChanges', changes.intervento.currentValue);
      this.formIntervento.patchValue(changes.intervento.currentValue);
    }
  }

  // Enable/disable form control
  private changeFormState() {
    this.logService.debug(this.constructor.name, 'changeFormState', 'controlDisabled', this.controlDisabled, typeof this.controlDisabled);
    const fnc = this.controlDisabled ? 'disable' : 'enable';
    this.logService.debug(this.constructor.name, 'changeFormState', 'fnc', fnc);

    var fncCodIntervento = 'disable';
    var fncTitolo = fnc;
    var fncDescrTecnica = fnc;
    var fncStatoAttuaz = fnc;
    var fncCostoPrevisto = fnc;

    if (!this.initialIntervento.id) {
      fncCodIntervento = 'enable';
    }

    const bFonteDatiMoti: boolean = this.initialIntervento.fonteDati.id == this.FONTE_DATI_NUOVO_MOTI_ID;
    const bFonteDatiOimp: boolean = this.initialIntervento.fonteDati.id == this.FONTE_DATI_NUOVO_OIMP_ID;
    const bFonteDatiOti: boolean = this.initialIntervento.fonteDati.id == this.FONTE_DATI_NUOVO_OTI_ID;

    if (bFonteDatiOimp || bFonteDatiOti) {
      fncTitolo = 'disable';
    }
    if (bFonteDatiOti) {
      fncDescrTecnica = 'disable';
      fncStatoAttuaz = 'disable';
      fncCostoPrevisto = 'disable';
    }

    // attenzione che vengono abilitati anche i dati del prodotto.
    this.formIntervento.controls.codIntervento[fncCodIntervento]();
    this.formIntervento.controls.titolo[fncTitolo]();
    // this.formIntervento.controls.fonteDati[fnc]();
    this.formIntervento.controls.settore[fnc]();

    // this.formIntervento.controls.attuatore[fnc]();
    this.formIntervento.controls.attuatoreObj[fnc]();

    this.formIntervento.controls.tipologia[fnc]();
    this.formIntervento.controls.cup[fnc]();
    this.formIntervento.controls.cig[fnc]();
    this.formIntervento.controls.descrTecnica[fncDescrTecnica]();

    this.formIntervento.controls.statoAttuaz[fncStatoAttuaz]();
    this.formIntervento.controls.fonteDatiProgrammazione[fnc]();
    this.formIntervento.controls.noteProgrammazione[fnc]();
    this.formIntervento.controls.fonteDatiRealizzazione[fnc]();
    this.formIntervento.controls.noteRealizzazione[fnc]();

    this.refElReferente.setDisabledState(this.controlDisabled);
    this.refElLuogo.setDisabledState(this.controlDisabled);

    // fase
    this.fFasiProgrammazione.controls.forEach((riga, index) => {
      const fase = riga.get('fase').value;
      var fncFase = fnc;
      if (fase && fase.fonteDati.id != this.FONTE_DATI_NUOVO_MOTI_ID) {
        fncFase = 'disable';
      }
      riga.get('fase')[fncFase]();
      riga.get('dataPrevista')[fncFase]();
      riga.get('dataEffettiva')[fncFase]();
    });
    this.fFasiRealizzazione.controls.forEach((riga, index) => {
      const fase = riga.get('fase').value;
      var fncFase = fnc;
      if (fase && fase.fonteDati.id != this.FONTE_DATI_NUOVO_MOTI_ID) {
        fncFase = 'disable';
      }
      riga.get('fase')[fncFase]();
      riga.get('dataPrevista')[fncFase]();
      riga.get('dataEffettiva')[fncFase]();
    });

    // criticità
    this.fCriticita.controls.forEach((riga, index) => {
      const fonteDati = riga.get('fonteDati').value;
      var fncCriticita = fnc;
      if (fonteDati && fonteDati.id != this.FONTE_DATI_NUOVO_MOTI_ID) {
        fncCriticita = 'disable';
      }
      riga.get('situazioneCriticita')[fncCriticita]();
      riga.get('tipoCriticita')[fncCriticita]();
      riga.get('descrizione')[fncCriticita]();
    });

    // finanziamenti
    this.fFinanziamenti.controls.forEach((riga, index) => {
      const fonteDati = riga.get('fonteDati').value;
      var fncFinanziamenti = fnc;
      if (fonteDati && fonteDati.id != this.FONTE_DATI_NUOVO_MOTI_ID) {
        fncFinanziamenti = 'disable';
      }
      riga.get('fonteFinanziamento')[fncFinanziamenti]();
      riga.get('descrizione')[fncFinanziamenti]();
      riga.get('importoStanziato')[fncFinanziamenti]();
      riga.get('importoLiquidato')[fncFinanziamenti]();
      riga.get('note')[fncFinanziamenti]();
    });

    this.fCosti.controls.costoPrevisto[fncCostoPrevisto]();
    this.fCosti.controls.fonteRiferimento[fnc]();
    this.fCosti.controls.fonteDati[fnc]();
    this.fCosti.controls.dataUltimaLiquidazione[fnc]();
    this.fCosti.controls.noteEconomiche[fnc]();
  }

  async onBack() {
    if (this.initialIntervento.id && !this.controlDisabled) {
      await this.modalService.open(this.modalBack, { size: 'lg', scrollable: true }).result;
    } else {
      // this.router.navigateByUrl('/home');
      const [url] = this.userService.getNavigationStack.slice(-1);
      if (url && url.url) {
        this.router.navigateByUrl(url.url);
      } else {
        this.router.navigateByUrl('/int/intervento/ricerca');
      }
      // this.userService.back();
    }
  }

  onModalBackClose(modal) {
    modal.close();
    // this.router.navigateByUrl('/home');
    this.router.navigateByUrl('/int/intervento/ricerca');
    // this.userService.back();
  }

  onModalBackSave(modal) {
    modal.close();
    this.onClickSalva();
  }

  async onClickSalva() {
    this.logService.info(this.constructor.name, 'onClickSalva');
    var tmpIntervento: Intervento = this.formIntervento.getRawValue() as Intervento;

    // const fonteDati = this.formIntervento.get('fonteDati').value;
    // this.logService.info(this.constructor.name, 'onClickSalva', 'fonteDati: ' + fonteDati);

    // referente
    tmpIntervento.interventoReferentes = [];
    this.selectedReferentes.forEach(referente => {
      var interventoReferente: InterventoReferente = {};
      interventoReferente.utente = referente;
      tmpIntervento.interventoReferentes.push(interventoReferente);
    });

    // luogo
    tmpIntervento.interventoLuogos = [];
    this.selectedLuogos.forEach(luogo => {
      var interventoLuogo: InterventoLuogo = {};
      interventoLuogo.luogo = luogo;
      tmpIntervento.interventoLuogos.push(interventoLuogo);
    });

    // fasi
    tmpIntervento.interventoFases = [];
    this.fFasiProgrammazione.getRawValue().map(riga => {
      var interventoFase: InterventoFase = {};
      interventoFase.dataEffettiva = riga.dataEffettiva;
      interventoFase.dataPrevista = riga.dataPrevista;
      interventoFase.fase = riga.fase;
      tmpIntervento.interventoFases.push(interventoFase);
    });
    this.fFasiRealizzazione.getRawValue().map(riga => {
      var interventoFase: InterventoFase = {};
      interventoFase.dataEffettiva = riga.dataEffettiva;
      interventoFase.dataPrevista = riga.dataPrevista;
      interventoFase.fase = riga.fase;
      tmpIntervento.interventoFases.push(interventoFase);
    });

    // criticità
    tmpIntervento.interventoSituazioneCriticitas = [];
    this.fCriticita.getRawValue().map(riga => {
      var interventoSituazioneCriticita: InterventoSituazioneCriticita = {};
      interventoSituazioneCriticita.situazioneCriticita = riga.situazioneCriticita;
      interventoSituazioneCriticita.tipoCriticita = riga.tipoCriticita;
      interventoSituazioneCriticita.descrizione = riga.descrizione;
      interventoSituazioneCriticita.fonteDati = riga.fonteDati;
      tmpIntervento.interventoSituazioneCriticitas.push(interventoSituazioneCriticita);
    });

    // finanziamenti
    tmpIntervento.interventoFontefins = [];
    this.fFinanziamenti.getRawValue().map(riga => {
      var interventoFontefin: InterventoFontefin = {};
      interventoFontefin.fonteFinanziamento = riga.fonteFinanziamento;
      interventoFontefin.descrizione = riga.descrizione;
      interventoFontefin.importoStanziato = riga.importoStanziato;
      interventoFontefin.importoLiquidato = riga.importoLiquidato;
      interventoFontefin.fonteDati = riga.fonteDati;
      interventoFontefin.note = riga.note;
      tmpIntervento.interventoFontefins.push(interventoFontefin);
    });

    // costi
    var interventoCosti: InterventoCosti;
    interventoCosti = this.fCosti.getRawValue() as InterventoCosti;
    tmpIntervento.interventoCostis = [];
    tmpIntervento.interventoCostis.push(interventoCosti);

    this.logService.info(this.constructor.name, 'onClickSalva', 'tmpIntervento: ' + tmpIntervento);
    this.utilitiesService.showSpinner();
    try {
      if (this.initialIntervento.id) {
        tmpIntervento = await this.interventoService.putInterventoById(this.initialIntervento.id, tmpIntervento).toPromise();
        this.utilitiesService.hideSpinner();

        setTimeout(() => {
          this.modalService.dismissAll();
          // this.router.navigateByUrl('/home');
          // this.router.navigateByUrl('/int/intervento/ricerca-reset?codIntervento=' + tmpIntervento.codIntervento);
          this.router.navigateByUrl('/int/intervento/ricerca');
        }, this.MODAL_TIMEOUT);

        await this.modalService.open(this.modalUpdate, { size: 'lg', scrollable: true }).result;
      } else {
        tmpIntervento = await this.interventoService.postIntervento(tmpIntervento).toPromise();
        this.utilitiesService.hideSpinner();

        setTimeout(() => {
          this.modalService.dismissAll();
          // this.router.navigateByUrl('/home');
          this.router.navigateByUrl('/int/intervento/ricerca-reset?codIntervento=' + tmpIntervento.codIntervento);
        }, this.MODAL_TIMEOUT);

        await this.modalService.open(this.modalInsert, { size: 'lg', scrollable: true }).result;
      }

    } catch (e) {
      this.utilitiesService.hideSpinner();
      this.utilitiesService.handleApiErrors(e, 'SIDEBAR.INT.INTERVENTION.TITLE');
    }
  }

  triggerUiUpdate() {
    // scatena l'evento su cui è in ascolto la direttiva HasValueClass
    this.userService.triggerUiUpdate();
  }

  aggiungiFaseProgrammazione() {
    this.fFasiProgrammazione.push(
      this.formBuilder.group({
        fase: new FormControl(null, [Validators.required]),
        dataPrevista: null,
        dataEffettiva: null
      })
    );
    this.bFaseProgrammazioneValid = false;
    this.triggerUiUpdate();
  }

  eliminaFaseProgrammazione(index) {
    this.fFasiProgrammazione.removeAt(index);
    this.verificaFaseProgrammazione(0);
  }

  btnEliminaFaseProgrammazioneEnabled(index) {
    const riga = this.fFasiProgrammazione.at(index);
    const fase = riga.get('fase').value;
    if (fase && fase.fonteDati.id != this.FONTE_DATI_NUOVO_MOTI_ID) {
      return false;
    }
    return true;
  }

  aggiungiFaseRealizzazione() {
    this.fFasiRealizzazione.push(
      this.formBuilder.group({
        fase: new FormControl(null, [Validators.required]),
        dataPrevista: null,
        dataEffettiva: null
      })
    );
    this.bFaseRealizzazioneValid = false;
    this.triggerUiUpdate();
  }

  eliminaFaseRealizzazione(index) {
    this.fFasiRealizzazione.removeAt(index);
    this.verificaFaseRealizzazione(0);
  }

  btnEliminaFaseRealizzazioneEnabled(index) {
    const riga = this.fFasiRealizzazione.at(index);
    const fase = riga.get('fase').value;
    if (fase && fase.fonteDati.id != this.FONTE_DATI_NUOVO_MOTI_ID) {
      return false;
    }
    return true;
  }

  aggiungiCriticita() {
    this.fCriticita.push(
      this.formBuilder.group({
        situazioneCriticita: new FormControl(null, [Validators.required]),
        tipoCriticita: new FormControl(null, [Validators.required]),
        descrizione: new FormControl(null, [Validators.required]),
        fonteDati: this.fonteDatiMoti
      })
    );
    this.bCriticitaValid = false;
    this.triggerUiUpdate();
  }

  eliminaCriticita(index) {
    this.fCriticita.removeAt(index);
    this.verificaCriticita(0);
  }

  btnEliminaCriticitaEnabled(index) {
    const riga = this.fCriticita.at(index);
    const fonteDati = riga.get('fonteDati').value;
    if (fonteDati && fonteDati.id != this.FONTE_DATI_NUOVO_MOTI_ID) {
      return false;
    }
    return true;
  }

  aggiungiFinanziamento() {
    this.fFinanziamenti.push(
      this.formBuilder.group({
        fonteFinanziamento: new FormControl(null, [Validators.required]),
        descrizione: new FormControl(null),
        importoStanziato: new FormControl(null),
        importoLiquidato: new FormControl(null),
        fonteDati: this.fonteDatiMoti,
        note: new FormControl(null)
      })
    );
    this.bFinanziamentoValid = false;
    this.triggerUiUpdate();
  }

  eliminaFinanziamento(index) {
    this.fFinanziamenti.removeAt(index);
    this.verificaFinanziamento(0);
  }

  btnEliminaFinanziamentoEnabled(index) {
    const riga = this.fFinanziamenti.at(index);
    const fonteDati = riga.get('fonteDati').value;
    if (fonteDati && fonteDati.id != this.FONTE_DATI_NUOVO_MOTI_ID) {
      return false;
    }
    return true;
  }

  checkValidReferente() {
    if (this.selectedReferentes.length == 0) {
      this.refElReferente.element.classList.add('is-invalid');
    } else {
      this.refElReferente.element.classList.remove('is-invalid');
    }
  }

  checkValidLuogo() {
    if (this.selectedLuogos.length == 0) {
      this.refElLuogo.element.classList.add('is-invalid');
    } else {
      this.refElLuogo.element.classList.remove('is-invalid');
    }
  }

  isMultiselectValid() {
    if (this.selectedReferentes.length == 0) {
      return false;
    }
    if (this.selectedLuogos.length == 0) {
      return false;
    }
    if (!this.bFaseProgrammazioneValid || !this.bFaseRealizzazioneValid || !this.bCriticitaValid || !this.bFinanziamentoValid) {
      return false;
    }
    return true;
  }

  verificaFaseProgrammazione(indexRiga) {
    this.bFaseProgrammazioneValid = true;
    // const riga = this.fFasiProgrammazione.at(indexRiga);
    this.fFasiProgrammazione.controls.forEach(riga => {
      const fase = riga.get('fase').value;
      if (fase) {
        // this.bFaseProgrammazioneValid = true;
      } else {
        this.bFaseProgrammazioneValid = false;
      }
    });
  }

  verificaFaseRealizzazione(indexRiga) {
    this.bFaseRealizzazioneValid = true;
    // const riga = this.fFasiRealizzazione.at(indexRiga);
    this.fFasiRealizzazione.controls.forEach(riga => {
      const fase = riga.get('fase').value;
      if (fase) {
        // this.bFaseRealizzazioneValid = true;
      } else {
        this.bFaseRealizzazioneValid = false;
      }
    });
  }

  verificaCriticita(indexRiga) {
    this.bCriticitaValid = true;
    // const riga = this.fCriticita.at(indexRiga);
    this.fCriticita.controls.forEach(riga => {
      const fonteDati = riga.get('fonteDati').value;
      // ATTENZIONE: alcuni dati importati non hanno 'tipoCriticita' valorizzato
      if (fonteDati && fonteDati.id == this.FONTE_DATI_NUOVO_MOTI_ID) {
        const situazioneCriticita = riga.get('situazioneCriticita').value;
        const tipoCriticita = riga.get('tipoCriticita').value;
        const descrizione = riga.get('descrizione').value;
        if (situazioneCriticita && tipoCriticita && descrizione) {
          // this.bCriticitaValid = true;
        } else {
          this.bCriticitaValid = false;
        }
      }
    });
  }

  verificaFinanziamento(indexRiga) {
    this.bFinanziamentoValid = true;
    // const riga = this.fFinanziamenti.at(indexRiga);
    this.fFinanziamenti.controls.forEach(riga => {
      const fonteFinanziamento = riga.get('fonteFinanziamento').value;
      if (fonteFinanziamento) {
        // this.bFinanziamentoValid = true;
      } else {
        this.bFinanziamentoValid = false;
      }
    });
  }

  onClickModifica() {
    this.controlDisabled = false;
    this.titoloPaginaService.triggerTitolo('SIDEBAR.INT.INTERVENTION.UPDATE');
    this.changeFormState();
  }

  async onClickEsporta() {
    this.utilitiesService.showSpinner();
    try {
      const res = await this.interventoService.getEsportaIntervento(this.initialIntervento.id, 'response').toPromise();
      const fileName = Utils.extractFileNameFromContentDisposition(res.headers.get('Content-Disposition'));
      this.utilitiesService.downloadBlobFile(fileName, res.body);
    } catch (e) {
      this.utilitiesService.handleApiErrors(e, 'SIDEBAR.PBA.INTERVENTION.PRINT_EXCEL');
    } finally {
      this.utilitiesService.hideSpinner();
    }
  }

  async onClickElimina() {
    await this.modalService.open(this.modalConfirmElimina, { size: 'lg', scrollable: true }).result;
  }

  async onModalEliminaClose(modal) {
    modal.close();
    try {
      if (this.initialIntervento.id) {
        await this.interventoService.deleteIntervento('DELETE', this.initialIntervento.id, this.initialIntervento).toPromise();
        // const title = this.translateService.instant('SIDEBAR.INT.INTERVENTION.TITLE');
        // const msg = this.translateService.instant('MESSAGES.INT-INT-P-0003');
        // this.utilitiesService.showToastrInfoMessage(msg, title);
        this.utilitiesService.hideSpinner();

        setTimeout(() => {
          this.modalService.dismissAll();
          this.router.navigateByUrl('/home');
        }, this.MODAL_TIMEOUT);

        await this.modalService.open(this.modalDelete, { size: 'lg', scrollable: true }).result;
      }

      this.router.navigateByUrl('/home');

    } catch (e) {
      this.utilitiesService.hideSpinner();
      this.utilitiesService.handleApiErrors(e, 'SIDEBAR.INT.INTERVENTION.TITLE');
    }
  }

  async onKeydownAttuatore() {
    if (!this.controlDisabled) {
      this.resetFormRicercaAttuatore();
      await this.modalService.open(this.modalRicercaAttuatore, { size: 'lg', scrollable: true }).result;
    }
  }

  async resetFormRicercaAttuatore() {
    this.formModalRicercaAttuatore.get('descrizione').setValue(null);
    this.formModalRicercaAttuatore.get('codiceFiscale').setValue(null);
    this.modalElencoAttuatori = [];
  }

  async modalAttuatoriClose(modal, id) {
    const interventoSaved: Intervento = this.formIntervento.getRawValue() as Intervento;
    this.logService.info(this.constructor.name, 'modalAttuatoriClose', interventoSaved);

    this.modalElencoAttuatori.forEach(attuatoreObj => {
      if (attuatoreObj.id == id) {
        interventoSaved.attuatoreObj = attuatoreObj;
      }
    });
    modal.close();

    this.formIntervento.patchValue(interventoSaved);
    this.attuatoreSelected = true;
    this.triggerUiUpdate();
  }

  async modalAttuatoriRicerca(modal) {
    let descrizione = this.formModalRicercaAttuatore.get('descrizione').value;
    let codiceFiscale = this.formModalRicercaAttuatore.get('codiceFiscale').value;

    var attuatore: Attuatore = {};
    attuatore.descrizione = descrizione;
    attuatore.codiceFiscale = codiceFiscale;

    this.utilitiesService.showSpinner();
    try {
      this.modalElencoAttuatori = await this.decodificaService.postRicercaAttuatore(attuatore).toPromise();
      if (this.modalElencoAttuatori && this.modalElencoAttuatori.length > 0) {
        // show results to select
      } else {
        this.utilitiesService.hideSpinner();
        modal.close();
        await this.modalService.open(this.modalAttuatoreNonTrovato, { size: 'lg', scrollable: true }).result;
        return;
      }
    } catch (e) {
      console.error(e);
      this.utilitiesService.handleApiErrors(e, 'SIDEBAR.INT.INTERVENTION.TITLE');
      return;
    } finally {
      this.utilitiesService.hideSpinner();
    }

    this.triggerUiUpdate();
  }

  async onModalAttuatoreNonTrovato(modal) {
    modal.close();
    this.resetFormModalInserisciAttuatore();
    await this.modalService.open(this.modalInserisciAttuatore, { size: 'lg', scrollable: true }).result;
  }

  async resetFormModalInserisciAttuatore() {
    this.formModalInserisciAttuatore.get('descrizione').setValue(null);
    this.formModalInserisciAttuatore.get('codiceFiscale').setValue(null);
    this.modalElencoAttuatori = [];
  }

  async modalAttuatoriInsert(modal, bCheckAttuatoreExists) {
    const interventoSaved: Intervento = this.formIntervento.getRawValue() as Intervento;
    this.logService.info(this.constructor.name, 'modalAttuatoriInsert', interventoSaved);

    if (modal) {
      modal.close();
    }

    this.utilitiesService.showSpinner();
    try {
      let descrizione = this.formModalInserisciAttuatore.get('descrizione').value;
      let codiceFiscale = this.formModalInserisciAttuatore.get('codiceFiscale').value;

      if (bCheckAttuatoreExists) {
        var attuatore: Attuatore = {};
        // ricerca solo per codice fiscale
        // attuatore.descrizione = descrizione;
        attuatore.codiceFiscale = codiceFiscale;

        this.modalElencoAttuatori = await this.decodificaService.postRicercaAttuatore(attuatore).toPromise();
        if (this.modalElencoAttuatori && this.modalElencoAttuatori.length > 0) {
          this.utilitiesService.hideSpinner();

          attuatore = this.modalElencoAttuatori.pop();

          this.messageConfirmInsert = this.translateService.instant("MESSAGES.INT-INT-A-0008", { descrizione: attuatore.descrizione });
          await this.modalService.open(this.modalConfirmInserisci, { size: 'lg', scrollable: true }).result;
          return;
        }
      }

      var attuatore: Attuatore = {};
      attuatore.descrizione = descrizione;
      attuatore.codiceFiscale = codiceFiscale;

      attuatore = await this.decodificaService.postAttuatore(attuatore).toPromise();
    } catch (e) {
      console.error(e);
      this.utilitiesService.handleApiErrors(e, 'SIDEBAR.INT.INTERVENTION.TITLE');
      return;
    } finally {
      this.utilitiesService.hideSpinner();
    }

    this.modalElencoAttuatori = [];
    this.modalElencoAttuatori.push(attuatore);

    interventoSaved.attuatoreObj = attuatore;

    this.formIntervento.patchValue(interventoSaved);
    this.attuatoreSelected = true;
    this.triggerUiUpdate();
  }

  async onModalConfirmInserisci(modal) {
    modal.close();
    this.modalAttuatoriInsert(null, false);
  }

}
