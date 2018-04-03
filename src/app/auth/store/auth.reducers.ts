import { AuthState } from './auth.state';
import * as AuthActions from './auth.actions';

const initialState: AuthState = {
    token: null,
    authenticated: false
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.SIGNUP:
        case AuthActions.SIGNIN:
            return {
                ...state,
                authenticated: true
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                authenticated: false,
                token: null
            };
        case AuthActions.SET_TOKEN:
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}
