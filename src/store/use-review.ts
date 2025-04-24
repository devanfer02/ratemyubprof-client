import { create } from "zustand";
import { fetchReviewByProfessorId } from "@/services/review";

interface ReviewState {
  reviews: Review[];
  meta: PaginationMeta;
  current: number;
  loading: boolean;
  error: string | null;
  fetchReviews: (professorId: string, page?: number, reviewId?: string) => Promise<void>;
  setCurrent: (page: number) => void;
}

export const useReviewStore = create<ReviewState>((set) => ({
  reviews: [],
  meta: {} as PaginationMeta,
  current: 1,
  loading: true,
  error: null,

  fetchReviews: async (professorId, page = 1, reviewId = "") => {
    set({ loading: true, error: null });
    try {
      const [res, meta, error] = await fetchReviewByProfessorId(professorId, String(page), reviewId);
      if (error) {
        set({ error: "Failed to fetch reviews." });
        return;
      }
      set({ reviews: res!, meta: meta! });
    } catch (err) {
      set({ error: "Something went wrong." });
    } finally {
      set({ loading: false });
    }
  },

  setCurrent: (page) => set({ current: page }),
}));
