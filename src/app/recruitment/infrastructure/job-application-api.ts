import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface JobApplication {
  id: number;
  applicantId: number;
  applicantName: string;
  applicantEmail: string;
  municipality: string;
  status: string;
  description?: string;
}

@Injectable({ providedIn: 'root' })
export class JobApi {

  private baseUrl = `${environment.apiUrl}/recruitment/applications`;

  constructor(private http: HttpClient) {}

  // Obtener todas las solicitudes
  getApplications(): Observable<JobApplication[]> {
    return this.http.get<JobApplication[]>(`${this.baseUrl}`);
  }

  updateStatus(id: number, status: string) {
    return this.http.put(`${this.baseUrl}/${id}/status`, { status });
  }
  getEmployees(): Observable<any[]> {
    // Apuntar al nuevo endpoint en RecruitmentController
    return this.http.get<any[]>(`${this.baseUrl}/employees`);
  }

  fireEmployee(userId: number) {
    return this.http.post(`${this.baseUrl}/employees/${userId}/fire`, {});
  }
  createApplication(payload: { targetMunicipality: string; description: string }) {
    return this.http.post<number>(`${this.baseUrl}`, payload);
  }

}
