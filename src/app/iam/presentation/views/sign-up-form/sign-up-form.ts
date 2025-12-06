import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IamApi } from '../../../infrastructure/iam-api';
import { DistrictsApi } from '../../../../shared/infrastructure/districts-api';

@Component({
  selector: 'app-sign-up-form',
  standalone: true,
  templateUrl: './sign-up-form.html',
  styleUrls: ['./sign-up-form.css'],
  imports: [CommonModule, FormsModule]
})
export class SignUpForm implements OnInit {

  // Datos del registro
  firstName = '';
  lastName = '';
  username = '';
  email = '';
  password = '';
  confirmPassword = '';
  district = '';

  errorMessage = '';
  districts: string[] = [];

  constructor(
    private api: IamApi,
    private districtApi: DistrictsApi,
    private router: Router
  ) {}

  ngOnInit() {
    this.districtApi.getAllDistricts().subscribe({
      next: list => this.districts = list,
      error: () => console.error('No se pudieron cargar los distritos')
    });
  }

  createAccount() {

    if (!this.firstName || !this.lastName || !this.username || !this.email ||
      !this.password || !this.confirmPassword || !this.district) {

      this.errorMessage = 'Completa todos los campos.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }

    this.api.signUp({
      username: this.username,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      district: this.district,
      roles: ["ROLE_USER"]
    }).subscribe({
      next: () => {
        this.router.navigate(['/sign-up-success']);
      },
      error: () => {
        this.errorMessage = 'No se pudo crear la cuenta.';
      }
    });

  }
}
