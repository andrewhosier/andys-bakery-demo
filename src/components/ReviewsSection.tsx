import React, { useState } from "react";
import StarRating from "./StarRating";
import type { Review } from "../types/location";

interface ReviewsSectionProps {
  reviews: Review[];
  reviewPageUrl?: string;
}

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months !== 1 ? "s" : ""} ago`;
  return `${Math.floor(months / 12)} year${Math.floor(months / 12) !== 1 ? "s" : ""} ago`;
}

function ratingCounts(reviews: Review[]) {
  const counts = [0, 0, 0, 0, 0];
  reviews.forEach((r) => { if (r.rating >= 1 && r.rating <= 5) counts[r.rating - 1]++; });
  return counts.reverse(); // 5→1
}

function avgRating(reviews: Review[]) {
  if (!reviews.length) return 0;
  return reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
}

export default function ReviewsSection({ reviews, reviewPageUrl }: ReviewsSectionProps) {
  const [filter, setFilter] = useState<number | null>(null);
  const filtered = filter ? reviews.filter((r) => r.rating === filter) : reviews;
  const avg = avgRating(reviews);
  const counts = ratingCounts(reviews);

  return (
    <section id="reviews" className="max-w-4xl mx-auto px-4 py-8 border-t border-gray-100">
      <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
        <span className="material-icons text-yellow-500">star_rate</span>
        Reviews
      </h2>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-5 mb-6 flex flex-wrap gap-6 items-center">
        <div className="text-center">
          <div className="text-5xl font-bold text-gray-900">{avg.toFixed(1)}</div>
          <StarRating rating={avg} size="sm" />
          <div className="text-xs text-gray-500 mt-1">{reviews.length} reviews</div>
        </div>
        <div className="flex-1 min-w-[180px]">
          {counts.map((count, i) => {
            const star = 5 - i;
            const pct = reviews.length ? Math.round((count / reviews.length) * 100) : 0;
            return (
              <button
                key={star}
                onClick={() => setFilter(filter === star ? null : star)}
                className={`flex items-center gap-2 w-full mb-1 group ${filter === star ? "font-semibold" : ""}`}
              >
                <span className="text-xs w-4 text-right text-gray-600">{star}</span>
                <span className="material-icons text-xs text-yellow-400">star</span>
                <div className="flex-1 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-yellow-400 h-full rounded-full transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500 w-6">{count}</span>
              </button>
            );
          })}
        </div>
        {reviewPageUrl && (
          <a
            href={reviewPageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-brand-orange text-white px-4 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <span className="material-icons text-base">rate_review</span>
            Write a Review
          </a>
        )}
      </div>

      {/* Review list */}
      <div className="space-y-4">
        {filtered.map((review) => (
          <div key={review.reviewId} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 rounded-full bg-brand-orange text-white flex items-center justify-center font-semibold text-sm">
                {review.authorName.charAt(0)}
              </div>
              <div>
                <div className="font-medium text-sm text-gray-900">{review.authorName}</div>
                <div className="text-xs text-gray-400">{timeAgo(review.reviewDate)}</div>
              </div>
              <div className="ml-auto">
                <StarRating rating={review.rating} size="sm" />
              </div>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{review.content}</p>
            {review.reviewResponse && (
              <div className="mt-3 bg-orange-50 border border-orange-100 rounded-lg p-3">
                <div className="text-xs font-semibold text-orange-700 mb-1 flex items-center gap-1">
                  <span className="material-icons text-xs">storefront</span>
                  Response from Andy's Bakery
                </div>
                <p className="text-xs text-gray-700 leading-relaxed">{review.reviewResponse}</p>
              </div>
            )}
          </div>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-8">No {filter}-star reviews yet.</p>
        )}
      </div>
    </section>
  );
}
