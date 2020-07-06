import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StoreModule} from "@ngrx/store";
import {AuthReducer} from "./+state/reducer/auth.reducer";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./+state/effects/auth.effects";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthHttpInterceptor} from "./services/http.interceptor";

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule,
        StoreModule.forFeature("auth", AuthReducer),
        EffectsModule.forFeature([AuthEffects])
    ],
    exports: [],
    providers: [
        AuthHttpInterceptor,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthHttpInterceptor,
            multi: true
        }
    ]
})
export class AuthDataAccessAuthModule {
}
