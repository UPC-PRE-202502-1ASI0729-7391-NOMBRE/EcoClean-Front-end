import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Post } from '../domain/model/post.entity';
import { CreatePostCommand } from '../domain/model/create-post.command';

@Injectable({
  providedIn: 'root'
})
export class SocialApi {
  // ✅ Igual lógica: environment.apiUrl YA tiene /api/v1
  private readonly baseUrl = `${environment.apiUrl}/social/posts`;

  constructor(private http: HttpClient) {}

  getPosts(district?: string, popular?: boolean): Observable<Post[]> {
    let params = new HttpParams();
    if (district) params = params.set('district', district);
    if (popular) params = params.set('popular', 'true');
    return this.http.get<Post[]>(this.baseUrl, { params });
  }

  createPost(command: CreatePostCommand): Observable<number> {
    return this.http.post<number>(this.baseUrl, command);
  }

  likePost(postId: number): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/${postId}/like`, {});
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${postId}`);
  }
}
