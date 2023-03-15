import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './core/enums/routes.enum';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: AppRoutes.Auth,
        pathMatch: 'full'
      },
      {
        path: AppRoutes.Auth,
        loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
      },
      {
        path: AppRoutes.Overview,
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/overview/overview.module').then((m) => m.OverviewModule)
      },
      {
        path: AppRoutes.Users,
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/users/users.module').then((m) => m.UsersModule)
      },
      {
        path: AppRoutes.Meals,
        canActivate: [AuthGuard],
        loadChildren: () => import('./features/meals/meals.module').then((m) => m.MealsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
