import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {AuthDataAccessAuthModule} from "@readers-digest/auth/data-access-auth";

@NgModule({
  imports: [CommonModule,AuthDataAccessAuthModule],
  declarations: [DashboardComponent],
  exports:[DashboardComponent]
})
export class ReadersDigestDashboardFeatureShellModule {}
