import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {AuthUiModule} from "@readers-digest/auth/ui";
import {AuthFeatureShellModule} from "@readers-digest/auth/feature-shell";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], {initialNavigation: 'enabled'}),
        AuthUiModule,
        AuthFeatureShellModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])

    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
