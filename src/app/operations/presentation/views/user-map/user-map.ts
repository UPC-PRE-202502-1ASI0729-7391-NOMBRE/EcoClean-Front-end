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
    'Surco', 'Miraflores', 'La Molina', 'Callao', 'Lince', 'Lima'
  ];

  constructor(private smartBinApi: SmartBinsApi) {}

  ngOnInit() {
    this.fixLeafletIcons();
    this.initMap();
    this.loadBins();
  }

  private fixLeafletIcons() {
    const iconRetinaUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png';
    const iconUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png';
    const shadowUrl = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png';

    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
    });
  }

  initMap() {
    // Coordenadas de Lima
    this.map = L.map('map').setView([-12.0464, -77.0428], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(this.map);
  }

  loadBins() {
    this.smartBinApi.getAllBins().subscribe({
      next: bins => {
        console.log('Tachos cargados:', bins);
        this.bins = bins;
        if (bins.length === 0) {
          alert("No hay tachos registrados en la base de datos.");
        }
        bins.forEach(bin => this.addMarker(bin));
      },
      error: (err) => console.error('Error cargando tachos', err)
    });
  }

  addMarker(bin: SmartBin) {
    // Crear marcador
    const marker = L.marker([bin.latitude, bin.longitude])
      .addTo(this.map)
      .bindPopup(`<b>${bin.name}</b><br>${bin.district}`);

    marker.on('click', () => {
      console.log("Tacho seleccionado:", bin);
      this.selectedBin = bin;
      this.selectedDistrict = bin.district;
    });
  }

  canSendReport(): boolean {
    return (
      this.selectedBin !== null &&
      this.comment.trim().length > 0
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
        this.selectedBin = null;
        this.selectedDistrict = '';
        this.sending = false;
        this.map.closePopup();
      },
      error: () => {
        alert('Error enviando reporte');
        this.sending = false;
      }
    });
  }
}
