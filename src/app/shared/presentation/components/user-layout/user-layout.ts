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

    // Si no hay token, mandar al login
    if (!token) {
      this.router.navigate(['/sign-in']);
      return;
    }

    // Cargar datos del almacenamiento local
    const storedName = localStorage.getItem('username');
    const storedRoles = localStorage.getItem('roles');
    const storedMunicipality = localStorage.getItem('municipality');

    if (storedName) this.username = storedName;

    if (storedMunicipality) {
      this.municipality = storedMunicipality;
    }

    // Parseo seguro de roles
    if (storedRoles) {
      try {
        this.roles = JSON.parse(storedRoles);
      } catch (e) {
        console.error('Error al leer roles', e);
        this.roles = [];
      }
    }

    // Calcular qué mostrar en la etiqueta de rol
    this.displayedRole = this.resolveRole();
  }

  /** Determina el rol visible en la barra lateral */
  resolveRole(): string {
    if (this.roles.includes('ROLE_ADMIN')) {
      return 'Administrador';
    }

    if (this.roles.includes('ROLE_EMPLOYEE')) {
      return this.municipality
        ? `Empleado - ${this.municipality}`
        : 'Empleado Municipal';
    }

    return 'Ciudadano';
  }

  logout() {
    // Borrar todo para evitar conflictos al cambiar de cuenta
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }
}
