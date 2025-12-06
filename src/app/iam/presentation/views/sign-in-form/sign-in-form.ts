import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IamApi } from '../../../infrastructure/iam-api';

@Component({
  selector: 'app-sign-in-form',
  standalone: true,
  templateUrl: './sign-in-form.html',
  styleUrls: ['./sign-in-form.css'],
  imports: [CommonModule, FormsModule]
})
export class SignInForm {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private api: IamApi, private router: Router) {}

  signIn() {
    this.api.signIn({ username: this.username, password: this.password }).subscribe({
      next: (user) => {
        // Guardar datos clave
        localStorage.setItem('token', user.token);
        localStorage.setItem('userId', user.id.toString());
        localStorage.setItem('username', user.username);

        if (user.roles) {
          localStorage.setItem('roles', JSON.stringify(user.roles));
        }

        if (user.municipality) {
          localStorage.setItem('municipality', user.municipality);
        }

        // Redirección según rol
        const roles = user.roles || [];
        if (roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/solicitudes']);
        } else if (roles.includes('ROLE_EMPLOYEE')) {
          this.router.navigate(['/employee/tendencias']);
        } else {
          this.router.navigate(['/user/tendencias']);
        }
      },
      error: () => {
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  }
}
