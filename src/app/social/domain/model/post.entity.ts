export interface Post {
  id: number;
  content: string;
  imageUrl: string | null;
  district: string;
  likes: number;
  official: boolean;
  authorName: string;
  authorId: number;
  createdAt: string;
}
