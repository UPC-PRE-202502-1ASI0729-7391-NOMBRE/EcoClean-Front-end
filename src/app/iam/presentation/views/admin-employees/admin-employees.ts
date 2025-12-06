import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobApi } from '../../../../recruitment/infrastructure/job-application-api';

@Component({
  selector: 'app-admin-employees',
  standalone: true,
  templateUrl: './admin-employees.html',
  styleUrls: ['./admin-employees.css'],
  imports: [CommonModule]
})
export class AdminEmployeesView implements OnInit {

  employees: any[] = [];
  loading = true;

  constructor(private jobApi: JobApi) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.jobApi.getEmployees().subscribe({
      next: data => {
        this.employees = data;
        this.loading = false;
      }
    });
  }

  fire(userId: number) {
    if (!confirm("¿Seguro que deseas despedir a este empleado?")) return;

    this.jobApi.fireEmployee(userId).subscribe(() => {
      alert("Empleado despedido");
      this.loadEmployees();
    });
  }
}
