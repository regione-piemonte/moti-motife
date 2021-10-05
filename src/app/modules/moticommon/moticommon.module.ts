/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  HasValueClassDirective,
  CustomCheckboxDirective,
  DigitOnlyDirective,
  IsInvalidClassDirective,
  SortableDirective,
  FormatAmountDirective,
  NgSelectHasValueDirective,
  PaginationHeadDirective,
  PaginationBodyDirective,
  ScrollListenerDirective
} from './directives';
import {
  SidebarLeftComponent
} from 'src/app/components';
import { RouterModule } from '@angular/router';
import { UnsafeHtmlPipe, CodeDescPipe } from 'src/app/pipes';
import { NgbModalModule, NgbPaginationModule, NgbAlertModule, NgbDropdownModule,
  NgbPopoverModule, NgbDateAdapter, NgbDateNativeAdapter, NgbDateParserFormatter,
  NgbDatepickerI18n, NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaskModule } from 'ngx-mask';
import { NgxCurrencyModule } from 'ngx-currency';
import { NestableModule } from 'ngx-nestable';
import { NgbCustomDateParserFormatterService, NgbCustomI18nService, PromptModalService } from './services';
import {
  BackButtonComponent,
  PaginatedTableComponent,
  TableComponent,
  HeadDirective,
  BodyDirective,
  TreeModalComponent,
  PromptModalComponent
} from './components';
import { FormatNumAmountDirective } from './directives/format-num-amount.directive';
import { MotiTooltipDirective } from './directives/moti-tooltip.directive';
import { PreventDoubleClickDirective } from './directives/prevent-double-click.directive';
import { MotiDisabledTooltipDirective } from './directives/moti-disabled-tooltip.directive';
import { ErrorModalComponent } from './components/error-modal/error-modal.component';

@NgModule({
  declarations: [
    SidebarLeftComponent,
    BackButtonComponent,
    TreeModalComponent,
    PromptModalComponent,
    ErrorModalComponent,

    HasValueClassDirective,
    CustomCheckboxDirective,
    DigitOnlyDirective,
    IsInvalidClassDirective,
    SortableDirective,
    NgSelectHasValueDirective,
    MotiTooltipDirective,
    MotiDisabledTooltipDirective,
    PreventDoubleClickDirective,

    CodeDescPipe,
    UnsafeHtmlPipe,

    PaginatedTableComponent,
    PaginationHeadDirective,
    PaginationBodyDirective,
    FormatAmountDirective,
    FormatNumAmountDirective,
    TableComponent,
    HeadDirective,
    BodyDirective,
    ScrollListenerDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgSelectModule,
    NgbModalModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgxMaskModule,
    FormsModule,
    NgbDropdownModule,
    NgbPopoverModule,
    RouterModule,
    NgxCurrencyModule,
    NestableModule,
  ],
  exports: [
    CommonModule,
    NgSelectModule,
    NgbModalModule,
    NgbPaginationModule,
    NgbAlertModule,
    TranslateModule,
    ReactiveFormsModule,
    NgbDropdownModule,
    NgbPopoverModule,
    NgxMaskModule,
    FormsModule,
    NestableModule,

    SidebarLeftComponent,
    BackButtonComponent,

    HasValueClassDirective,
    CustomCheckboxDirective,
    DigitOnlyDirective,
    IsInvalidClassDirective,
    SortableDirective,
    NgSelectHasValueDirective,
    MotiTooltipDirective,
    MotiDisabledTooltipDirective,
    PreventDoubleClickDirective,

    CodeDescPipe,
    UnsafeHtmlPipe,

    PaginatedTableComponent,
    PaginationHeadDirective,
    PaginationBodyDirective,
    ScrollListenerDirective,
    FormatNumAmountDirective,

    TableComponent,
    HeadDirective,
    BodyDirective,

    NgxCurrencyModule,

  ],
  providers: [
    { provide: NgbDateAdapter, useClass: NgbDateNativeAdapter },
    { provide: NgbDateParserFormatter, useClass: NgbCustomDateParserFormatterService },
    { provide: NgbDatepickerI18n, useClass: NgbCustomI18nService, deps: [ TranslateService ] },
    PromptModalService
  ],
  entryComponents: [
    TreeModalComponent,
    PromptModalComponent,
    ErrorModalComponent,
  ]
})
export class MoticommonModule { }
