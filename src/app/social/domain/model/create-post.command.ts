export interface CreatePostCommand {
  content: string;
  district: string;
  imageUrl: string | null;
  authorId: number;
}
