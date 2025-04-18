type Review = {
  id: string;
  profId: string;
  userId: string;
  comment: string;
  difficultyRating: number;
  friendlyRating: number;
  createdAt: string;
  like: number;
  isLiked: number;
  dislike: number;
  user: User
  professor: Professor
}