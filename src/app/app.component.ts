/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sidebar } from 'ng-sidebar';
import { SidebarService, UserService, UtilitiesService, SessionStorageService } from 'src/app/services';
import { UtenteService, Utente } from 'src/app/modules/motiapi';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { POSSIBLE_SIDEBAR_MODULES } from 'src/app/models';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { ApiError } from 'src/app/modules/motiapi';

@Component({
  selector: 'moti-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewInit {
  private static readonly SIDEBAR_MODULE_PATHS = POSSIBLE_SIDEBAR_MODULES.map(m => m.urlSubpaths.join('/'));

  openSidebar = false;
  animateSidebar = false;
  // sidebarContent: SidebarContent[] = [];

  utente: Utente;

  defaultSettoreTitle = marker('HEADER.SETTORE.DEFAULT_DESCRIPTION');
  isNotHomePage = true;

  @ViewChild('motiSidebar', { static: false }) motiSidebar: Sidebar;

  private timeoutId: number;
  private destroyed = false;
  private subscriptions: Subscription[] = [];
  private currentUrl = '';


  get changeSettoreDisabled(): boolean {
    return this.currentUrl !== '/home' && this.currentUrl !== '/' && this.currentUrl !== '';
  }

  constructor(
    // API
    private utenteService: UtenteService,

    private storageService: SessionStorageService,
    private sidebarService: SidebarService,
    private userService: UserService,
    private utilitiesService: UtilitiesService,

    // Utilities
    private router: Router,

    // private routeService: RouteService
  ) {
    // routeService.loadRouting();
  }

  async ngOnInit() {
    // this.userService.setPermessi(this.storageService.getItem(UserService.PERMESSI_SESSION));
    // this.userService.setUserManualLink(this.storageService.getItem(UserService.USER_MANUAL_LINK, false));
    // caricare dallo storage modulo selezionato e permessi

    this.utilitiesService.showSpinner();
    this.subscriptions.push(
      this.sidebarService.collapsed$.subscribe(collapsed => this.openSidebar = !collapsed),
      this.userService.currentUrl$.subscribe(currentUrl => this.onCurrentUrlChanged(currentUrl)),
      this.router.events
        .pipe(
          filter(e => e instanceof NavigationEnd)
        )
        .subscribe((e: NavigationEnd) => this.userService.setCurrentUrl(e.urlAfterRedirects))
    );

    try {
      const [utente] = await Promise.all([
        this.utenteService.getUtenteSelf().toPromise(),
      ]);
      this.utente = utente;

    } catch (e) {
      // Handle exception
      if (e.status == 401) {
        var apiError401: ApiError = {};
        apiError401.code = "SYS-SYS-E-0007";
        apiError401.params = {};
        this.router.navigate(['/error'], { state: apiError401 });
      } else {
        this.router.navigate(['/error'], { state: e.error });
      }

    } finally {
      this.utilitiesService.hideSpinner();
    }

  }

  ngAfterViewInit() {
    // Resolve bug in sidebar been always shown
    setTimeout(() => this.animateSidebar = true, 0);
    // this.subscriptions.push(
    //   this.sidebarService.content$.subscribe(content => {
    //     this.sidebarContent = content;
    //     this.motiSidebar.triggerRerender();
    //   }),
    // );
  }

  ngOnDestroy() {
    clearTimeout(this.timeoutId);
    this.destroyed = true;
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  sidebarClose() {
    this.sidebarService.setCollapsed(true);
  }

  navigateAndClose() {
    this.utilitiesService.showSpinner();
    this.sidebarClose();
  }

  hasPermesso(codes: string) {
    if (!codes) {
      return true;
    }
    return this.userService.hasPermesso(codes);
  }

  private computeIsNotHomePage(): boolean {
    if (!this.currentUrl) {
      return true;
    }
    if (!this.changeSettoreDisabled) {
      return false;
    }
    const lastPieceIndex = this.currentUrl.lastIndexOf('/');
    const lastPiece = this.currentUrl.substring(lastPieceIndex);
    return AppComponent.SIDEBAR_MODULE_PATHS.every(m => m !== lastPiece);
  }

  private onCurrentUrlChanged(currentUrl: string) {
    this.currentUrl = currentUrl;
    this.isNotHomePage = this.computeIsNotHomePage();
  }

}
