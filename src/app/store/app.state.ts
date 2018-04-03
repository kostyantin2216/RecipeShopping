import { AuthState } from './../auth/store/auth.state';
import { ShoppingListState } from './../shopping-list/store/shopping-list.state';

export interface AppState {
    shoppingList: ShoppingListState;
    auth: AuthState;
}
