import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SocialStore } from '../../../application/social.store';
import { DistrictsApi } from '../../../../shared/infrastructure/districts-api';
import { Post } from '../../../domain/model/post.entity';

@Component({
  selector: 'app-trending-district',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './trending-district.html',
  styleUrl: './trending-district.css'
})
export class TrendingDistrictComponent implements OnInit {
  posts: Post[] = [];
  districts: string[] = [];
  selectedDistrict = 'Todos los distritos';
  reactionFilter: 'Todas' | 'Más populares' = 'Todas';

  newPostContent = '';
  newPostImageUrl = '';
  newPostDistrict = '';

  showNewPostForm = false;
  loading = false;

  currentUserId = 0;

  constructor(
    private socialStore: SocialStore,
    private districtsApi: DistrictsApi
  ) {}

  ngOnInit(): void {
    // 1. Obtener ID del usuario logueado
    this.currentUserId = Number(localStorage.getItem('userId')) || 0;

    this.socialStore.posts$.subscribe(posts => (this.posts = posts));
    this.socialStore.loading$.subscribe(loading => (this.loading = loading));

    this.socialStore.loadPosts();
    this.loadDistricts();
  }

  loadDistricts() {
    this.districtsApi.getAllDistricts().subscribe({
      next: (list: string[]) => {
        this.districts = list;
      },
      error: (err) => console.error('Error cargando distritos', err)
    });
  }

  onDistrictChange() {
    this.socialStore.setDistrict(this.selectedDistrict);
  }

  onReactionFilterChange() {
    const popular = this.reactionFilter === 'Más populares';
    this.socialStore.setPopularFilter(popular);
  }

  toggleNewPostForm() {
    this.showNewPostForm = !this.showNewPostForm;
  }

  createPost() {
    if (!this.newPostContent || !this.newPostDistrict) return;

    const command = {
      content: this.newPostContent,
      district: this.newPostDistrict,
      imageUrl: this.newPostImageUrl || null,
      authorId: this.currentUserId
    };

    this.socialStore.createPost(command);

    this.newPostContent = '';
    this.newPostDistrict = '';
    this.newPostImageUrl = '';
    this.showNewPostForm = false;
  }

  like(post: Post) {
    this.socialStore.likePost(post.id);
  }

  delete(post: Post) {
    if (confirm('¿Seguro que deseas eliminar esta publicación?')) {
      this.socialStore.deletePost(post.id);
    }
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-PE');
  }
}
