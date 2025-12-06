import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-layout.html',
  styleUrls: ['./user-layout.css']
})
export class UserLayoutComponent implements OnInit {

  username: string = 'Usuario';
  displayedRole: string = 'Ciudadano';

  roles: string[] = [];
  municipality: string = '';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/sign-in']);
      return;
    }

    const storedName = localStorage.getItem('username');
    const storedRoles = localStorage.getItem('roles');
    const storedMunicipality = localStorage.getItem('municipality');

    if (storedName) this.username = storedName;

    // Leer roles
    if (storedRoles) {
      this.roles = JSON.parse(storedRoles);
    }

    // Leer municipalidad del empleado
    if (storedMunicipality) {
      this.municipality = storedMunicipality;
    }

    // Calcular el rol visible en la interfaz
    this.displayedRole = this.resolveRole();
  }

  /** Determina el rol visible basado en los roles reales */
  resolveRole(): string {
    if (this.roles.includes('ROLE_ADMIN')) {
      return 'Administrador';
    }

    if (this.roles.includes('ROLE_EMPLOYEE')) {
      return this.municipality
        ? `Empleado de ${this.municipality}`
        : 'Empleado';
    }

    return 'Ciudadano';
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
    localStorage.removeItem('municipality');

    this.router.navigate(['/sign-in']);
  }
}
