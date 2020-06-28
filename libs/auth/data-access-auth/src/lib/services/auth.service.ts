import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "@readers-digest/auth/data-access-auth";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {AuthResponse} from "../model/auth.response";
import {Router} from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    //MUST Clean this service!!!
    const
    baseURL = "http://localhost:8080/auth/realms/angular/protocol/openid-connect";

    constructor(private http: HttpClient, private router:Router) {
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
        return this.http.post(this.baseURL+'/token', body, options).pipe(
            tap((response: AuthResponse) => AuthService.persistTokens(response))
        );

    }

    public refreshToken(){
        console.log("About to refresh...")
        const body = new HttpParams({
            fromObject: {
                client_id: 'angular-login',
                grant_type: 'refresh_token',
                refresh_token:this.getRefreshToken()
            }
        });
        const headers = new HttpHeaders(
            {
                Accept: 'application/json',
                'Content-Type': `application/x-www-form-urlencoded`
            }
        );
        const options = {headers};
        return this.http.post(this.baseURL+'/token', body, options).pipe(
            tap((response:AuthResponse)=> AuthService.persistTokens(response))
        );
    }

    private static persistTokens(authResp: AuthResponse) {
        console.log("saving the tokens...")
        localStorage.setItem("jwt_token", authResp.access_token);
        localStorage.setItem("refresh_token", authResp.refresh_token);
    }

    public getJWTToken():string{
        return localStorage.getItem("jwt_token")
    }

    public getRefreshToken():string{
        return localStorage.getItem("refresh_token")
    }

    public testMethod(){
      return   this.http.get("http://localhost:8081/api/v1/users/test")
    }

    public logout(){
        localStorage.removeItem("jwt_token");
        localStorage.removeItem("refresh_token");
        this.router.navigate(["/"]);
        console.log("Loging user out...")
    }

}
