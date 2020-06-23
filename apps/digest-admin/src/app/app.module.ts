import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import {AuthUiModule} from "@readers-digest/auth/ui";

@NgModule({
  declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot([], {initialNavigation: 'enabled'}),
        AuthUiModule,

    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
