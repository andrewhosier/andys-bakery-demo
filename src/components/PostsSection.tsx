import React, { useState } from "react";
import type { Post } from "../types/location";

interface PostsSectionProps {
  posts: Post[];
}

const PUBLISHER_LABELS: Record<string, string> = {
  FIRSTPARTY: "First Party",
  GOOGLEMYBUSINESS: "Google",
  FACEBOOK: "Facebook",
  INSTAGRAM: "Instagram",
};

const PUBLISHER_COLORS: Record<string, string> = {
  FIRSTPARTY: "bg-orange-50 text-orange-700 border-orange-200",
  GOOGLEMYBUSINESS: "bg-blue-50 text-blue-700 border-blue-200",
  FACEBOOK: "bg-indigo-50 text-indigo-700 border-indigo-200",
  INSTAGRAM: "bg-pink-50 text-pink-700 border-pink-200",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function PostsSection({ posts }: PostsSectionProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!posts.length) return null;

  return (
    <section id="posts" className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-5 flex items-center gap-2">
        <span className="material-icons text-brand-orange">article</span>
        Latest Updates
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => {
          const isLong = post.text.length > 180;
          const isExpanded = expanded === post.postId;
          const label = PUBLISHER_LABELS[post.publisher] ?? post.publisher;
          const colorClass = PUBLISHER_COLORS[post.publisher] ?? "bg-gray-50 text-gray-700 border-gray-200";

          return (
            <article
              key={post.postId}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-3 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${colorClass}`}>
                  {label}
                </span>
                <span className="text-xs text-gray-400">{formatDate(post.createDate)}</span>
              </div>
              <p className={`text-sm text-gray-700 leading-relaxed ${!isExpanded && isLong ? "line-clamp-4" : ""}`}>
                {post.text}
              </p>
              {isLong && (
                <button
                  onClick={() => setExpanded(isExpanded ? null : post.postId)}
                  className="text-xs text-blue-600 hover:underline self-start"
                >
                  {isExpanded ? "Show less" : "Read more"}
                </button>
              )}
              {post.metrics && (
                <div className="flex gap-4 text-xs text-gray-400 border-t border-gray-100 pt-2 mt-auto">
                  {post.metrics.impressions != null && (
                    <span className="flex items-center gap-1">
                      <span className="material-icons text-xs">visibility</span>
                      {post.metrics.impressions.toLocaleString()}
                    </span>
                  )}
                  {post.metrics.clicks != null && (
                    <span className="flex items-center gap-1">
                      <span className="material-icons text-xs">touch_app</span>
                      {post.metrics.clicks}
                    </span>
                  )}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
