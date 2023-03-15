import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserQuestionnairesComponent } from './user-questionnaires/user-questionnaires.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserQuestionnairesComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule { }
