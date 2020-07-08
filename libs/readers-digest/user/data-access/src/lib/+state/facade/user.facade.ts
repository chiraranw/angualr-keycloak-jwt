import { UserService } from '../../services/user.service';
import { Injectable } from '@angular/core';
import { UsersState } from '../../+state/reducer/user.reducer';
import { Store, select } from '@ngrx/store';
import { LoadUsers } from '../../+state/actions/user.actions';
import { UsersQuery } from '../selectors/user.selectors';
import { Observable } from 'rxjs';
import { User } from '../../model/user';

@Injectable()
export class UserFacade {
  users$: Observable<User[]> = this.store.pipe(select(UsersQuery.getUsers));
  error$: Observable<any> = this.store.pipe(select(UsersQuery.getError));

  constructor(
    private usersSvc: UserService,
    private store: Store<UsersState>
  ) {}

  /*Load Users*/
  public getUsers() {
    console.log('Inside facade');
    this.store.dispatch(new LoadUsers());
  }
}
