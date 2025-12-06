import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { SmartBinsApi, SmartBin } from '../../../infrastructure/smartbins-api';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-employee-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-map.html',
  styleUrls: ['./employee-map.css']
})
export class EmployeeMapView implements OnInit {

  map!: L.Map;
  bins: SmartBin[] = [];
  reports: any[] = [];

  employeeDistrict = '';
  loadingReports = true;

  constructor(private smartBinApi: SmartBinsApi, private http: HttpClient) {}

  ngOnInit() {
    this.employeeDistrict = localStorage.getItem('municipality') ?? '';

    this.initMap();
    this.loadBins();
    this.loadReports();
  }

  initMap() {
    this.map = L.map('map').setView([-12.0464, -77.0428], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18
    }).addTo(this.map);
  }

  loadBins() {
    this.smartBinApi.getAllBins().subscribe({
      next: bins => {
        this.bins = bins;
        bins.forEach(bin => this.addMarker(bin));
      }
    });
  }

  addMarker(bin: SmartBin) {
    const marker = L.marker([bin.latitude, bin.longitude]).addTo(this.map);

    marker.bindPopup(`
      <b>${bin.name}</b><br>
      Distrito: ${bin.district}<br>
      Nivel: ${bin.fillLevel}%<br>
      Estado: ${bin.status}
    `);
  }

  loadReports() {
    this.loadingReports = true;

    this.http.get<any[]>(`${environment.apiUrl}/operations/smartbins/reports`)
      .subscribe({
        next: reports => {
          this.reports = reports.filter(r =>
            r.district?.toLowerCase() === this.employeeDistrict.toLowerCase()
          );
          this.loadingReports = false;
        }
      });
  }

  dispatchTruck() {
    if (!confirm("¿Enviar camión al distrito?")) return;

    this.http.post(
      `${environment.apiUrl}/operations/smartbins/dispatch-truck?district=${this.employeeDistrict}`,
      {}
    ).subscribe({
      next: () => alert("🚛 Camión despachado exitosamente.")
    });
  }
}
