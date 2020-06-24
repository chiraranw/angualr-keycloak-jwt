import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule} from "@ngrx/store";
import {AuthReducer, AuthService} from "@readers-digest/auth/data-access-auth";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "@readers-digest/auth/data-access-auth";

@NgModule({
  imports: [
      CommonModule,
      //StoreModule.forFeature("auth",AuthReducer),
      //EffectsModule.forFeature([AuthEffects])
  ],
  exports:[]
})
export class AuthDataAccessAuthModule {}
