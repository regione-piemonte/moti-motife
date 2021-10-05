/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
export const environment = {
  production: false,
  ambiente: 'dev-int-01',
  shibbolethAuthentication: true,
  publicPath: 'http://@@URL_VH_ESPOSIZIONE@@',

  appBaseHref: '/moti',

  beServerPrefix: '',
  beService_2_WAR: '/rest/api/v1',
  beService: '/moti/api/v1',

  shibbolethSSOLogoutURL: 'http://@@URL_VH_ESPOSIZIONE@@/%%SHIB%%/Shibboleth.sso/Logout',
  onAppExitURL: '',
  userManualURL: 'http://@@URL_VH_ESPOSIZIONE@@/UserManual/'
};
