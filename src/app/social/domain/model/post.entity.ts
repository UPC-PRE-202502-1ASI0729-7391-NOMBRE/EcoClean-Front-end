export interface Post {
  id: number;
  content: string;
  imageUrl: string | null;
  district: string;
  likes: number;
  official: boolean;
  authorName: string;
  createdAt: string; // ISO date
}
