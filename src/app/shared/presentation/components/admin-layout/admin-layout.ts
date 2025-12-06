import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.css']
})
export class AdminLayoutComponent implements OnInit {

  username = 'Admin';
  role = 'Administrador';

  constructor(private router: Router) {}

  ngOnInit(): void {
    const storedName = localStorage.getItem('username');

    if (!localStorage.getItem('token')) {
      this.router.navigate(['/sign-in']);
      return;
    }

    if (storedName) this.username = storedName;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/sign-in']);
  }

  getInitial() {
    return this.username.charAt(0).toUpperCase();
  }
}
