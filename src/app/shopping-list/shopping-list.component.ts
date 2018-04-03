import { EditIngredient } from './store/shopping-list.actions';
import { ShoppingListState } from './store/shopping-list.state';
import { AppState } from './../store/app.state';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  public shoppingListState: Observable<ShoppingListState>;

  constructor(
    private store: Store<AppState>
  ) {  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditIngredient(id: number) {
    this.store.dispatch(new EditIngredient(id));
  }

}
