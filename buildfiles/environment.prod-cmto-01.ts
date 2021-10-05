/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
export const environment = {
  production: true,
  ambiente: 'prod-cmto-01',
  shibbolethAuthentication: true,
  publicPath: 'http://@@URL_VH_ESPOSIZIONE@@',

  appBaseHref: '/moti',

  beServerPrefix: '',
  beService_2_WAR: '/rest/api/v1',
  beService: '/moti/api/v1',

  shibbolethSSOLogoutURL: 'https://@@URL_VH_ESPOSIZIONE@@/moti/logout',
  onAppExitURL: '',
  userManualURL: 'http://@@URL_VH_ESPOSIZIONE@@/UserManual/'
};
