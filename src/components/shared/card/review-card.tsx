import { formatDate } from "@/utils/date";

type ReviewCardProps = {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-md p-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-sm text-zinc-500">
          By <span className="font-medium text-zinc-700 dark:text-zinc-200">{review.user.username}</span>
          <br />
        </div>
        <div className="text-xs text-zinc-400">{formatDate(review.createdAt)}
        </div>
      </div>

      <p className="text-base text-zinc-800 dark:text-zinc-100">{review.comment}</p>

      <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-300">
        <span>Difficulty: <strong>{review.difficultyRating.toFixed(1)}</strong>/5</span>
        <span>Friendly: <strong>{review.friendlyRating.toFixed(1)}</strong>/5</span>
      </div>

      <div className="flex gap-4 text-sm text-zinc-500 dark:text-zinc-400">
        <span>👍 {review.like}</span>
        <span>👎 {review.dislike}</span>
      </div>
    </div>
  );
}