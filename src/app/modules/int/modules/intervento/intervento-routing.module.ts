/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MayActivateByPermessoGuard } from 'src/app/guards/may-activate-by-permesso.guard';
import { FormInterventoComponent } from './components/form-intervento/form-intervento.component';
import { RicercaInterventoResetComponent } from './components/ricerca-intervento-reset/ricerca-intervento-reset.component';
import { RicercaInterventoComponent } from './components/ricerca-intervento/ricerca-intervento.component';
import { InterventoResolverService } from './services/intervento-resolver.service';

// {
//   path: '',
//   component: FormInterventoComponent,
//   resolve: { intervento: InterventoResolverService },
//   pathMatch: 'full',
//   canActivate: [ MayActivateByPermessoGuard ],
//   data: { permessi: ['INS_INTERVENTO'] }
// },

const routes: Routes = [
  {
    path: 'ricerca',
    component: RicercaInterventoComponent,
  },
  {
    path: 'ricerca-reset',
    component: RicercaInterventoResetComponent,
  },
  {
    path: '',
    component: FormInterventoComponent,
    pathMatch: 'full'
  },
  {
    path: ':idIntervento',
    component: FormInterventoComponent,
    resolve: {
      intervento: InterventoResolverService
    }
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InterventoRoutingModule { }
