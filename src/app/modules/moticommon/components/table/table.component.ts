/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Component, OnInit, TemplateRef, Directive, ContentChild, Input } from '@angular/core';
import { PagedResponse } from 'src/app/models/paged-response';

@Directive({selector: 'ng-template[motiHead]'})
export class HeadDirective {
  constructor(
    public templateRef: TemplateRef<{}>
  ) {}
}

@Directive({selector: 'ng-template[motiBody]'})
export class BodyDirective<T> {
  constructor(
    public templateRef: TemplateRef<{$implicit: T}>
  ) {}
}

@Component({
  selector: 'moti-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent<T> implements OnInit {

  @Input() pagedResponse: PagedResponse<T>;
  @Input() columnNumber = 0;
  @ContentChild(HeadDirective, {static: false}) tplHead: HeadDirective;
  @ContentChild(BodyDirective, {static: false}) tplBody: BodyDirective<T>;

  constructor() { }

  ngOnInit() {
  }

}
