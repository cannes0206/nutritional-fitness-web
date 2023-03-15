import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserTabRouteSegments } from '../../core/enums';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserQuestionnairesComponent } from './user-questionnaires/user-questionnaires.component';

const routes: Routes = [
  {
    path: '',
    component: UserListComponent
  },
  {
    path: UserTabRouteSegments.Questionnaire,
    component: UserQuestionnairesComponent
  },
  {
    path: UserTabRouteSegments.Information,
    children: [
      {
        path: '',
        component: UserDetailsComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {}
