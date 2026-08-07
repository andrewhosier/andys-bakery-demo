/**
 * Andy's Bakery — Location Page
 * Pure React + Vite. Data is fetched from the Yext Management API at runtime,
 * with static fallbacks so the page always renders.
 *
 * Dev:     npm run dev   → http://localhost:5173
 * Build:   npm run build → dist/
 */

import React, { useEffect, useState } from "react";

import Header from "../components/Header";
import InfoSection from "../components/InfoSection";
import PostsSection from "../components/PostsSection";
import ReviewsSection from "../components/ReviewsSection";
import type { LocationProfile, Post, Review } from "../types/location";

// ── Static entity data (from Knowledge Graph) ───────────────────────────────
const ENTITY: LocationProfile = {
  id: "AndyBK",
  name: "Andy's Bakery",
  address: {
    line1: "168 Main St",
    city: "Kingston",
    region: "NY",
    postalCode: "12401",
    countryCode: "US",
  },
  mainPhone: "+18455551234",
  description:
    "Andy's Bakery has been Kingston's favorite neighborhood bakery since 1987. We bake everything fresh daily — from sourdough loaves and croissants to custom cakes and seasonal pastries. Stop by and say hello!",
  hours: {
    monday:    { openIntervals: [{ start: "07:00", end: "17:00" }] },
    tuesday:   { openIntervals: [{ start: "07:00", end: "17:00" }] },
    wednesday: { openIntervals: [{ start: "07:00", end: "17:00" }] },
    thursday:  { openIntervals: [{ start: "07:00", end: "17:00" }] },
    friday:    { openIntervals: [{ start: "07:00", end: "18:00" }] },
    saturday:  { openIntervals: [{ start: "08:00", end: "16:00" }] },
    sunday:    { openIntervals: [{ start: "09:00", end: "14:00" }] },
  },
  websiteUrl: { url: "https://andysbakery.com" },
  priceRange: "TWO",
  yearEstablished: 1987,
  paymentOptions: ["VISA", "MASTERCARD", "AMERICAN_EXPRESS", "CASH"],
  firstPartyReviewPage: "https://www.yext.com/plp/andysbakery/review",
};

// ── Fallback posts ───────────────────────────────────────────────────────────
const FALLBACK_POSTS: Post[] = [
  {
    postId: "fp-1",
    publisher: "FIRSTPARTY",
    entityId: "AndyBK",
    text: "Fresh croissants and sourdough are out of the oven! Stop by before we sell out. We're open 7 AM – 5 PM, seven days a week.",
    status: "POST_SUCCEEDED",
    createDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    metrics: { impressions: 412, clicks: 38 },
  },
  {
    postId: "fp-2",
    publisher: "FIRSTPARTY",
    entityId: "AndyBK",
    text: "Celebrating our anniversary this week! Enjoy 10% off all specialty cakes and pastries. Thank you Kingston for all your support over the years.",
    status: "POST_SUCCEEDED",
    createDate: new Date(Date.now() - 7 * 86400000).toISOString(),
    metrics: { impressions: 876, clicks: 104 },
  },
  {
    postId: "fp-3",
    publisher: "GOOGLEMYBUSINESS",
    entityId: "AndyBK",
    text: "Weekend special: buy any two loaves of sourdough and get a free pastry of your choice. Saturday and Sunday only while supplies last!",
    status: "POST_SUCCEEDED",
    createDate: new Date(Date.now() - 10 * 86400000).toISOString(),
    metrics: { impressions: 634, clicks: 71 },
  },
];

// ── Fallback reviews ─────────────────────────────────────────────────────────
const FALLBACK_REVIEWS: Review[] = [
  {
    reviewId: "1693326995",
    publisher: "FIRSTPARTY",
    rating: 5,
    authorName: "Peter G",
    reviewDate: new Date(Date.now() - 3 * 86400000).toISOString(),
    content: "Love this shop!!!!",
    reviewResponse:
      "Thank you so much, Peter! We're thrilled to hear you love our shop. Your support means the world to us here at Andy's Bakery.",
    status: "LIVE",
  },
  {
    reviewId: "1693326708",
    publisher: "FIRSTPARTY",
    rating: 1,
    authorName: "Petunia D",
    reviewDate: new Date(Date.now() - 5 * 86400000).toISOString(),
    content: "Service wasn't the best; the wizard dropped a cake on my head.",
    reviewResponse: null,
    status: "LIVE",
  },
  {
    reviewId: "1693326339",
    publisher: "FIRSTPARTY",
    rating: 3,
    authorName: "Kate S",
    reviewDate: new Date(Date.now() - 8 * 86400000).toISOString(),
    content: "Was ok, but I'd like more bread options",
    reviewResponse:
      "Hi Kate, thank you for the feedback! We're always looking to improve and will definitely consider adding more bread options.",
    status: "LIVE",
  },
  {
    reviewId: "1693326117",
    publisher: "FIRSTPARTY",
    rating: 5,
    authorName: "John N",
    reviewDate: new Date(Date.now() - 12 * 86400000).toISOString(),
    content: "Amazing Bakery, great buns!",
    reviewResponse: "Thank you, John! We're thrilled to hear you enjoyed our buns!",
    status: "LIVE",
  },
];

// ── Main component ───────────────────────────────────────────────────────────
export default function LocationPage() {
  const [posts, setPosts] = useState<Post[]>(FALLBACK_POSTS);
  const [reviews, setReviews] = useState<Review[]>(FALLBACK_REVIEWS);

  // Try to fetch live data — silently fall back if the API is unreachable
  useEffect(() => {
    const accountId = import.meta.env.VITE_YEXT_ACCOUNT_ID ?? "4945323";
    const apiKey = import.meta.env.VITE_YEXT_API_KEY ?? "";
    const apiVersion = import.meta.env.VITE_YEXT_API_VERSION ?? "20250514";
    const entityId = ENTITY.id;

    if (!apiKey) return; // skip if no key configured

    const base = `https://api.yextapis.com/v2/accounts/${accountId}`;
    const qs = `api_key=${apiKey}&v=${apiVersion}`;

    Promise.all([
      fetch(`${base}/posts?entityIds=${entityId}&${qs}&limit=6`).then((r) => r.json()),
      fetch(`${base}/reviews?entityIds=${entityId}&${qs}&limit=10`).then((r) => r.json()),
    ])
      .then(([postsData, reviewsData]) => {
        if (postsData.response?.posts?.length) setPosts(postsData.response.posts);
        if (reviewsData.response?.reviews?.length) setReviews(reviewsData.response.reviews);
      })
      .catch(() => {/* use fallbacks */});
  }, []);

  const avgRating =
    reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 4.5;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Header profile={ENTITY} avgRating={avgRating} reviewCount={reviews.length} />
      <main className="pb-16">
        <InfoSection profile={ENTITY} />
        <PostsSection posts={posts} />
        <ReviewsSection reviews={reviews} reviewPageUrl={ENTITY.firstPartyReviewPage} />
      </main>
      <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-400">
        <p>© {new Date().getFullYear()} {ENTITY.name} · Powered by Yext Pages</p>
      </footer>
    </div>
  );
}
