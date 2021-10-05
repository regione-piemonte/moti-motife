/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Component, OnInit, OnDestroy } from '@angular/core';
import { UtenteService } from 'src/app/modules/motiapi';
import { UserService, UtilitiesService } from 'src/app/services';
import { Subscription } from 'rxjs';
import { POSSIBLE_SIDEBAR_MODULES, MotiSidebarModule } from '../../models';
import { UserLinkMap } from '../../models/utils/user-link-map';

@Component({
  selector: 'moti-sidebar-left',
  templateUrl: './sidebar-left.component.html',
  styleUrls: ['./sidebar-left.component.scss']
})
export class SidebarLeftComponent implements OnInit, OnDestroy {

  currentUrl: string;
  possibleModules = POSSIBLE_SIDEBAR_MODULES.filter(m => !m.ignore);

  private readonly subscriptions: Subscription[] = [];

  constructor(
    private utenteService: UtenteService,
    private utilitiesService: UtilitiesService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.userService.currentUrl$.subscribe(currentUrl => this.currentUrl = currentUrl)
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  inSubpath(sm: MotiSidebarModule): boolean {
    return this.currentUrl && (sm.urlSubpaths.some(url => this.currentUrl.indexOf(url) === 0) || (sm.isHome && this.currentUrl === '/'));
  }

  async loadPermessi(sm: MotiSidebarModule) {
    // this.utilitiesService.showSpinner();
    const code = sm && sm.code || '';
    // Impostazione link per manuale utente
    // this.userService.setUserManualLink(UserLinkMap[modulo && modulo.codice || ''] || UserLinkMap.DEFAULT);
    try {
      // const permessi = await this.utenteService.getPermessiBySettoreAndModulo(this.settore.id, modulo.id).toPromise();
      // this.userService.setPermessi(permessi);
    } catch (e) {
      this.utilitiesService.handleApiErrors(e, '');
    }

  }
}
