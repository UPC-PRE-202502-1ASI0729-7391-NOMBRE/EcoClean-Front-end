import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartBinsApi, BinReport } from '../../../infrastructure/smartbins-api';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  templateUrl: './admin-reports.html',
  styleUrls: ['./admin-reports.css'],
  imports: [CommonModule]
})
export class AdminReportsView implements OnInit {

  reports: BinReport[] = [];
  loading = true;

  constructor(private smartBinsApi: SmartBinsApi) {}

  ngOnInit() {
    this.loadReports();
  }

  loadReports() {
    this.smartBinsApi.getAllReports().subscribe({
      next: (data) => {
        this.reports = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  // NUEVA FUNCIÓN
  dispatchTruck(district: string) {
    if(!confirm(`¿Enviar camión a ${district}?`)) return;

    this.smartBinsApi.dispatchTruck(district).subscribe({
      next: (res: any) => {
        alert(res.message);
      },
      error: () => alert("Error al despachar unidad.")
    });
  }
}
