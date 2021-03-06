/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { SortDirection } from 'src/app/models/sort-direction';

export interface SortEvent {
  column: string;
  direction: SortDirection;
}
