import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileApi } from '../../../infrastructure/profile-api';
import { Profile } from '../../../domain/model/profile.entity';

// 👇 Igual que Social
import { DistrictsApi } from '../../../../shared/infrastructure/districts-api';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UserProfileComponent implements OnInit {

  profile!: Profile;
  loading = true;
  saving = false;

  defaultPhoto = 'https://via.placeholder.com/300';

  districts: string[] = [];   // ← ya no es fija, ahora viene del backend

  constructor(
    private profileApi: ProfileApi,
    private districtsApi: DistrictsApi
  ) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadDistricts();
  }

  loadProfile() {
    this.profileApi.getMyProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        alert('Debes crear un perfil primero.');
      }
    });
  }

  loadDistricts() {
    this.districtsApi.getAllDistricts().subscribe({
      next: (list: string[]) => {
        this.districts = list;
      },
      error: () => {
        console.error('Error cargando distritos');
      }
    });
  }

  saveProfile() {
    this.saving = true;

    this.profileApi.updateProfile(this.profile).subscribe({
      next: updated => {
        this.profile = updated;
        this.saving = false;
        alert('Perfil actualizado.');
      },
      error: () => {
        this.saving = false;
        alert('Error al actualizar el perfil.');
      }
    });
  }

  triggerImageUpload() {
    document.getElementById('photoInput')?.click();
  }

  onImageSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.profile.photoUrl = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
