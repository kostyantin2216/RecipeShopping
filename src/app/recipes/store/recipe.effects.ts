import { Store } from '@ngrx/store';
import { FeatureState } from './recipe.reducers';
import { Recipe } from './../recipe.model';
import { HttpClient } from '@angular/common/http';
import { FETCH_RECIPES, FetchRecipes, SET_RECIPES, STORE_RECIPES } from './recipe.actions';
import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';

@Injectable()
export class RecipeEffects {
    @Effect() recipeFetch = this.actions$
        .ofType(FETCH_RECIPES)
        .switchMap((action: FetchRecipes) => {
            return this.httpClient.get<Recipe[]>('https://recipeshopping-1a75e.firebaseio.com/recipes.json');
        })
        .map((recipes) => {
            for (let i = 0; i < recipes.length; i++) {
              if (!recipes[i]['ingredients']) {
                recipes[i]['ingredients'] = [];
              }
            }
            return {
                type: SET_RECIPES,
                payload: recipes
            };
        });

    @Effect({dispatch: false}) recipeStore = this.actions$
        .ofType(STORE_RECIPES)
        .withLatestFrom(this.store.select('recipes'))
        .switchMap(([action, state]) => {
            return this.httpClient.put('https://recipeshopping-1a75e.firebaseio.com/recipes.json', state.recipes);
        });

    constructor(
        private actions$: Actions,
        private httpClient: HttpClient,
        private store: Store<FeatureState>
    ) { }

}
