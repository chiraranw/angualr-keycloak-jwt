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
