import { DeleteRecipe } from './../store/recipe.actions';
import { FeatureState } from './../store/recipe.reducers';
import { RecipeState } from './../store/recipe.state';
import { Observable } from 'rxjs/Observable';
import { AddIngredients } from './../../shopping-list/store/shopping-list.actions';
import { AppState } from './../../store/app.state';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Recipe } from '../recipe.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  recipeId: number;
  recipeState: Observable<RecipeState>;

  constructor(
    private store: Store<FeatureState>,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => this.loadRecipe(params['id'])
    );
  }

  loadRecipe(id) {
    if (id) {
      if (typeof id !== 'number') {
        id = parseInt(id, 10);
      }
    }
    this.recipeId = id || 0;
    this.recipeState = this.store.select('recipes');
  }

  addToShoppingList() {
    this.store.select('recipes').take(1).subscribe((recipeState: RecipeState) => {
      this.store.dispatch(new AddIngredients(recipeState.recipes[this.recipeId].ingredients));
    });
  }

  onDeleteRecipe() {
    this.store.dispatch(new DeleteRecipe(this.recipeId));
    this.router.navigate(['/recipes']);
  }

}
