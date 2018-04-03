import { RecipeEffects } from './store/recipe.effects';
import { EffectsModule } from '@ngrx/effects';
import { FeatureState, recipeReducer } from './store/recipe.reducers';
import { StoreModule } from '@ngrx/store';
import { NgModule } from '@angular/core';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipePlaceholderComponent } from './recipe-placeholder.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeDetailsComponent,
        RecipeListComponent,
        RecipeEditComponent,
        RecipePlaceholderComponent,
        RecipeItemComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
        SharedModule,
        StoreModule.forFeature('recipes', recipeReducer),
        EffectsModule.forFeature([RecipeEffects])
    ]
})
export class RecipesModule { }
