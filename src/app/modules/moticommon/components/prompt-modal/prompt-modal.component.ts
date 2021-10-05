/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { OnInit, Component, ViewChild, Input, Output } from '@angular/core';
@Component({
    selector: 'moti-prompt-modal',
    templateUrl: './prompt-modal.component.html',
    styleUrls: ['./prompt-modal.component.css']
})
export class PromptModalComponent {

    @Input() title: string;
    @Input() message: string;
    @Input() yesLabel: string;
    @Input() noLabel: string;
    @Input() callback;
    @Input() modal;
    @Input() type: string;

    constructor() {}

}
