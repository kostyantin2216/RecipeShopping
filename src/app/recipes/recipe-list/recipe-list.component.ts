import { FeatureState } from './../store/recipe.reducers';
import { Observable } from 'rxjs/Observable';
import { RecipeState } from './../store/recipe.state';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipesState: Observable<RecipeState>;

  constructor(private store: Store<FeatureState>) { }

  ngOnInit() {
    this.recipesState = this.store.select('recipes');
  }

}
