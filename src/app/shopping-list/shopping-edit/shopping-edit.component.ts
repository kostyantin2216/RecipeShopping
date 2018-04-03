import { AppState } from './../../store/app.state';
import { UpdateIngredient, DeleteIngredient, StopEditIngredient } from './../store/shopping-list.actions';
import { Store } from '@ngrx/store';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { AddIngredient } from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editSubscription: Subscription;
  editMode = false;

  @ViewChild('f')
  slForm: NgForm;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.editSubscription = this.store.select('shoppingList')
      .subscribe(
        data => {
          if (data.editedIngredientIndex > -1) {
            this.slForm.setValue(data.editedIngredient);
            this.editMode = true;
          } else {
            this.editMode = false;
          }
        }
      );
  }

  ngOnDestroy() {
    this.store.dispatch(new StopEditIngredient());
    this.editSubscription.unsubscribe();
  }

  onSubmit() {
    const name = this.slForm.value.name;
    const amount = parseInt(this.slForm.value.amount, 10);
    const ingredient = new Ingredient(name, amount);
    if (this.editMode) {
      this.store.dispatch(new UpdateIngredient({
        ingredient: ingredient
      }));
      this.store.dispatch(new StopEditIngredient());
    } else {
      this.store.dispatch(new AddIngredient(ingredient));
    }
    this.onClear();
  }

  onClear() {
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete() {
    this.store.dispatch(new DeleteIngredient());
    this.store.dispatch(new StopEditIngredient());
    this.onClear();
  }

}
