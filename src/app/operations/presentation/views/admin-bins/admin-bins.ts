import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartBinsApi, SmartBin } from '../../../../operations/infrastructure/smartbins-api';

@Component({
  selector: 'app-admin-bins',
  standalone: true,
  templateUrl: './admin-bins.html',
  styleUrls: ['./admin-bins.css'],
  imports: [CommonModule]
})
export class AdminBinsView implements OnInit {

  bins: SmartBin[] = [];
  loading = true;

  constructor(private smartBinsApi: SmartBinsApi) {}

  ngOnInit() {
    this.smartBinsApi.getAllBins().subscribe({
      next: (data) => {
        this.bins = data;
        this.loading = false;
      }
    });
  }
}
