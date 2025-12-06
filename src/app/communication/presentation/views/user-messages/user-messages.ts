import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CommunicationApi } from '../../../infrastructure/communication-api';
import { Message } from '../../../domain/model/message.entity';
import { NewConversationModal } from '../../components/new-conversation/new-conversation';
import { DistrictsApi } from '../../../../shared/infrastructure/districts-api';

interface ConversationPreview {
  municipalityCode: string;
  municipalityName: string;
  district: string;
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
  districtsList: string[] = [];

  currentUserId!: number;

  constructor(
    private communicationApi: CommunicationApi,
    private districtsApi: DistrictsApi,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 1. Obtener ID del usuario actual
    this.currentUserId = Number(localStorage.getItem('userId')) || 0;
    this.loadDistrictsAndConversations();
  }

  private loadDistrictsAndConversations() {
    this.loading = true;

    this.districtsApi.getAllDistricts().subscribe({
      next: (districts) => {
        this.districtsList = districts;
        this.checkConversations(districts);
      },
      error: () => {
        this.loading = false;
        console.error("Error cargando distritos");
      }
    });
  }

  private checkConversations(districts: string[]) {
    this.conversations = [];
    let pending = districts.length;

    if (pending === 0) {
      this.loading = false;
      return;
    }

    districts.forEach(district => {
      this.communicationApi.getMessagesByMunicipality(district).subscribe({
        next: (messages: Message[]) => {

          const myMessages = messages.filter(m => m.senderId === this.currentUserId && !m.isOfficial);

          if (myMessages.length > 0) {
            const last = myMessages[myMessages.length - 1];

            this.conversations.push({
              municipalityCode: district,
              municipalityName: `Municipalidad de ${district}`,
              district: district,
              lastMessage: last.content,
              lastMessageDate: last.createdAt ?? ''
            });
          }
        },
        complete: () => {
          pending--;
          if (pending === 0) {
            this.loading = false;
            // Ordenar por fecha
            this.conversations.sort((a, b) =>
              new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime()
            );
          }
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
        this.loadDistrictsAndConversations();
      }
    });
  }

  openChat(c: ConversationPreview) {
    this.router.navigate(['/user/chat', c.municipalityCode]);
  }
}
