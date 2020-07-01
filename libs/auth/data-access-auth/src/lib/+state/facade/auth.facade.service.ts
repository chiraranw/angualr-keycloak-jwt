import { Injectable } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Store} from "@ngrx/store";
import {AuthState} from "../../+state/reducer/auth.reducer";
import {Login, Logout} from "../../+state/action/auth.action";

@Injectable({
  providedIn: 'root'
})
export class AuthFacadeService {

  constructor(
      private authService:AuthService,
      private store:Store<AuthState>
  ) { }

  public logout(error:any){
    this.store.dispatch(new Logout(error));
  }

  public login(authModel:AuthModel){
    this.store.dispatch(new Login(authModel))
  }
}
