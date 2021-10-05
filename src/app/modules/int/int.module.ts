/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { NgModule } from '@angular/core';
import { IntRoutingModule } from 'src/app/modules/int/int-routing.module';
import { MoticommonModule } from 'src/app/modules/moticommon/moticommon.module';
import { InterventoModule } from 'src/app/modules/int/modules/intervento/intervento.module';
import { HeaderIntComponent } from './components/header-int/header-int.component';
import { NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';

// /ordine per caricare il modulo
// /ordine carica la componente TabsOrdineComponent

@NgModule({
  declarations: [
    HeaderIntComponent
  ],
  imports: [
    MoticommonModule,
    IntRoutingModule,
    InterventoModule,
    NgbTabsetModule
  ],
  exports: [],
  providers: []
})
export class IntModule { }
