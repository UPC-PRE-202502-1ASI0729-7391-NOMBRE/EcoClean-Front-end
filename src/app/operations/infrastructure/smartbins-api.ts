import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

export interface SmartBin {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  fillLevel: number;
  status: string;
  district: string;
}
export interface BinReport {
  id: number;
  message: string;
  photoUrl: string | null;
  smartBinName: string;
  reporterName: string;
  status: string;
  district: string;
  createdAt?: string;
}

@Injectable({ providedIn: 'root' })
export class SmartBinsApi {

  private baseUrl = `${environment.apiUrl}/operations/smartbins`;

  constructor(private http: HttpClient) {}

  getAllBins(): Observable<SmartBin[]> {
    return this.http.get<SmartBin[]>(`${this.baseUrl}`);
  }

  createReport(data: {
    message: string;
    photoUrl: string | null;
    smartBinId: number;
    district: string;
  }) {
    return this.http.post(`${this.baseUrl}/reports`, data);
  }

  getAllReports(): Observable<BinReport[]> {
    return this.http.get<BinReport[]>(`${this.baseUrl}/reports`);
  }

  dispatchTruck(district: string) {
    return this.http.post(`${this.baseUrl}/dispatch-truck?district=${district}`, {});
  }

  createBin(data: {
    name: string;
    latitude: number;
    longitude: number;
    district: string;
  }) {
    return this.http.post<number>(`${this.baseUrl}`, data);
  }
}
