import {Injectable} from '@angular/core';
import {Observable, of} from "rxjs";
import {User} from "@readers-digest/auth/data-access-auth";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
    }

    authenticate(auth: AuthModel):Observable<User> {
        console.log("Service...",auth)
        let temp: User = {username: "chiraranw", name: "nation", role: "admin", token: "token"};
        return of(temp);
    }
}
