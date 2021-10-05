/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
export const environment = {
  production: false,
  ambiente: 'test-cmto-01',
  shibbolethAuthentication: true,
  publicPath: '//@@URL_VH_ESPOSIZIONE@@',

  appBaseHref: '/moti',

  beServerPrefix: '',
  beService_2_WAR: '/rest/api/v1',
  beService: '/moti/api/v1',

  shibbolethSSOLogoutURL: 'https://@@URL_VH_ESPOSIZIONE@@/moti/logout',
  onAppExitURL: '',
  userManualURL: 'http://@@URL_VH_ESPOSIZIONE@@/UserManual/'
};
