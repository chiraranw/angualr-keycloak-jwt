import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {RouterModule, Routes} from '@angular/router';
import {AuthUiModule} from "@readers-digest/auth/ui";
import {AuthFeatureShellModule} from "@readers-digest/auth/feature-shell";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {
    DashboardComponent,
    ReadersDigestDashboardFeatureShellModule
} from '@readers-digest/readers-digest/dashboard/feature-shell';
import {LoginComponent} from "@readers-digest/auth/feature-shell";
import {ReadersDigestUserFeatureShellModule} from "@readers-digest/readers-digest/user/feature-shell";
import {UsersListComponent} from "@readers-digest/readers-digest/user/feature-shell";

const routes: Routes = [
    {
        path: 'dashboard', component: DashboardComponent
    },
    {
        path: 'users', component: UsersListComponent
    },
    {
        path: '', component: LoginComponent
    }
]

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        AuthUiModule,
        AuthFeatureShellModule,
        ReadersDigestDashboardFeatureShellModule,
        ReadersDigestUserFeatureShellModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])

    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
