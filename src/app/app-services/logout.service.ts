import {Injectable} from '@angular/core';
import {Effect, Actions} from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';

import {Observable} from 'rxjs';

import * as ApplicationActions from '../app-store/app.action';
import {switchMap, map} from "rxjs/operators";
import {timer} from 'rxjs/observable/timer';

@Injectable({
    providedIn: 'root'
})
export class LogoutService {
    APPLICATION_TIMEOUT_TIME = 1000 * 5;

    constructor(private actions$: Actions) {
    }

    @Effect()
    extendApplicationTimeout$ = this.actions$.pipe(
        switchMap((action: Action) => Observable.timer(this.APPLICATION_TIMEOUT_TIME)),
        map(() => new ApplicationActions.LogOut())
    );


}
