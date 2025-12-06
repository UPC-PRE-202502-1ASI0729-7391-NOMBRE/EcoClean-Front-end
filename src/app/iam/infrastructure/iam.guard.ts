import { CanActivateFn, Router } from '@angular/router';

export const iamGuard: CanActivateFn = () => {
  const token = localStorage.getItem('token');
  return !!token;
};
