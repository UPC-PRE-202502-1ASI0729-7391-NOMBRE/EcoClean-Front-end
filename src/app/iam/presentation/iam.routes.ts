import { Routes } from '@angular/router';
import { SignInForm } from './views/sign-in-form/sign-in-form';
import { SignUpForm } from './views/sign-up-form/sign-up-form';
import { SignUpSuccess } from './views/sign-up-success/sign-up-success';
import { HomeUser } from './views/home-user/home-user';

export const IamRoutes: Routes = [
  { path: 'sign-in', component: SignInForm },
  { path: 'sign-up', component: SignUpForm },
  { path: 'sign-up-success', component: SignUpSuccess },
  { path: 'user-home', component: HomeUser },
  {
    path: 'admin/solicitudes',
    loadComponent: () => import('./views/admin-solicitudes/admin-solicitudes').then(m => m.AdminSolicitudesComponent)
  }

];
