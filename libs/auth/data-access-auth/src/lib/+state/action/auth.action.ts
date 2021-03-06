import {Action} from "@ngrx/store";
import {User} from "@readers-digest/auth/data-access-auth";

export enum AuthActionTypes {
    LOGIN = "[Auth Service] Login",
    LOGIN_SUCCESS = "[Auth Service] Login Success",
    LOGIN_FAIL = "[Auth Service] Login Fail",
    LOGOUT = "[Auth Service] Logout"
}

export class Login implements Action {
    readonly type = AuthActionTypes.LOGIN;

    constructor(public payload: AuthModel) {
    }
}

export class Logout implements Action {
    readonly type = AuthActionTypes.LOGOUT;

    constructor(public payload:any) {
    }
}

export class LoginSuccess implements Action {
    readonly type = AuthActionTypes.LOGIN_SUCCESS;

    constructor(public payload: any) {
    }
}

export class LoginFail implements Action {
    readonly type = AuthActionTypes.LOGIN_FAIL;

    constructor(public payload: any) {
    }
}

export type AuthActions = Login | LoginFail | LoginSuccess|Logout;