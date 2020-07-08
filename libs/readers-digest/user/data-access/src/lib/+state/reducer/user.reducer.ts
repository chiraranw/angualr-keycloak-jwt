import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { User } from '../../model/user';
import { UserActions, UserActionTypes } from '../actions/user.actions';
import { ofType } from '@ngrx/effects';

//Interface to represent the shape of the state
export interface UsersState extends EntityState<User> {
  currentUser: number;
  loaded: boolean;
  error: any;
}

//I need the Adapter to help with CRUD
export const UserAdapter: EntityAdapter<User> = createEntityAdapter();

//Initial state
export const initialState: UsersState = UserAdapter.getInitialState({
  currentUser: null,
  loaded: false,
  error: undefined,
});

//The actual reducer function
export function UsersReducer(
  state = initialState,
  action: UserActions
): UsersState {
  console.log('In reducer..');
  switch (action.type) {
    case UserActionTypes.LOAD_USERS: {
      console.log('Loading users');
      return state;
    }
    case UserActionTypes.LOAD_USERS_SUCCESS: {
      console.log('Loading users success');
      return { ...UserAdapter.addMany(action.payload, state), loaded: true };
    }
    case UserActionTypes.LOAD_USERS_FAIL: {
      console.log('Loading users fail');
      return { ...state, error: action.payload };
    }
    default: {
      console.log('default...');
      return state;
    }
  }
}
