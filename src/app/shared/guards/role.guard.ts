import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as string[];
    const storedRolesJson = localStorage.getItem('roles');

    if (!storedRolesJson) {
      this.router.navigate(['/sign-in']);
      return false;
    }

    const storedRoles: string[] = JSON.parse(storedRolesJson);

    const match = storedRoles.some(r => expectedRoles.includes(r));

    if (!match) {
      this.router.navigate(['/sign-in']);
      return false;
    }

    return true;
  }
}
