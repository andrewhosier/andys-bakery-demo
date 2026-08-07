import React from "react";
import type { LocationProfile } from "../types/location";

interface HeaderProps {
  profile: LocationProfile;
  avgRating?: number;
  reviewCount?: number;
}

export default function Header({ profile, avgRating = 4.5, reviewCount = 4 }: HeaderProps) {
  const { name, address, priceRange } = profile;
  const priceDisplay = priceRange === "ONE" ? "$" : priceRange === "TWO" ? "$$" : priceRange === "THREE" ? "$$$" : "$$";

  return (
    <header className="hero-gradient text-white">
      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Logo / avatar */}
        <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center mb-4 text-3xl">
          🥐
        </div>

        <h1 className="text-3xl font-bold mb-1">{name}</h1>
        <p className="text-white/90 text-sm mb-3">
          {address.line1}, {address.city}, {address.region} {address.postalCode}
        </p>

        <div className="flex flex-wrap gap-2 items-center text-sm mb-5">
          <span className="bg-white/20 px-3 py-1 rounded-full">
            ⭐ {avgRating.toFixed(1)} · {reviewCount} reviews
          </span>
          <span className="bg-white/20 px-3 py-1 rounded-full">Bakery · {priceDisplay}</span>
          <span className="bg-white/20 px-3 py-1 rounded-full text-green-200 font-medium">Open now</span>
        </div>

        {/* Action row */}
        <div className="flex flex-wrap gap-3">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name} ${address.city} ${address.region}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-white text-brand-orange font-semibold px-4 py-2 rounded-full text-sm shadow hover:shadow-md transition-shadow"
          >
            <span className="material-icons text-base">directions</span>
            Directions
          </a>
          {profile.mainPhone && (
            <a
              href={`tel:${profile.mainPhone}`}
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm transition-colors"
            >
              <span className="material-icons text-base">call</span>
              Call
            </a>
          )}
          {profile.websiteUrl?.url && (
            <a
              href={profile.websiteUrl.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm transition-colors"
            >
              <span className="material-icons text-base">language</span>
              Website
            </a>
          )}
          {profile.firstPartyReviewPage && (
            <a
              href={profile.firstPartyReviewPage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full text-sm transition-colors"
            >
              <span className="material-icons text-base">rate_review</span>
              Write a Review
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
