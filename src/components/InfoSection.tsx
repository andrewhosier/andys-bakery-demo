import React from "react";
import HoursTable from "./HoursTable";
import type { LocationProfile } from "../types/location";

interface InfoSectionProps {
  profile: LocationProfile;
}

function formatPhone(phone: string) {
  const digits = phone.replace(/\D/g, "").slice(-10);
  return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
}

export default function InfoSection({ profile }: InfoSectionProps) {
  const {
    description,
    hours,
    mainPhone,
    address,
    websiteUrl,
    paymentOptions,
    yearEstablished,
  } = profile;

  return (
    <section className="max-w-4xl mx-auto px-4 py-8 border-t border-gray-100">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">
          {description && (
            <div>
              <h2 className="section-label mb-2">About</h2>
              <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
            </div>
          )}

          <div>
            <h2 className="section-label mb-2">Contact</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2.5 text-gray-700">
                <span className="material-icons text-base text-gray-400 mt-0.5">location_on</span>
                <span>
                  {address.line1}<br />
                  {address.city}, {address.region} {address.postalCode}
                </span>
              </div>
              {mainPhone && (
                <a href={`tel:${mainPhone}`} className="flex items-center gap-2.5 text-blue-600 hover:underline">
                  <span className="material-icons text-base text-gray-400">phone</span>
                  {formatPhone(mainPhone)}
                </a>
              )}
              {websiteUrl?.url && (
                <a
                  href={websiteUrl.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-blue-600 hover:underline break-all"
                >
                  <span className="material-icons text-base text-gray-400">language</span>
                  {websiteUrl.url.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>
          </div>

          {/* Details */}
          <div>
            <h2 className="section-label mb-2">Details</h2>
            <div className="space-y-1.5 text-sm text-gray-700">
              {yearEstablished && (
                <div className="flex items-center gap-2">
                  <span className="material-icons text-base text-gray-400">cake</span>
                  Established {yearEstablished}
                </div>
              )}
              {paymentOptions && paymentOptions.length > 0 && (
                <div className="flex items-start gap-2">
                  <span className="material-icons text-base text-gray-400">payment</span>
                  <span>{paymentOptions.map(p => p.replace(/_/g," ")).join(", ")}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right column: Hours */}
        {hours && (
          <div>
            <h2 className="section-label mb-2">Hours</h2>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="px-3 py-2">
                <HoursTable hours={hours} />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
              <span className="material-icons text-xs">info</span>
              Hours may vary on holidays
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
