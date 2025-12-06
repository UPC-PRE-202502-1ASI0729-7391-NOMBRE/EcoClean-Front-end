import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface SignInResponse {
  id: number;
  username: string;
  token: string;
  roles: string[];
  municipality?: string;
}

@Injectable({ providedIn: 'root' })
export class IamApi {

  private baseUrl = `${environment.apiUrl}/authentication`;

  constructor(private http: HttpClient) {}

  signIn(payload: { username: string; password: string }): Observable<SignInResponse> {
    return this.http.post<SignInResponse>(`${this.baseUrl}/sign-in`, payload);
  }

  signUp(payload: any) {
    return this.http.post(`${this.baseUrl}/sign-up`, payload);
  }
}
