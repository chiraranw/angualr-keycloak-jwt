import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFacade } from './+state/facade/user.facade';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './+state/effects/user.effects';
import { StoreFeatureModule, StoreModule } from '@ngrx/store';
import { UsersReducer } from './+state/reducer/user.reducer';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([UserEffects]),
    StoreModule.forFeature('users', UsersReducer),
  ],
  providers: [UserFacade],
})
export class ReadersDigestUserDataAccessModule {}
