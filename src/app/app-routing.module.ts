/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from 'src/app/components/home-page/home-page.component';
import { ErrorPageComponent } from 'src/app/components/error-page/error-page.component';
import { ErrorPageResolverService } from 'src/app/services/resolver';
import { MayLoadModuleGuard } from 'src/app/guards';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { 
    path: 'home', 
    component: HomePageComponent
    // canLoad: [ MayLoadModuleGuard ], canActivate: [ MayLoadModuleGuard ], canActivateChild: [ MayLoadModuleGuard ]
  },

  { path: 'not-found', component: ErrorPageComponent, data: { message: { code: 'ERROR.PAGE_NOT_FOUND', params: {} } } },
  { path: 'error', component: ErrorPageComponent, resolve: { message: ErrorPageResolverService } },
  // Lazy modules
  {
    path: 'int',
    canLoad: [ MayLoadModuleGuard ], canActivate: [ MayLoadModuleGuard ], canActivateChild: [ MayLoadModuleGuard ],
    data: { module: 'INT' },
    loadChildren: () => import('./modules/int/int.module').then(m => m.IntModule)
  },
  // Catch-all
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

