/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { SidebarContent } from 'src/app/models';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private collapsed: BehaviorSubject<boolean> = new BehaviorSubject(true);
  private content: Subject<SidebarContent[]> = new BehaviorSubject([]);

  get collapsed$(): Observable<boolean> { return this.collapsed.asObservable(); }
  get content$(): Observable<SidebarContent[]> { return this.content.asObservable(); }

  constructor() { }

  public setCollapsed(isCollapsed: boolean) {
    this.collapsed.next(isCollapsed);
  }
  public toggleCollapsed() {
    this.collapsed.next(!this.collapsed.value);
  }
  public setContent(sidebarContent: SidebarContent[]) {
    this.content.next(sidebarContent);
  }

  public loadContent(modulo: string) {
    const links: SidebarContent[] = [];
    switch (modulo) {
      case 'INT':
        links.push(
          {link: ['/int/home'], content: marker('SIDEBAR.INT.TITLE')},
          {link: ['/int/intervento/ricerca'], content: marker('SIDEBAR.INT.INTERVENTION.SEARCH')},
          {link: ['/int/intervento'], content: marker('SIDEBAR.INT.INTERVENTION.INSERT'), permission: 'INS_INTERVENTO'}
        );
        break;

      default:
        links.push(
          {link: ['/int/home'], content: marker('SIDEBAR.INT.TITLE')}
        );
        break;
    }
    this.setContent(links);
  }
}
