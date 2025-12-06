import { Routes } from '@angular/router';
import { SignInForm } from './iam/presentation/views/sign-in-form/sign-in-form';
import { SignUpForm } from './iam/presentation/views/sign-up-form/sign-up-form';
import { SignUpSuccess } from './iam/presentation/views/sign-up-success/sign-up-success';

import { TrendingDistrictComponent } from './social/presentation/views/trending-district/trending-district';
import { RoleGuard } from './shared/guards/role.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sign-in' },

  { path: 'sign-in', component: SignInForm },
  { path: 'sign-up', loadComponent: () => import('./iam/presentation/views/sign-up-form/sign-up-form').then(m => m.SignUpForm) },
  { path: 'sign-up-success', component: SignUpSuccess },

  /* ============================================================
      LAYOUT CIUDADANO
  ============================================================ */
  {
    path: 'user',
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_USER'] },
    loadComponent: () =>
      import('./shared/presentation/components/user-layout/user-layout')
        .then(m => m.UserLayoutComponent),
    children: [
      { path: 'tendencias', component: TrendingDistrictComponent },
      {
        path: 'mapa',
        loadComponent: () =>
          import('./operations/presentation/views/user-map/user-map')
            .then(m => m.UserMapView)
      },
      {
        path: 'mensajes',
        loadComponent: () =>
          import('./communication/presentation/views/user-messages/user-messages')
            .then(m => m.UserMessagesView)
      },
      {
        path: 'chat/:municipality',
        loadComponent: () =>
          import('./communication/presentation/views/user-chat/user-chat')
            .then(m => m.UserChatView)
      },
      {
        path: 'empleo',
        loadComponent: () =>
          import('./recruitment/presentation/views/user-job-request/user-job-request')
            .then(m => m.UserJobRequestView)
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./profiles/presentation/views/user-profile/user-profile.component')
            .then(m => m.UserProfileComponent)
      },
      { path: '', pathMatch: 'full', redirectTo: 'tendencias' }
    ]
  },

  /* ============================================================
      LAYOUT EMPLEADO
  ============================================================ */
  {
    path: 'employee',
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_EMPLOYEE'] },
    loadComponent: () =>
      import('./shared/presentation/components/employee-layout/employee-layout')
        .then(m => m.EmployeeLayoutComponent),
    children: [
      { path: 'tendencias', component: TrendingDistrictComponent },
      {
        path: 'mapa',
        loadComponent: () =>
          import('./operations/presentation/views/user-map/user-map')
            .then(m => m.UserMapView)
      },
      {
        path: 'mensajes',
        loadComponent: () =>
          import('./communication/presentation/views/user-messages/user-messages')
            .then(m => m.UserMessagesView)
      },
      {
        path: 'employee/mensajes',
        loadComponent: () =>
          import('./communication/presentation/views/employee-messages/employee-messages')
            .then(m => m.EmployeeMessagesView)
      },
      {
        path: 'employee/chat/:userId',
        loadComponent: () =>
          import('./communication/presentation/views/employee-chat/employee-chat')
            .then(m => m.EmployeeChatView)
      },
      {
        path: 'chat/:municipality',
        loadComponent: () =>
          import('./communication/presentation/views/user-chat/user-chat')
            .then(m => m.UserChatView)
      },
      {
        path: 'perfil',
        loadComponent: () =>
          import('./profiles/presentation/views/user-profile/user-profile.component')
            .then(m => m.UserProfileComponent)
      },
      { path: '', pathMatch: 'full', redirectTo: 'tendencias' }
    ]
  },

  /* ============================================================
      LAYOUT ADMIN
  ============================================================ */
  {
    path: 'admin',
    canActivate: [RoleGuard],
    data: { roles: ['ROLE_ADMIN'] },
    loadComponent: () =>
      import('./shared/presentation/components/admin-layout/admin-layout')
        .then(m => m.AdminLayoutComponent),
    children: [

      {
        path: 'solicitudes',
        loadComponent: () =>
          import('./recruitment/presentation/views/admin-job-review/admin-job-review')
            .then(m => m.AdminJobReviewView)
      },
      {
        path: 'reportes',
        loadComponent: () =>
          import('./operations/presentation/views/admin-reports/admin-reports')
            .then(m => m.AdminReportsView)
      },

      {
        path: 'tachos',
        loadComponent: () =>
          import('./operations/presentation/views/admin-bins/admin-bins')
            .then(m => m.AdminBinsView)
      },

      {
        path: 'empleados',
        loadComponent: () =>
          import('./iam/presentation/views/admin-employees/admin-employees')
            .then(m => m.AdminEmployeesView)
      },

      { path: '', pathMatch: 'full', redirectTo: 'solicitudes' }
    ]
  },


  { path: '**', redirectTo: 'sign-in' }
];
