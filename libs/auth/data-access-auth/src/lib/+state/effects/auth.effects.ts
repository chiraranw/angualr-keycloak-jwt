import {Injectable} from "@angular/core";
import {Actions, Effect, ofType} from "@ngrx/effects";
import {Observable, of} from "rxjs";
import {catchError, map, switchMap, tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {AuthActions, AuthActionTypes, LoginFail, LoginSuccess} from "../action/auth.action";

@Injectable()
export class AuthEffects {
    constructor(
        private actions: Actions,
        private authService: AuthService,
        private router: Router) {
    }

    @Effect()
    login$ = this.actions.pipe(
        ofType<AuthActions>(AuthActionTypes.LOGIN),
        switchMap(action => { return this.authService.authenticate(action.payload).pipe(

            map(response => new LoginSuccess(response)),
            catchError(err => of(new LoginFail(err)))
        )})
    );

    @Effect({dispatch: false})
    loginSuccess: Observable<any> = this.actions.pipe(
        ofType<AuthActions>(AuthActionTypes.LOGIN_SUCCESS),
        tap(user => {
            console.log("login Success effect", user)
            this.router.navigate(["/dashboard"]);
        })
    );

    @Effect({dispatch: false})
    logout: Observable<any> = this.actions.pipe(
        ofType<AuthActions>(AuthActionTypes.LOGOUT),
        map(error => {
            this.authService.logout();
            console.log("logout", error)
            this.router.navigate(["/"]);
        })
    );

}
