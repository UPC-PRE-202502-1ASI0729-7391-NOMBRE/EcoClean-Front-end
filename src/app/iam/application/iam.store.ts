import { Injectable, signal } from '@angular/core';
import { User } from '../domain/model/user.entity';

@Injectable({ providedIn: 'root' })
export class IamStore {
  user = signal<User | null>(null);
  token = signal<string | null>(null);

  setAuthentication(user: User, token: string) {
    this.user.set(user);
    this.token.set(token);

    localStorage.setItem('token', token);
    localStorage.setItem('userId', String(user.id));
  }

  logout() {
    this.user.set(null);
    this.token.set(null);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  }

  isAuthenticated() {
    return this.token() !== null;
  }
}
