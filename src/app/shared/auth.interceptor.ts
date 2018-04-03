import { AuthState } from './../auth/store/auth.state';
import { AppState } from './../store/app.state';
import { Observable } from 'rxjs/Observable';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private store: Store<AppState>
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return this.store.select('auth')
            .take(1)
            .map((authState: AuthState) => authState.token)
            .flatMap((token: string) => next.handle(request.clone({
                params: request.params.set('auth', token)
            })));
    }
}
