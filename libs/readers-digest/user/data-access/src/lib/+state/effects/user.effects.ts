import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {UserService} from "../../services/user.service";
import {UserActionTypes, UserActions, LoadUsersSuccess, LoadUsersFail} from "../actions/user.actions"
import {catchError, map, retry, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Injectable()
export class UserEffects {

    constructor(private actions:Actions,private usersSvc:UserService) {
    }

    @Effect()
    loadUsers$=this.actions.pipe(
        ofType(UserActionTypes.LOAD_USERS),
        switchMap(action=>this.usersSvc.getUsers().pipe(
            retry(1),
            map(users=> new LoadUsersSuccess(users)),
            catchError(error=> of(new LoadUsersFail(error)))
        ))
    );
}
