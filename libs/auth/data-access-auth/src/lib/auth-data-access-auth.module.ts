import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule} from "@ngrx/store";
import {AuthReducer} from "./+state/reducer/auth.reducer";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./+state/effects/auth.effects";

@NgModule({
  imports: [
      CommonModule,
      StoreModule.forFeature("auth",AuthReducer),
      EffectsModule.forFeature([AuthEffects])
  ],
  exports:[]
})
export class AuthDataAccessAuthModule {}
