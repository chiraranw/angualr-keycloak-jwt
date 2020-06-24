import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AuthDataAccessAuthModule} from "@readers-digest/auth/data-access-auth";
import {AuthUiModule} from "@readers-digest/auth/ui";

@NgModule({
  imports: [CommonModule,AuthDataAccessAuthModule,AuthUiModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthFeatureShellModule {}
