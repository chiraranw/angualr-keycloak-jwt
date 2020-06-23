import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AuthDataAccessAuthModule} from "@readers-digest/auth/data-access-auth";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [CommonModule,AuthDataAccessAuthModule,ReactiveFormsModule],
  declarations: [LoginComponent],
  exports: [LoginComponent],
})
export class AuthUiModule {}
