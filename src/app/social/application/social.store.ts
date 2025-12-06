import { Injectable } from '@angular/core';
import { BehaviorSubject, finalize } from 'rxjs';
import { Post } from '../domain/model/post.entity';
import { SocialApi } from '../infrastructure/social-api';
import { CreatePostCommand } from '../domain/model/create-post.command';

@Injectable({
  providedIn: 'root'
})
export class SocialStore {
  private readonly postsSubject = new BehaviorSubject<Post[]>([]);
  private readonly loadingSubject = new BehaviorSubject<boolean>(false);

  readonly posts$ = this.postsSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();

  private currentDistrict: string | undefined;
  private popular = false;

  constructor(private socialApi: SocialApi) {}

  loadPosts() {
    this.loadingSubject.next(true);
    this.socialApi
      .getPosts(this.currentDistrict, this.popular)
      .pipe(finalize(() => this.loadingSubject.next(false)))
      .subscribe({
        next: posts => this.postsSubject.next(posts),
        error: err => {
          console.error('Error cargando posts', err);
          this.postsSubject.next([]);
        }
      });
  }

  setDistrict(district: string) {
    this.currentDistrict = district === 'Todos los distritos' ? undefined : district;
    this.loadPosts();
  }

  setPopularFilter(popular: boolean) {
    this.popular = popular;
    this.loadPosts();
  }

  createPost(command: CreatePostCommand) {
    this.socialApi.createPost(command).subscribe({
      next: () => this.loadPosts(),
      error: err => console.error('Error creando post', err)
    });
  }

  likePost(postId: number) {
    this.socialApi.likePost(postId).subscribe({
      next: () => {
        const updated = this.postsSubject.getValue().map(p =>
          p.id === postId ? { ...p, likes: p.likes + 1 } : p
        );
        this.postsSubject.next(updated);
      },
      error: err => console.error('Error dando like', err)
    });
  }

  deletePost(postId: number) {
    this.socialApi.deletePost(postId).subscribe({
      next: () => {
        const filtered = this.postsSubject.getValue().filter(p => p.id !== postId);
        this.postsSubject.next(filtered);
      },
      error: err => console.error('Error eliminando post', err)
    });
  }
}
