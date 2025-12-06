import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JobApi, JobApplication } from '../../../../recruitment/infrastructure/job-application-api';

@Component({
  selector: 'app-admin-job-review',
  standalone: true,
  templateUrl: './admin-job-review.html',
  styleUrls: ['./admin-job-review.css'],
  imports: [CommonModule]
})
export class AdminJobReviewView implements OnInit {

  loading = true;
  applications: JobApplication[] = [];

  constructor(private jobApi: JobApi) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.jobApi.getApplications().subscribe({
      next: apps => {
        this.applications = apps;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  updateStatus(app: JobApplication, status: string) {
    this.jobApi.updateStatus(app.id, status).subscribe(() => {
      this.loadApplications();
    });
  }

  hireEmployee(app: JobApplication) {
    this.jobApi.updateStatus(app.id, "APPROVED").subscribe(() => {
      this.loadApplications();
    });
  }
}
