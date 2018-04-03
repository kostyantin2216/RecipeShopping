import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { SIGNUP, TRY_SIGNUP, TrySignup, SET_TOKEN, TRY_SIGNIN, SIGNIN, LOGOUT, TrySignin } from './auth.actions';
import * as firebase from 'firebase';
import { fromPromise } from 'rxjs/observable/fromPromise';

@Injectable()
export class AuthEffects {
    @Effect() authSignup = this.actions$
        .ofType(TRY_SIGNUP)
        .map((action: TrySignup) => action.payload)
        .switchMap((authData: {username: string, password: string}) => {
            return fromPromise(
                firebase.auth()
                        .createUserWithEmailAndPassword(authData.username, authData.password)
            );
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            return [{
                type: SIGNUP
            }, {
                type: SET_TOKEN,
                payload: token
            }];
        });

    @Effect() authSignin = this.actions$
        .ofType(TRY_SIGNIN)
        .map((action: TrySignin) => action.payload)
        .switchMap((authData: {username: string, password: string}) => {
            return fromPromise(
                firebase.auth()
                        .signInWithEmailAndPassword(authData.username, authData.password)
            );
        })
        .switchMap(() => {
            return fromPromise(firebase.auth().currentUser.getIdToken());
        })
        .mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [{
                type: SIGNIN
            }, {
                type: SET_TOKEN,
                payload: token
            }];
        });

    @Effect({dispatch: false}) authLogout = this.actions$
        .ofType(LOGOUT)
        .do(() => this.router.navigate(['/']));

    constructor(
        private actions$: Actions,
        private router: Router
    ) { }

}
