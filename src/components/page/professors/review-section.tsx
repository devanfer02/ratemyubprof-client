"use client";

import { useEffect } from "react";
import ReviewCard from "@/components/shared/card/review-card";
import { Loader2 } from "lucide-react";
import { useReviewStore } from "@/store/use-review";
import { useSession } from "next-auth/react";

type ReviewSectionProps = {
  professorId: string;
};

export default function ReviewSection({ professorId }: ReviewSectionProps) {
  const {
    reviews,
    meta,
    current,
    loading,
    error,
    fetchReviews,
    setCurrent
  } = useReviewStore();

  const { status } = useSession()

  useEffect(() => {
    fetchReviews(professorId, current);
  }, [current]);

  if (loading) return <Loader2 className="animate-spin mx-auto text-ub-primary mt-10 w-20 min-h-[100px]" />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} status={status}/>
      ))}

      <div className="flex justify-between items-center mt-4">
        <button
          disabled={meta.current === 1}
          onClick={() => setCurrent(current - 1)}
          className="px-4 py-2 bg-ub-primary text-white rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {meta.current} of {meta.totalPages}
        </span>
        <button
          disabled={meta.current === meta.totalPages}
          onClick={() => setCurrent(current + 1)}
          className="px-4 py-2 bg-ub-primary text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
