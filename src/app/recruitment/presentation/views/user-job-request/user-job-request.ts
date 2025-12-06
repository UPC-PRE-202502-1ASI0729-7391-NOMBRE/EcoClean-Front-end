import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { JobApi } from '../../../infrastructure/job-application-api';

@Component({
  selector: 'app-user-job-request',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-job-request.html',
  styleUrls: ['./user-job-request.css']
})
export class UserJobRequestView implements OnInit {

  municipalities = ['Lima', 'San Borja', 'Surco', 'San Miguel'];
  selectedMunicipality = '';
  description = '';

  successMessage = '';
  applications: any[] = [];

  constructor(private jobApi: JobApi) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  submitApplication() {
    if (!this.selectedMunicipality || !this.description.trim()) {
      alert('Completa la municipalidad y la descripción.');
      return;
    }

    this.jobApi.createApplication({
      targetMunicipality: this.selectedMunicipality,
      description: this.description
    }).subscribe({
      next: () => {
        this.successMessage = 'Tu solicitud ha sido enviada correctamente.';
        this.selectedMunicipality = '';
        this.description = '';

        this.loadApplications();
      }
    });
  }

  loadApplications() {
    this.jobApi.getApplications().subscribe({
      next: data => {
        this.applications = data;
      }
    });
  }
}
