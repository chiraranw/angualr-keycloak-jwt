import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import {UsersListComponent} from './containers/users.list/users.list.component';
import {ReadersDigestUserDataAccessModule} from "@readers-digest/readers-digest/user/data-access";

@NgModule({
  imports: [CommonModule,ReadersDigestUserDataAccessModule],
  declarations: [UserListComponent, UserEditComponent, UserAddComponent, UsersListComponent],
  exports: [UsersListComponent],
})
export class ReadersDigestUserFeatureShellModule {}
