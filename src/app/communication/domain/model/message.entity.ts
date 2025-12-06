export interface Message {
  id: number;
  content: string;
  senderId: number;
  targetMunicipality: string;
  isResponse: boolean;
  createdAt?: string; // si en el recurso viene fecha de creación
}
