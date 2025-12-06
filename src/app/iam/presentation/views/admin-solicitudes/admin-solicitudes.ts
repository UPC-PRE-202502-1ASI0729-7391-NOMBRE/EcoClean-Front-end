import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-admin-solicitudes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-solicitudes.html',
  styleUrls: ['./admin-solicitudes.css']
})
export class AdminSolicitudesComponent implements OnInit {

  solicitudes: any[] = [];
  loading = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadSolicitudes();
  }

  loadSolicitudes() {
    this.loading = true;

    this.http.get<any[]>(`${environment.apiUrl}/recruitment/applications`)
      .subscribe({
        next: (data) => {
          this.solicitudes = data;
          this.loading = false;
        },
        error: () => {
          alert("Error cargando solicitudes");
          this.loading = false;
        }
      });
  }

  updateStatus(id: number, status: string) {
    if (!confirm(`¿Confirmar acción: ${status}?`)) return;

    this.http.put(
      `${environment.apiUrl}/recruitment/applications/${id}/status`,
      { status }
    ).subscribe({
      next: () => {
        alert("Estado actualizado");
        this.loadSolicitudes();
      },
      error: () => alert("Error actualizando estado")
    });
  }
}
