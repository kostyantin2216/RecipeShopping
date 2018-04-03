import { Ingredient } from './../../shared/ingredient.model';
import { Action } from '@ngrx/store';

export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const EDIT_INGREDIENT = 'EDIT_INGREDIENT';
export const STOP_EDIT_INGREDIENT = 'STOP_EDIT_INGREDIENT';

export class AddIngredient implements Action {
    readonly type = ADD_INGREDIENT;

    constructor(
        public payload: Ingredient
    ) { }
}

export class AddIngredients implements Action {
    readonly type = ADD_INGREDIENTS;

    constructor(
        public payload: Ingredient[]
    ) { }
}

export class UpdateIngredient implements Action {
    readonly type = UPDATE_INGREDIENT;

    constructor(
        public payload: { ingredient: Ingredient }
    ) { }
}

export class DeleteIngredient implements Action {
    readonly type = DELETE_INGREDIENT;
}

export class EditIngredient implements Action {
    readonly type = EDIT_INGREDIENT;

    constructor(
        public payload: number
    ) { }
}

export class StopEditIngredient implements Action {
    readonly type = STOP_EDIT_INGREDIENT;
}

export type ShoppingListActions = AddIngredient |
                                  AddIngredients |
                                  UpdateIngredient |
                                  DeleteIngredient |
                                  EditIngredient |
                                  StopEditIngredient;