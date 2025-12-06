import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-employee-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-layout.html',
  styleUrls: ['./employee-layout.css']
})
export class EmployeeLayoutComponent implements OnInit {

  username = 'Empleado';
  municipality = 'Municipalidad';
  roles: string[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedName = localStorage.getItem('username');
    const storedRoles = localStorage.getItem('roles');
    const storedMunicipality = localStorage.getItem('municipality');
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/sign-in']);
      return;
    }

    if (storedName) this.username = storedName;
    if (storedMunicipality) this.municipality = storedMunicipality;

    if (storedRoles) {
      try {
        this.roles = JSON.parse(storedRoles);
      } catch {
        this.roles = [];
      }
    }
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    localStorage.removeItem('roles');
    localStorage.removeItem('municipality');

    this.router.navigate(['/sign-in']);
  }

  getInitial(): string {
    return this.username ? this.username.charAt(0).toUpperCase() : 'E';
  }
}
