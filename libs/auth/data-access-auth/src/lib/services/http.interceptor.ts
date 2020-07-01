import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {AuthService} from "./auth.service";
import {catchError, filter, retry, switchMap, take} from "rxjs/operators";
import {AuthFacadeService} from "../../lib/+state/facade/auth.facade.service";

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

    constructor(
        private authService: AuthService,
        private authFacade:AuthFacadeService
        ) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //Pipe the token if it exist
        if (this.authService.getAccessToken()) {
            req = this.addToken(req, this.authService.getAccessToken())
        }
        return next.handle(req).pipe(
            catchError(error => {

                console.log("Intercepted an error:", error)
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    return this.handle401Error(req, next);
                } else if (error instanceof HttpErrorResponse && error.status === 400) {
                    this.handle400Error(error);
                    return throwError(error);
                } else if (error instanceof HttpErrorResponse && error.status === 0 && error.statusText === "Unknown Error") {
                    this.authFacade.logout(error);
                    return throwError(error);
                } else {
                    return throwError(error);
                }
            })
        );
    }

    private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshing) {
            this.isRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((token: any) => {
                    this.isRefreshing = false;
                    this.refreshTokenSubject.next(token.jwt);
                    return next.handle(this.addToken(request, token.jwt));
                }));

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(this.addToken(request, jwt));
                }));
        }
    }

    handle400Error(error) {
        //if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
        console.log("Found a 400 while trying to refresh a token, likely expired.")
        // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
        return this.authFacade.logout(error);
        //  }
    }

    //method to insert the auth header
    private addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }

}
