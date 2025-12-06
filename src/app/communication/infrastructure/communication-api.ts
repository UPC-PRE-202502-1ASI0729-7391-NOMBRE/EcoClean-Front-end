import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Message } from '../domain/model/message.entity';

@Injectable({ providedIn: 'root' })
export class CommunicationApi {

  private baseUrl = `${environment.apiUrl}/communication/messages`;

  constructor(private http: HttpClient) {}

  /** GET: obtener mensajes para una municipalidad */
  getMessagesByMunicipality(municipality: string): Observable<Message[]> {
    return this.http.get<Message[]>(`${this.baseUrl}/${municipality}`);
  }

  /** POST: enviar mensaje del usuario a la municipalidad */
  sendMessage(targetMunicipality: string, content: string): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/send`, {
      content,
      targetMunicipality
    });
  }

  /** POST: empleado responde mensaje */
  replyMessage(content: string): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}/reply`, {
      content
    });
  }
}
