"use client"

import { Button } from "@/components/ui/button";
import { createReaction, deleteReaction } from "@/services/review";
import { formatDate } from "@/utils/date";
import { Share2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type ReviewCardProps = {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const [like, setLike] = useState(review.like);
  const [dislike, setDislike] = useState(review.dislike);
  const [reacted, setReacted] = useState(review.isLiked);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href + "/reviews/" + review.id)
      .then(() => {
        toast("Link copied to clipboard! ✅ ")
      })
      .catch((error) => {
        alert('Failed to copy link: ' + error);
      });
  };

  const handleReaction = async (reactionType: string) => {
    const isLike = reactionType === "like";
    const newReaction = isLike ? 1 : 2;
  
    if (reacted === newReaction) {
      await deleteReaction(review.id);
      setReacted(0);
      isLike ? setLike((prev) => prev - 1) : setDislike((prev) => prev - 1);
      return;
    }
  
    if (reacted === 1) setLike((prev) => prev - 1);
    if (reacted === 2) setDislike((prev) => prev - 1);
  
    isLike ? setLike((prev) => prev + 1) : setDislike((prev) => prev + 1);
    await createReaction(review.id, reactionType);
    setReacted(newReaction);
  };
  
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
        <Button
          className={`bg-transparent  hover:bg-ub-secondary font-bold ` + (reacted == 1 ? "bg-ub-primary text-ub-secondary" : "text-ub-primary ")}
          onClick={() => handleReaction("like")}
        >
          👍 {like}
        </Button>
        <Button
          className={`bg-transparent  hover:bg-ub-secondary font-bold ` + (reacted == 2 ? "bg-ub-primary text-ub-secondary" : "text-ub-primary ")}
          onClick={() => handleReaction("dislike")}
        >
          👎 {dislike}
        </Button>
        <Button
          className="bg-transparent text-ub-primary hover:bg-ub-secondary p-2"
          size="icon"
          onClick={copyToClipboard}
        >
          <Share2 size={16} />
        </Button>
      </div>
    </div>
  );
}