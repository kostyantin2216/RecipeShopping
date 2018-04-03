import { AuthState } from './store/auth.state';
import { AppState } from './../store/app.state';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
        private store: Store<AppState>
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.store.select('auth')
                         .take(1)
                         .map((authState: AuthState) => authState.authenticated);
    }
}
