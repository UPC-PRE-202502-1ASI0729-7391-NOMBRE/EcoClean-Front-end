import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommunicationApi } from '../../../infrastructure/communication-api';
import { Message } from '../../../domain/model/message.entity';

@Component({
  selector: 'app-user-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-chat.html',
  styleUrls: ['./user-chat.css']
})
export class UserChatView implements OnInit {

  municipalityCode = '';
  messages: Message[] = [];
  newMessage = '';

  constructor(
    private route: ActivatedRoute,
    private communicationApi: CommunicationApi
  ) {}

  ngOnInit(): void {
    this.municipalityCode = this.route.snapshot.paramMap.get('municipality') ?? '';
    this.loadMessages();
  }

  loadMessages() {
    this.communicationApi.getMessagesByMunicipality(this.municipalityCode).subscribe({
      next: (msgs) => {
        this.messages = msgs;
      }
    });
  }

  sendMessage() {
    if (!this.newMessage.trim()) return;

    this.communicationApi.sendMessage(this.municipalityCode, this.newMessage).subscribe({
      next: () => {
        this.newMessage = '';
        this.loadMessages();
      }
    });
  }

  getInitial(): string {
    return this.municipalityCode.charAt(0).toUpperCase();
  }
}
