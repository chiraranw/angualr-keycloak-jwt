import {Action} from "@ngrx/store";
import {User} from "../../model/user";

export enum UserActionTypes {
    //Loading
    LOAD_USERS = "[User Service] Load Users",
    LOAD_USERS_SUCCESS = "[User Service] Load Users Success",
    LOAD_USERS_FAIL = "[User Service] Load Users Fail"

    //Editing

    //Deleting
}

export class LoadUsers implements Action {
    readonly type = UserActionTypes.LOAD_USERS;
}

export class LoadUsersSuccess implements Action {
    readonly type = UserActionTypes.LOAD_USERS_SUCCESS;

    constructor(public payload: User[]) {
    }
}

export class LoadUsersFail implements Action {
    readonly type = UserActionTypes.LOAD_USERS_FAIL;

    constructor(public payload: any) {
    }
}

export type UserActions = LoadUsers | LoadUsersFail | LoadUsersSuccess;