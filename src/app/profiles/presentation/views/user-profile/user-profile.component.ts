import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProfileApi } from '../../../infrastructure/profile-api';
import { Profile } from '../../../domain/model/profile.entity';

import { DistrictsApi } from '../../../../shared/infrastructure/districts-api';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [CommonModule, FormsModule]
})
export class UserProfileComponent implements OnInit {

  profile: any = {};
  loading = true;
  saving = false;
  districts: string[] = [];

  // Campo nuevo para contraseña
  newPassword = '';

  constructor(private profileApi: ProfileApi, private districtsApi: DistrictsApi) {}

  ngOnInit(): void {
    this.loadProfile();
    this.loadDistricts();
  }

  loadProfile() {
    this.profileApi.getMyProfile().subscribe({
      next: (data) => {
        this.profile = data;
        this.loading = false;
      }
    });
  }

  loadDistricts() {
    this.districtsApi.getAllDistricts().subscribe(list => this.districts = list);
  }

  saveProfile() {
    this.saving = true;

    // Incluir password si el usuario escribió algo
    const updateData = { ...this.profile, password: this.newPassword || null };

    this.profileApi.updateProfile(updateData).subscribe({
      next: () => {
        alert('Perfil actualizado correctamente.');
        this.newPassword = ''; // Limpiar campo
        this.saving = false;
      },
      error: () => {
        alert('Error al actualizar.');
        this.saving = false;
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
