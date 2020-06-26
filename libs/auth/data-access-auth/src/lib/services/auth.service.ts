import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "@readers-digest/auth/data-access-auth";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map, tap} from "rxjs/operators";
import {AuthResponse} from "../model/auth.response";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    //MUST Clean this service!!!
    const
    baseURL = "http://localhost:8080/auth/realms/angular/protocol/openid-connect";

    constructor(private http: HttpClient) {
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
            tap((response: AuthResponse) => this.persistTokens(response))
        );

    }

    public refreshToken(){
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
            tap((response:AuthResponse)=>this.persistTokens(response))
        );
    }

    private persistTokens(authResp: AuthResponse) {
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
      return   this.http.get("https://jsonplaceholder.typicode.com/todos/1")
    }

}
