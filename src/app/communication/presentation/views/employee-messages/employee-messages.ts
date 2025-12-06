import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-employee-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-messages.html',
  styleUrls: ['./employee-messages.css']
})
export class EmployeeMessagesView implements OnInit {

  municipality = '';
  loading = true;
  chats: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.municipality = localStorage.getItem('municipality') ?? '';
    this.loadMessages();
  }

  loadMessages() {
    this.loading = true;

    this.http.get<any[]>(`${environment.apiUrl}/communication/messages/${this.municipality}`)
      .subscribe({
        next: msgs => {
          // Agrupar por ciudadano
          const grouped: any = {};

          msgs.forEach(m => {
            if (!grouped[m.senderId]) grouped[m.senderId] = [];
            grouped[m.senderId].push(m);
          });

          this.chats = Object.keys(grouped).map(senderId => ({
            senderId,
            messages: grouped[senderId]
          }));

          this.loading = false;
        }
      });
  }

  openChat(userId: number) {
    this.router.navigate(['/employee/chat', userId]);
  }
}
