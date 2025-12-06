export interface Message {
  id: number;
  content: string;
  sender: string;
  senderId: number;
  senderEmail: string;
  isOfficial: boolean;
  createdAt: string;
}
