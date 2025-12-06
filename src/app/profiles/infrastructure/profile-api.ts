import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Profile } from '../domain/model/profile.entity';

@Injectable({ providedIn: 'root' })
export class ProfileApi {

  private baseUrl = `${environment.apiUrl}/profiles`;

  constructor(private http: HttpClient) {}

  getMyProfile(): Observable<Profile> {
    const userId = Number(localStorage.getItem('userId'));
    return this.http.get<Profile>(`${this.baseUrl}/${userId}`);
  }

  updateProfile(profile: Profile): Observable<Profile> {
    return this.http.put<Profile>(`${this.baseUrl}/${profile.userId}`, profile);
  }
}
