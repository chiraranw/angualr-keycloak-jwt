import {Injectable, Injector} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "@readers-digest/auth/data-access-auth";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        try {
            if (this.authService.isAuthorized()) {
                return true;
            }
        } catch (e) {
            console.log("Some error happened :",e);
            this.authService.logout();
        }
    }

}
