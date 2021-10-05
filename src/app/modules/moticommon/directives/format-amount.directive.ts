/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[motiFormatAmount]'
})
export class FormatAmountDirective {

  constructor() { }

  @HostListener ('blur') lostFocus() {
    // TODO?
  }
}
