import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { DistrictsApi } from '../../../../shared/infrastructure/districts-api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-messages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-messages.html',
  styleUrls: ['./employee-messages.css']
})
export class EmployeeMessagesView implements OnInit {

  municipality = '';
  loading = false;
  chats: any[] = [];

  isAdmin = false;
  districts: string[] = [];
  selectedDistrictForAdmin = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private districtsApi: DistrictsApi
  ) {}

  ngOnInit(): void {
    const roles = JSON.parse(localStorage.getItem('roles') || '[]');
    this.isAdmin = roles.includes('ROLE_ADMIN');

    if (this.isAdmin) {
      this.loadDistrictsForAdmin();
    } else {
      this.municipality = localStorage.getItem('municipality') ?? '';
      if (this.municipality) {
        this.loadMessages(this.municipality);
      }
    }
  }

  loadDistrictsForAdmin() {
    this.districtsApi.getAllDistricts().subscribe(data => {
      this.districts = data;
    });
  }

  onAdminDistrictChange() {
    if (this.selectedDistrictForAdmin) {
      this.municipality = this.selectedDistrictForAdmin;
      this.loadMessages(this.selectedDistrictForAdmin);
    }
  }

  loadMessages(district: string) {
    this.loading = true;
    this.chats = [];

    this.http.get<any[]>(`${environment.apiUrl}/communication/messages/${district}`)
      .subscribe({
        next: msgs => {
          const grouped: any = {};

          msgs.forEach(m => {
            if (!m.isOfficial) {
              if (!grouped[m.senderId]) grouped[m.senderId] = [];
              grouped[m.senderId].push(m);
            }
          });

          this.chats = Object.keys(grouped).map(senderId => {
            const firstMsg = grouped[senderId][0];
            return {
              senderId: Number(senderId),
              email: firstMsg.senderEmail || `Usuario ${senderId}`, // <--- CAPTURAMOS EMAIL
              messages: grouped[senderId]
            };
          });

          this.loading = false;
        },
        error: () => this.loading = false
      });
  }

  openChat(userId: number) {
    if (!userId) return;
    const prefix = this.isAdmin ? '/admin' : '/employee';

    this.router.navigate([`${prefix}/chat`, userId], {
      queryParams: { municipality: this.municipality }
    });
  }
}
