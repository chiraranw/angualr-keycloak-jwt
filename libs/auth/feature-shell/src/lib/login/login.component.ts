import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {AuthFacadeService, Login} from "@readers-digest/auth/data-access-auth";

@Component({
  selector: 'readers-digest-login-container',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error$:Observable<any>;

  constructor(private authFacade:AuthFacadeService) { }

  ngOnInit(): void {
  }

  login(authModel:AuthModel){
    console.log("About to log with:",authModel)
    this.authFacade.login(authModel);

  }

}
