# Angular | Spring Boot REST API | Keycloak
Assuming Keycloak Server has been set as follows:

	server: localhost:8080
	realm:  angular
	client:	angular-keycloak
	user:	admin,1234
	client secret: cleint_secret

First we send a `POST` request to the following URL

    http://localhost:8080/auth/realms/angular/protocol/openid-connect/token
    
		http://localhost:8080/ = Keycloak Server & port
		angular = the realm specified in Keycloak
    
    
 The `POST` request is sent with the following data
 
````Typescript 
const body = new HttpParams({
        fromObject: {
            client_id: 'angular-login',
            username: 'admin',
            password: '1234',
            grant_type: 'password'
        }
    });
`````


And we specify the headers
````Typescript 
const headers = new HttpHeaders(
      {
          Accept: 'application/json',
          'Content-Type': `application/x-www-form-urlencoded`
      }
  );
`````

The full request looks like the following:

     http.post(url, body, headers)
     
Successful processing of this request returns


        {
          "access_token": "eyJhb..", <=== The token we send to a Keycloak secured API
          "expires_in": 300,
          "refresh_expires_in": 1800,
          "refresh_token": "eyJhbGciOiJ...", <=== The token we send to Keycloak when our Access token expires
          "token_type": "bearer",
          "not-before-policy": 0,
          "session_state": "ab13f9e3-7f54-4bf3-a606-b7869096ce49",
          "scope": "email profile"
        }

We then persist the tokens as per the requirements of the system.


## Refreshing JWT in Angular with Keycloak

The access_token is bound to expire. When that happens, we will need to refresh and get a new token.
So we send a POST request to the same url about, but this time with different parameters:

````Typescript
  const body = new HttpParams({
    fromObject: {
        client_id: 'angular-login',
        grant_type: 'refresh_token', <====This changed
        refresh_token: 'eyJhbGciOiJ...' <==== The refresh token we recieved from the first request
    }
  });
````

This way we get a new Access Token and a new Refresh Token.


    This way we get a new Access Token and a new Refresh Token.

### HttpInterceptor & Refreshing Logic

When the access token expires, we need not prompt the user to provide username and passowrd to get a new token. Rather we use
the refresh token to obtain a new access - again the user does not need to know that this what is happening. To accomplish this
we use an HttpInterceptor to intercept HttpRequests & HttpResponse. In the Httpresponse we look for Unauthorized Error (4001). Upon
encountering this, we then trigure code that goes to Keycloak and presents for us the refresh token in an attempt to get another set 
of tokens. If this request succeeds, we then proceed with the declined requests. If the Refresh Token is incorrect or expired, in that
case we get a 400 Error. In this case we need to clear existing tokens and redirect the user to Login.

Below in the **HttpInterceptor** that we can use to achieve this:

````Typescript
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

    constructor(private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        /**
         * Pipe the token if it exist, but remember to exclude some request
         * that do not require this
         * **/
        if (this.authService.getJWTToken()) {
            req = AuthHttpInterceptor.addToken(req, this.authService.getJWTToken())
        }
        return next.handle(req).pipe(
            catchError(error => {
                console.log("error:", error.status)
                if (error instanceof HttpErrorResponse && error.status === 401) {
                    /**
                     * We have found 401, Unauthorized Error so we fire a POST request to Keycloak
                     * Server to get another set of tokens.
                     * **/
                    return this.handle401Error(req, next);
                } else if (error instanceof HttpErrorResponse && error.status === 400) {
                    /**
                     * We have encountered a 400, Bad Request Error. The refresh token presented to
                     * Keycloak has expired or incorrect, hence, we redirect the user to Login
                     * **/
                    this.handle400Error(error);
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
                    return next.handle(AuthHttpInterceptor.addToken(request, token.jwt));
                }));

        } else {
            return this.refreshTokenSubject.pipe(
                filter(token => token != null),
                take(1),
                switchMap(jwt => {
                    return next.handle(AuthHttpInterceptor.addToken(request, jwt));
                }));
        }
    }

    handle400Error(error) {
        //if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
        console.log("Found a 400 while trying to refresh a token, likely expired.")
        // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
        return this.authService.logout();
    }

    //method to insert the auth header
    private static addToken(request: HttpRequest<any>, token: string) {
        return request.clone({
            setHeaders: {
                'Authorization': `Bearer ${token}`
            }
        });
    }
} 
````

### Spring Boot REST API | Spring Security | Keycloak

There is a ready to use Adapter for Spring Boot projects

	    <dependency>
            <groupId>org.keycloak</groupId>
            <artifactId>keycloak-spring-boot-starter</artifactId>
        </dependency>

This dependecny makes the Spring Boot project aware that we are using Keycloak for JWT Authentication.
We also need to specify the following in our properties file
	
	#Keycloak configurations
	keycloak.auth-server-url=http://localhost:8080/auth
	keycloak.realm=angular
	keycloak.public-client=true
	keycloak.resource=angular-login
	keycloak.principal-attribute=preferred_username

We need to a WebSecurityConfigurerAdapter for our API, Keycloak comes with one that needs little tweaking

````Java
@Configuration
public class KeycloakWebSecurityConfig extends KeycloakWebSecurityConfigurerAdapter {

    //tasks the SimpleAuthorityMapper to make sure roles are not prefixed with ROLE_
    @Autowired
    public void configureGlobal(
            AuthenticationManagerBuilder auth) throws Exception {
        KeycloakAuthenticationProvider keycloakAuthenticationProvider
                = keycloakAuthenticationProvider();
        keycloakAuthenticationProvider.setGrantedAuthoritiesMapper(
                new SimpleAuthorityMapper());
        auth.authenticationProvider(keycloakAuthenticationProvider);
    }

    //this defines that we want to use the Spring Boot properties file support instead of the default keycloak.json
    @Bean
    public KeycloakSpringBootConfigResolver KeycloakConfigResolver() {
        return new KeycloakSpringBootConfigResolver();
    }

    @Bean
    @Override
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        return new RegisterSessionAuthenticationStrategy(
                new SessionRegistryImpl());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);
        http.cors().and().authorizeRequests()
                .antMatchers("/api/v1/users/test*")
                .hasRole("admin") <=== Real Roles here !!!
                .anyRequest()
                .permitAll();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:4200","http://localhost:8080"));
        configuration.setAllowCredentials(true);
        configuration.setAllowedHeaders(Arrays.asList("Access-Control-Allow-Headers","Access-Control-Allow-Origin","Access-Control-Request-Method", "Access-Control-Request-Headers","Origin","Cache-Control", "Content-Type", "Authorization"));
        configuration.setAllowedMethods(Arrays.asList("DELETE", "GET", "POST", "PATCH", "PUT"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
````

This gets us up and running with Angular | Keycloak | JWTs | Spring Security



