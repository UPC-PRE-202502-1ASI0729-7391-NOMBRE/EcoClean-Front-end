import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-up-success',
  standalone: true,
  templateUrl: './sign-up-success.html',
  styleUrls: ['./sign-up-success.css'],
  imports: [CommonModule]
})
export class SignUpSuccess {
  constructor(private router: Router) {}

  goToLogin() {
    this.router.navigate(['/sign-in']);
  }
}
