import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-chat.html',
  styleUrls: ['./employee-chat.css']
})
export class EmployeeChatView implements OnInit {

  userId!: number;
  municipality = '';
  messages: any[] = [];
  newMessage = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
    this.municipality = localStorage.getItem('municipality') ?? '';

    this.loadMessages();
  }

  loadMessages() {
    this.http.get<any[]>(`${environment.apiUrl}/communication/messages/${this.municipality}`)
      .subscribe({
        next: msgs => {
          this.messages = msgs.filter(m => m.senderId == this.userId || m.employeeId);
        }
      });
  }

  sendReply() {
    if (!this.newMessage.trim()) return;

    const payload = { content: this.newMessage };

    this.http.post(`${environment.apiUrl}/communication/messages/reply`, payload)
      .subscribe({
        next: () => {
          this.newMessage = '';
          this.loadMessages();
        }
      });
  }
}
