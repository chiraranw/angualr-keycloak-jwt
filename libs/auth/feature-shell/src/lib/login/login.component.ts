import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {Store} from "@ngrx/store";
import {Login} from "@readers-digest/auth/data-access-auth";

@Component({
  selector: 'readers-digest-login-container',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public error$:Observable<any>;

  constructor() { }

  ngOnInit(): void {
  }

  login(authModel:AuthModel){
    console.log("About to log with:",authModel)
    //this.store.dispatch(new Login(authModel))

  }

}
