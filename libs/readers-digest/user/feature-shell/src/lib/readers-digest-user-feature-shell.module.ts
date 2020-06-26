import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';
import { UserAddComponent } from './components/user-add/user-add.component';

@NgModule({
  imports: [CommonModule],
  declarations: [UserListComponent, UserEditComponent, UserAddComponent],
})
export class ReadersDigestUserFeatureShellModule {}
