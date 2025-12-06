import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { SmartBinsApi, SmartBin } from '../../../infrastructure/smartbins-api';
import { ToastService } from '../../../../shared/application/toast.service'; // Importar

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

  showConfirmModal = false;

  constructor(
    private smartBinApi: SmartBinsApi,
    private http: HttpClient,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.employeeDistrict = localStorage.getItem('municipality') ?? '';
    this.fixLeafletIcons();
    this.initMap();
    this.loadBins();
    this.loadReports();
  }

  private fixLeafletIcons() {
    const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
    const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
    const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });
  }

  initMap() {
    this.map = L.map('map').setView([-12.0464, -77.0428], 13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18 }).addTo(this.map);
  }

  loadBins() {
    this.smartBinApi.getAllBins().subscribe(bins => {
      bins.forEach(bin => {
        L.marker([bin.latitude, bin.longitude]).addTo(this.map)
          .bindPopup(`<b>${bin.name}</b><br>${bin.status}`);
      });
    });
  }

  loadReports() {
    this.loadingReports = true;
    this.http.get<any[]>(`${environment.apiUrl}/operations/smartbins/reports`)
      .subscribe({
        next: reports => {
          this.reports = reports.filter(r => r.district?.toLowerCase() === this.employeeDistrict.toLowerCase());
          this.loadingReports = false;
        }
      });
  }

  openDispatchModal() {
    this.showConfirmModal = true;
  }

  cancelDispatch() {
    this.showConfirmModal = false;
  }

  confirmDispatch() {
    this.showConfirmModal = false;

    this.http.post(
      `${environment.apiUrl}/operations/smartbins/dispatch-truck?district=${this.employeeDistrict}`,
      {}
    ).subscribe({
      next: (res: any) => {
        this.toastService.show(res.message || "Camión despachado", 'success');
      },
      error: () => {
        this.toastService.show("Error al despachar unidad.", 'error');
      }
    });
  }
}
