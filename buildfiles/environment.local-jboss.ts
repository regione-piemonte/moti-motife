/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
export const environment = {
  production: false,
  ambiente: 'local-jboss',
  shibbolethAuthentication: true,
  publicPath: 'http://localhost:8080/',

  appBaseHref: '/moti',

  beServerPrefix: '',
  beService: '/rest/api/v1',

  shibbolethSSOLogoutURL: '',
  onAppExitURL: '',
  userManualURL: 'http://@@URL_VH_ESPOSIZIONE@@/UserManual/'
};
