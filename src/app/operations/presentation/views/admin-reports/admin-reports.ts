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
    this.smartBinsApi.getAllReports().subscribe({
      next: (data) => {
        console.log("Reportes recibidos:", data);
        this.reports = data;
        this.loading = false;
      },
      error: (err) => {
        console.error("Error cargando reportes", err);
        this.loading = false;
      }
    });
  }
}
