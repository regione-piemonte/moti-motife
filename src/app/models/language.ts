/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
export const LANGUAGE_STORAGE = 'Model.Language';

export interface Language {
  langCode: string;
  locale: string;
  iconCode: string;
  text: string;
}
