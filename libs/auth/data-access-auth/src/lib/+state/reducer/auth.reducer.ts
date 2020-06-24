import {AuthActions, AuthActionTypes} from '../action/auth.action'
import {User} from '../../model/user';

export interface AuthState {
    user: User,
    loaded: boolean,
    error: any
}

export const initialState: AuthState = {
    user: null, loaded: false, error: undefined
};

export function AuthReducer(state = initialState, action: AuthActions): AuthState {
    switch (action.type) {
        case AuthActionTypes.LOGIN: {
            return state;
        }
        case AuthActionTypes.LOGIN_SUCCESS: {
            return {...state, user: action.payload}
        }
        case AuthActionTypes.LOGIN_FAIL: {
            return {...state, error: action.payload, loaded: false}
        }
    }
}
