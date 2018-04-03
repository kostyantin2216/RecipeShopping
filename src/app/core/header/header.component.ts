import { FetchRecipes, StoreRecipes } from './../../recipes/store/recipe.actions';
import { Logout } from './../../auth/store/auth.actions';
import { AuthState } from './../../auth/store/auth.state';
import { Observable } from 'rxjs/Observable';
import { AppState } from './../../store/app.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public authState: Observable<AuthState>;

    constructor(
        private store: Store<AppState>
    ) { }

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    saveData() {
        this.store.dispatch(new StoreRecipes());
        const callback = (response) => {
            console.log(response);
        };
    }

    fetchData() {
        this.store.dispatch(new FetchRecipes());
    }

    onLogout() {
        this.store.dispatch(new Logout());
    }

}
