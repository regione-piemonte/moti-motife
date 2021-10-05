/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Component, OnInit, OnDestroy, Input, Inject, Optional } from '@angular/core';
import { SidebarService, SessionStorageService, UserService, LogService, ConfigurationService } from 'src/app/services';
import { Subscription } from 'rxjs';
import { Utente, UtenteService } from 'src/app/modules/motiapi';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators';
import { marker } from '@biesbjerg/ngx-translate-extract-marker';
import { Language, LANGUAGE_STORAGE, ScrollAmount, SidebarContent } from 'src/app/models';
import { DOCUMENT } from '@angular/common';
import { LOGOUT_URL, USER_MANUAL_URL } from 'src/app/modules/moticommon/variables';
import { TitoloPaginaService } from 'src/app/services/titolo-pagina.service';

@Component({
  selector: 'moti-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() utente: Utente;

  titolo: string = 'APP.TITLE';
  sidebarContent: SidebarContent[] = [];

  lang: Language;
  languages: Language[] = [
    {langCode: 'it', locale: 'it-IT', iconCode: 'it', text: marker('LANGUAGE.ITALIAN')},
    {langCode: 'en', locale: 'en-GB', iconCode: 'gb', text: marker('LANGUAGE.ENGLISH')}
  ];
  headerHidden = false;

  private subscriptions: Subscription[] = [];
  protected logoutUrl = '';
  public ruoliDesc = 'aaa';
  public userManualUrl = '';

  constructor(
    private sidebarService: SidebarService,
    private storageService: SessionStorageService,
    private translateService: TranslateService,
    private userService: UserService,
    private utenteService: UtenteService,
    private logService: LogService,
    private configurationService: ConfigurationService,
    private titoloPaginaService: TitoloPaginaService,
    @Inject(DOCUMENT) private document: Document,
    @Optional()@Inject(USER_MANUAL_URL) private userManualBaseUrl: string,
    @Optional()@Inject(LOGOUT_URL) logoutUrl: string
  ) {
    this.logoutUrl = logoutUrl || '';
  }

  ngOnInit() {
    this.onChangedLanguage();
    this.subscriptions.push(
      this.storageService.keyStorage$.pipe(
        filter(key => key === LANGUAGE_STORAGE)
      ).subscribe(() => this.onChangedLanguage()),
      this.userService.scroll$.subscribe((scrollAmount) => this.onWindowScroll(scrollAmount)),
      this.sidebarService.content$.subscribe(content => this.sidebarContent = content),
      this.userService.userLinkManual$.subscribe(userLink => this.userManualUrl = this.userManualBaseUrl + userLink),
      this.titoloPaginaService.titolo$.subscribe(titolo => this.titolo = titolo),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  doOpenSidebar() {
    this.sidebarService.toggleCollapsed();
  }

  onLanguageSelected(language: Language) {
    this.storageService.setItem(LANGUAGE_STORAGE, language);
  }

  private onChangedLanguage() {
    this.lang = this.storageService.getItem(LANGUAGE_STORAGE);
    this.translateService.use(this.lang.langCode);
  }

  logout() {
    const methodName = 'logout';
    this.logService.debug(methodName, 'ClearStorage');
    this.storageService.clearStorage();
    this.logService.debug(methodName, `Redirect to ${this.logoutUrl}`);
    this.document.location.href = this.logoutUrl;
  }

  private onWindowScroll(scrollAmount: ScrollAmount) {
    // Aggiunta scomparsa header a circa 80% dell'altezza dello stesso
    this.headerHidden = scrollAmount.scrollTop > 120;
  }

  hasPermesso(codes: string) {
    if (!codes) {
      return true;
    }
    return this.userService.hasPermesso(codes);
  }

}
