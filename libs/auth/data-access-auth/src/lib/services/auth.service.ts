import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "@readers-digest/auth/data-access-auth";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, retry, tap} from "rxjs/operators";
import {AuthResponse} from "../model/auth.response";
import {Router} from "@angular/router";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Store} from "@ngrx/store";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    //MUST Clean this service!!!
    const
    baseURL = "http://localhost:8080/auth/realms/angular/protocol/openid-connect";

    constructor(
        private http: HttpClient,
        private router: Router,
        private store:Store) {
    }

    public authenticate(auth: AuthModel): Observable<any> {
        const body = new HttpParams({
            fromObject: {
                client_id: 'angular-login',
                username: auth.username,
                password: auth.password,
                grant_type: 'password'
            }
        });
        const headers = new HttpHeaders(
            {
                Accept: 'application/json',
                'Content-Type': `application/x-www-form-urlencoded`
            }
        );
        const options = {headers};
        return this.http.post(this.baseURL + '/token', body, options).pipe(
            tap((response: AuthResponse) => AuthService.saveTokens(response))
        );

    }

    public refreshToken() {
        console.log("About to refresh...")
        const body = new HttpParams({
            fromObject: {
                client_id: 'angular-login',
                grant_type: 'refresh_token',
                refresh_token: this.getRefreshToken()
            }
        });
        const headers = new HttpHeaders(
            {
                Accept: 'application/json',
                'Content-Type': `application/x-www-form-urlencoded`
            }
        );
        const options = {headers};
        return this.http.post(this.baseURL + '/token', body, options).pipe(
            tap((response: AuthResponse) => AuthService.saveTokens(response))
        );
    }

    private static saveTokens(authResp: AuthResponse) {
        localStorage.setItem("jwt_token", authResp.access_token);
        localStorage.setItem("refresh_token", authResp.refresh_token);
    }

    public getAccessToken(): string {
        return localStorage.getItem("jwt_token")
    }

    public getRefreshToken(): string {
        return localStorage.getItem("refresh_token")
    }

    public testMethod() {
        return this.http.get<[]>("http://localhost:8081/api/v1/users/test").pipe(retry(1));
    }

    public logout() {
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("refresh_token");
        this.router.navigate(["/"]);
    }

    public isAuthorized(): boolean {
        if (this.isLoggedIn()) {
            return new JwtHelperService().isTokenExpired(this.getAccessToken());
        }
        return false;
    }

    public isLoggedIn(): boolean {
        return !!localStorage.getItem("jwt_token");
    }
}
