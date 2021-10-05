/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'moti-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  goToTop(e: Event): boolean {
    e.preventDefault();
    document.getElementsByTagName('moti-header')[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
    return false;
  }
}
