import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { SmartBinsApi, SmartBin } from '../../../infrastructure/smartbins-api';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-map.html',
  styleUrls: ['./user-map.css']
})
export class UserMapView implements OnInit {

  map!: L.Map;
  bins: SmartBin[] = [];
  selectedBin: SmartBin | null = null;

  comment = '';
  selectedDistrict = '';
  sending = false;

  districts = [
    'San Miguel', 'Magdalena', 'Pueblo Libre', 'San Isidro',
    'Surco', 'Miraflores', 'La Molina', 'Callao', 'Lince'
  ];

  constructor(private smartBinApi: SmartBinsApi) {}

  ngOnInit() {
    this.initMap();
    this.loadBins();
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

    marker.on('click', () => {
      this.selectedBin = bin;
      this.selectedDistrict = bin.district;
      console.log("Seleccionado:", bin);
    });
  }

  canSendReport(): boolean {
    return (
      this.selectedBin !== null &&
      this.comment.trim().length > 0 &&
      this.selectedDistrict.length > 0
    );
  }

  sendReport() {
    if (!this.selectedBin) return;

    this.sending = true;

    this.smartBinApi.createReport({
      message: this.comment,
      photoUrl: null,
      smartBinId: this.selectedBin.id,
      district: this.selectedDistrict
    }).subscribe({
      next: () => {
        alert('Reporte enviado correctamente');
        this.comment = '';
        this.sending = false;
      },
      error: () => {
        alert('Error enviando reporte');
        this.sending = false;
      }
    });
  }
}
