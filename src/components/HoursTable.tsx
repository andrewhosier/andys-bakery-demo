import React from "react";
import type { Hours } from "../types/location";

interface HoursTableProps {
  hours: Hours;
}

const DAY_KEYS: (keyof Hours)[] = [
  "monday","tuesday","wednesday","thursday","friday","saturday","sunday",
];
const DAY_LABELS = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour = h % 12 || 12;
  return `${hour}:${String(m).padStart(2,"0")} ${ampm}`;
}

function getTodayIndex() {
  return (new Date().getDay() + 6) % 7; // Mon=0 … Sun=6
}

export default function HoursTable({ hours }: HoursTableProps) {
  const today = getTodayIndex();

  return (
    <div className="divide-y divide-gray-100">
      {DAY_KEYS.map((key, i) => {
        const day = hours[key];
        const isToday = i === today;
        const closed = !day || day.isClosed || !day.openIntervals?.length;
        const label = closed
          ? "Closed"
          : day!.openIntervals!.map(iv => `${formatTime(iv.start)} – ${formatTime(iv.end)}`).join(", ");

        return (
          <div
            key={key}
            className={`hours-row flex justify-between py-1.5 px-2 rounded text-sm ${isToday ? "font-semibold" : ""}`}
          >
            <span className={isToday ? "text-blue-600" : "text-gray-700"}>{DAY_LABELS[i]}</span>
            <span className={closed ? "text-gray-400" : isToday ? "text-blue-600" : "text-gray-700"}>
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
