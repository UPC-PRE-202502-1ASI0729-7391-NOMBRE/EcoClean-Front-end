import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { Message } from '../../../domain/model/message.entity';

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
  messages: Message[] = [];
  newMessage = '';
  userEmail = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));

    this.route.queryParams.subscribe(params => {
      this.municipality = params['municipality'] || localStorage.getItem('municipality') || '';
      this.loadMessages();
    });
  }

  loadMessages() {
    if (!this.municipality) return;

    this.http.get<Message[]>(`${environment.apiUrl}/communication/messages/${this.municipality}`)
      .subscribe({
        next: (msgs) => {
          this.messages = msgs.filter(m =>
            (m.senderId === this.userId && !m.isOfficial) ||
            (m.isOfficial)
          );

          const userMsg = this.messages.find(m => !m.isOfficial);
          if (userMsg) this.userEmail = userMsg.senderEmail;
        }
      });
  }

  sendReply() {
    if (!this.newMessage.trim()) return;

    const payload = {
      content: this.newMessage,
      targetMunicipality: this.municipality
    };

    this.http.post(`${environment.apiUrl}/communication/messages/reply`, payload)
      .subscribe({
        next: () => {
          this.newMessage = '';
          this.loadMessages();
        },
        error: (err) => console.error("Error enviando", err)
      });
  }

  getInitial(): string {
    return this.userEmail ? this.userEmail.charAt(0).toUpperCase() : 'U';
  }
}
