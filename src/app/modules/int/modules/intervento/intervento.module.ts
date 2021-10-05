/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { NgModule } from '@angular/core';
import { NgbTabsetModule, NgbTooltipModule, NgbAccordionModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { MoticommonModule } from 'src/app/modules/moticommon/moticommon.module';
import { FormInterventoComponent } from './components/form-intervento/form-intervento.component';
import { InterventoRoutingModule } from './intervento-routing.module';
import { InterventoResolverService } from './services/intervento-resolver.service';
import { RicercaInterventoComponent } from './components/ricerca-intervento/ricerca-intervento.component';
import { FormRicercaInterventoComponent } from './components/ricerca-intervento/form-ricerca-intervento/form-ricerca-intervento.component';
import { RisultatiRicercaInterventoComponent } from './components/ricerca-intervento/risultati-ricerca-intervento/risultati-ricerca-intervento.component';
import { RicercaInterventoService } from './services/ricerca-intervento.service';
import { RicercaInterventoResetComponent } from './components/ricerca-intervento-reset/ricerca-intervento-reset.component';

@NgModule({
  declarations: [
    FormInterventoComponent,
    RicercaInterventoComponent,
    FormRicercaInterventoComponent,
    RisultatiRicercaInterventoComponent,
    RicercaInterventoResetComponent],
  imports: [
    MoticommonModule,
    InterventoRoutingModule,
    NgbTabsetModule,
    NgbTooltipModule,
    NgbAccordionModule,
    NgbDatepickerModule
  ],
  exports: [
  ],
  providers: [
    InterventoResolverService,
    RicercaInterventoService
  ]
})
export class InterventoModule { }
