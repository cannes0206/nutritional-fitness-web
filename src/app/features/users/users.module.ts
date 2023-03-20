import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserQuestionnairesComponent } from './user-questionnaires/user-questionnaires.component';
import { DeleteUserModalComponent } from './user-actions-modal/delete-user-modal/delete-user-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { PhaseCycleUpdateModalComponent } from './user-actions-modal/phase-cycle-update-modal/phase-cycle-update-modal.component';
import { ResetCycleModalComponent } from './user-actions-modal/reset-cycle-modal/reset-cycle-modal.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserQuestionnairesComponent,
    DeleteUserModalComponent,
    PhaseCycleUpdateModalComponent,
    ResetCycleModalComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
