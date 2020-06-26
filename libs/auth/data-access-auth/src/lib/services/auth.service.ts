import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "@readers-digest/auth/data-access-auth";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    const
    tokenURL = "http://localhost:8080/auth/realms/angular/protocol/openid-connect/token";

    constructor(private http: HttpClient) {
    }

    public authenticate(auth: AuthModel) {
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
        return this.http.post(this.tokenURL, body, options).pipe(
            map(data => console.log("Token",data))
        );

    }
}
