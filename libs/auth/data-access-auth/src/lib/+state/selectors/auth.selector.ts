import {createFeatureSelector, createSelector} from "@ngrx/store";
import {AuthState} from "@readers-digest/auth/data-access-auth";

const authFeatureSelector = createFeatureSelector<AuthState>("user");
const getError = createSelector(authFeatureSelector, (state) => state.error)
const getUser = createSelector(authFeatureSelector, (state) => state.user)
const getLoaded = createSelector(authFeatureSelector, (state) => state.loaded)
const isAuthenticated = createSelector(getUser, (user) => !!user)
export const authQuery = {getError, getUser, getLoaded,isAuthenticated};
