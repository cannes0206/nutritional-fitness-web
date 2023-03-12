import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppRoutes } from './core/enums/routes.enum';

const routes: Routes = [
  //{ path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  //{
  //  path: 'auth',
  //  loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  //},
  { path: '', redirectTo: '/overview', pathMatch: 'full' }, // Temporary Landing page upon loading site
  {
    path: AppRoutes.overview,// Temporary Landing page upon loading site
    loadChildren: () => import('./features/overview/overview.module').then((m) => m.OverviewModule)
  },
  {
    path: '',
    children: [
      {
        path: AppRoutes.Users,
        loadChildren: () => import('./features/users/users.module').then((m) => m.UsersModule)
      },
      {
        path: AppRoutes.Meals,
        loadChildren: () => import('./features/meals/meals.module').then((m) => m.MealsModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
