/*
* SPDX-FileCopyrightText: Copyright 2020 - 2021 | CSI Piemonte
* SPDX-License-Identifier: EUPL-1.2
*/
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { InterventoService, Intervento, Settore } from 'src/app/modules/motiapi';
import { catchError } from 'rxjs/operators';
import { of, Observable, Subscription } from 'rxjs';
import { UserService } from 'src/app/services';

@Injectable()
export class InterventoResolverService implements Resolve<Intervento> {

  private subscriptions: Subscription[] = [];
  settore: Settore;

  constructor(
    private interventoService: InterventoService,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.subscriptions.push(
    //   this.userService.settore$.subscribe(settore => this.settore = settore)
    // );
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Intervento> | Promise<Intervento> {
    const idIntervento = route.paramMap.get('idIntervento');

    // this.subscriptions.push(
    //   this.userService.settore$.subscribe(settore => this.settore = settore)
    // );

    if (!idIntervento) {
      // TODO: inizializzare l'oggetto con i dati di base (guardare tabs intervento)
      return of({});
    }

    var idInterventoNumber = Number(idIntervento);
    return this.interventoService.getIntervento(idInterventoNumber).pipe(
      // Ignore errors
      catchError((e) => {
        this.router.navigate(['/error'], { state: e.error });
        return of(null);
      })
    );
  }
}
