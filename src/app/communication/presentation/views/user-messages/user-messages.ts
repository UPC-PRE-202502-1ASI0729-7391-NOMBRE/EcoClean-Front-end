import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunicationApi } from '../../../infrastructure/communication-api';
import { Message } from '../../../domain/model/message.entity';
import { NewConversationModal } from '../../components/new-conversation/new-conversation';
import { Router } from '@angular/router';

interface ConversationPreview {
  municipalityCode: string;
  municipalityName: string;
  district: string;
  avatarUrl: string;
  lastMessage: string;
  lastMessageDate: string;
}

@Component({
  selector: 'app-user-messages',
  standalone: true,
  imports: [CommonModule, NewConversationModal],
  templateUrl: './user-messages.html',
  styleUrls: ['./user-messages.css']
})
export class UserMessagesView implements OnInit {

  loading = true;
  conversations: ConversationPreview[] = [];
  showModal = false;

  municipalitiesConfig = [
    {
      code: 'San Borja',
      municipalityName: 'Municipalidad de San Borja',
      district: 'San Borja',
      avatarUrl: 'https://i.pravatar.cc/150?img=47'
    },
    {
      code: 'Surco',
      municipalityName: 'Municipalidad de Surco',
      district: 'Surco',
      avatarUrl: 'https://i.pravatar.cc/150?img=42'
    },
    {
      code: 'San Miguel',
      municipalityName: 'Municipalidad de San Miguel',
      district: 'San Miguel',
      avatarUrl: 'https://i.pravatar.cc/150?img=12'
    },
    {
      code: 'Lima',
      municipalityName: 'Municipalidad de Lima',
      district: 'Lima',
      avatarUrl: 'https://i.pravatar.cc/150?img=5'
    }
  ];

  constructor(
    private communicationApi: CommunicationApi,
    private router: Router   // ← AGREGADO
  ) {}

  ngOnInit(): void {
    this.loadConversations();
  }

  private loadConversations() {
    this.conversations = [];
    this.loading = true;

    let pending = this.municipalitiesConfig.length;

    this.municipalitiesConfig.forEach(config => {
      this.communicationApi.getMessagesByMunicipality(config.code).subscribe({
        next: (messages: Message[]) => {
          if (messages.length > 0) {
            const last = messages[messages.length - 1];

            this.conversations.push({
              municipalityCode: config.code,
              municipalityName: config.municipalityName,
              district: config.district,
              avatarUrl: config.avatarUrl,
              lastMessage: last.content,
              lastMessageDate: last.createdAt ?? ''
            });
          }
        },
        complete: () => {
          if (--pending === 0) this.loading = false;
        }
      });
    });
  }

  startConversation() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  handleSendConversation(event: { municipality: string; message: string }) {
    this.communicationApi.sendMessage(event.municipality, event.message).subscribe({
      next: () => {
        this.showModal = false;
        this.loadConversations();
      }
    });
  }
  openChat(c: ConversationPreview) {
    this.router.navigate(['/user/chat', c.municipalityCode]);
  }

}
