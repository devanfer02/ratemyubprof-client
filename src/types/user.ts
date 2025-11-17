type User = {
  id: string;
  nim: string;
  username: string;
  createdAt: string;
}

type UserProfile = {
  user: User 
  reviewsCount: number 
  recentReviews: Review[]
}