import {AuthActions, AuthActionTypes} from '../../+state/action/auth.action'
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
            console.log("LOGIN")
            return state;
        }
        case AuthActionTypes.LOGIN_SUCCESS: {
            console.log("LOGIN_SUCCESS")
            return {...state, user: action.payload}
        }
        case AuthActionTypes.LOGOUT: {
            console.log("LOGOUT")
            return {...state, error:action.payload, loaded: false}
        }
        case AuthActionTypes.LOGIN_FAIL: {
            console.log("LOGIN_FAIL")
            return {...state, error: action.payload, loaded: false}
        }
        default:{
            console.log("Default...",action)
            return state;
        }
    }
}
