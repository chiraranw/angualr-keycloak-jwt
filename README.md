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
