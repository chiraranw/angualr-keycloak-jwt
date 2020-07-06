import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthDataAccessAuthModule} from "@readers-digest/auth/data-access-auth";

import {RouterModule} from "@angular/router";

@NgModule({
    imports: [CommonModule, AuthDataAccessAuthModule, RouterModule],
  declarations: [DashboardComponent],
  exports:[DashboardComponent]
})
export class ReadersDigestDashboardFeatureShellModule {}
