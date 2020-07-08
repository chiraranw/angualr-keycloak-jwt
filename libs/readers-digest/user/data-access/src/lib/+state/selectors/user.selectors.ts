import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UsersState, UserAdapter } from '../reducer/user.reducer';

export const usersSelector = createFeatureSelector<UsersState>('users');
export const getUsers = createSelector(
  usersSelector,
  UserAdapter.getSelectors().selectAll
);
export const getError = createSelector(
  usersSelector,
  (state: UsersState) => state.error
);
export const getLoadingStatus = createSelector(
  usersSelector,
  (state: UsersState) => state.loaded
);

export const UsersQuery = { getUsers, getError, getLoadingStatus };
