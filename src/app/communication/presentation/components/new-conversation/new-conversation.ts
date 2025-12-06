import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'new-conversation-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './new-conversation.html',
  styleUrls: ['./new-conversation.css']
})
export class NewConversationModal {

  @Input() municipalities: string[] = [];

  @Output() send = new EventEmitter<{ municipality: string; message: string }>();
  @Output() close = new EventEmitter<void>();

  selectedMunicipality: string = '';
  message: string = '';

  submitForm() {
    if (!this.selectedMunicipality || !this.message.trim()) return;

    this.send.emit({
      municipality: this.selectedMunicipality,
      message: this.message
    });
  }
}
