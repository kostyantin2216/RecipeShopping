import { RecipeState } from './../store/recipe.state';
import { AddRecipe, DeleteRecipe } from './../store/recipe.actions';
import { Store } from '@ngrx/store';
import { FeatureState } from './../store/recipe.reducers';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { UpdateRecipe } from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private store: Store<FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.id = parseInt(params['id'], 10);
        }
        this.initForm();
      }
    );
  }

  private initForm() {
    const recipeReady = function(recipe: Recipe) {
      const ingredientsControl = new FormArray([]);

      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          ingredientsControl.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
      this.recipeForm = new FormGroup({
        'name': new FormControl(recipe.name, Validators.required),
        'imagePath': new FormControl(recipe.imagePath, Validators.required),
        'description': new FormControl(recipe.description, Validators.required),
        'ingredients': ingredientsControl
      });
    }.bind(this);

    if (this.editMode) {
      this.store.select('recipes')
                         .take(1)
                         .subscribe(
                           (recipeState: RecipeState) =>  {
                             const recipe = recipeState.recipes[this.id];
                             recipeReady(recipe);
                           }
                         );
    } else {
       recipeReady(new Recipe('', '', '', []));
    }
  }

  onAddIngredient() {
    (<FormArray> this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.store.dispatch(new UpdateRecipe({
        index: this.id,
        updatedRecipe: this.recipeForm.value
      }));
    } else {
      this.store.dispatch(new AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  onDelete() {
    this.store.dispatch(new DeleteRecipe(this.id));
    this.id = null;
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
    this.editMode = false;
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  getIngredientControls() {
    return (<FormArray> this.recipeForm.get('ingredients')).controls;
  }

}
