import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobApi, JobApplication } from '../../../../recruitment/infrastructure/job-application-api';

@Component({
  selector: 'app-admin-employees',
  standalone: true,
  templateUrl: './admin-employees.html',
  styleUrls: ['./admin-employees.css'],
  imports: [CommonModule]
})
export class AdminEmployeesView implements OnInit {

  loading = true;
  employees: JobApplication[] = [];

  constructor(private jobApi: JobApi) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.jobApi.getApplications().subscribe({
      next: apps => {
        // empleados = solicitudes aprobadas
        this.employees = apps.filter(a => a.status === "APPROVED");
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  fire(userId: number) {
    if (!confirm("¿Seguro que deseas despedir a este empleado?")) return;

    this.jobApi.fireEmployee(userId).subscribe({
      next: () => {
        alert("Empleado despedido correctamente.");
        this.loadEmployees();
      },
      error: () => alert("Error al despedir empleado.")
    });
  }
}
