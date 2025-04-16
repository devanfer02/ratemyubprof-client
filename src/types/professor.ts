type FetchProfParam = {
  name: string;
  faculty: string;
  major: string;
  page: string
}

type Professor = {
  id: string
  name: string
  faculty: string
  major: string
  profileImgLink: string
  reviewsCount: number 
  avgDiffRate: number
  avgFriendlyRate: number
  createdAt: string
  updatedAt: string
}

type PaginationMeta = {
  totalItems: number
  totalPages: number 
  current: number
  next: number 
  prev: number
}