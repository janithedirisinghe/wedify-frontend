"use client";

import Image from "next/image";
import { Calendar, MapPin, Clock, Trees } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";

interface RusticLayoutProps {
  wedding: {
    brideName: string;
    groomName: string;
    date: string;
    time: string;
    venue: string;
    venueAddress?: string;
    message?: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  galleryImages?: string[];
}

export default function RusticLayout({ wedding, colors, galleryImages }: RusticLayoutProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Wood texture effect */}
      <div 
        className="rounded-lg p-8 md:p-12"
        style={{
          backgroundColor: colors.accent,
          backgroundImage: `linear-gradient(90deg, ${colors.accent} 0%, transparent 100%)`,
        }}
      >
        {/* Header with nature elements */}
        <div className="text-center mb-8">
          <div className="flex justify-center gap-3 mb-4">
            <Trees className="w-6 h-6" style={{ color: colors.secondary }} />
            <Trees className="w-8 h-8" style={{ color: colors.primary }} />
            <Trees className="w-6 h-6" style={{ color: colors.secondary }} />
          </div>
          <p className="text-sm uppercase tracking-widest mb-6" style={{ color: colors.secondary }}>
            Join us in celebrating
          </p>
        </div>

        {/* Names with rustic style */}
        <div className="text-center mb-8">
          <div className="inline-block px-8 py-6 bg-white/80 rounded-lg shadow-lg">
            <h1 className="text-5xl md:text-6xl font-serif mb-2" style={{ color: colors.primary }}>
              {wedding.brideName}
            </h1>
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="w-12 h-1" style={{ backgroundColor: colors.secondary }} />
              <span className="text-2xl" style={{ color: colors.secondary }}>and</span>
              <div className="w-12 h-1" style={{ backgroundColor: colors.secondary }} />
            </div>
            <h1 className="text-5xl md:text-6xl font-serif" style={{ color: colors.primary }}>
              {wedding.groomName}
            </h1>
          </div>
        </div>

        {/* Message */}
        {wedding.message && (
          <div className="text-center mb-8 px-6">
            <div className="bg-white/60 rounded-lg p-6 inline-block">
              <p className="text-gray-800 italic">{wedding.message}</p>
            </div>
          </div>
        )}

        {/* Details in cards */}
        <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="bg-white/80 rounded-lg p-6 text-center shadow-md">
            <Calendar className="w-8 h-8 mx-auto mb-3" style={{ color: colors.primary }} />
            <p className="text-xs uppercase tracking-wide text-gray-600 mb-2">Date</p>
            <p className="font-medium" style={{ color: colors.secondary }}>
              {formatDate(new Date(wedding.date), "short")}
            </p>
          </div>

          <div className="bg-white/80 rounded-lg p-6 text-center shadow-md">
            <Clock className="w-8 h-8 mx-auto mb-3" style={{ color: colors.primary }} />
            <p className="text-xs uppercase tracking-wide text-gray-600 mb-2">Time</p>
            <p className="font-medium" style={{ color: colors.secondary }}>
              {wedding.time}
            </p>
          </div>

          <div className="bg-white/80 rounded-lg p-6 text-center shadow-md">
            <MapPin className="w-8 h-8 mx-auto mb-3" style={{ color: colors.primary }} />
            <p className="text-xs uppercase tracking-wide text-gray-600 mb-2">Venue</p>
            <p className="font-medium text-sm" style={{ color: colors.secondary }}>
              {wedding.venue}
            </p>
          </div>
        </div>

        {/* Footer decoration */}
        <div className="flex justify-center gap-3 mt-8">
          <Trees className="w-6 h-6" style={{ color: colors.secondary }} />
          <Trees className="w-8 h-8" style={{ color: colors.primary }} />
          <Trees className="w-6 h-6" style={{ color: colors.secondary }} />
        </div>
      </div>

      {/* Gallery */}
      {galleryImages && galleryImages.length > 0 && (
        <div className="mt-12 card" style={{ backgroundColor: colors.accent }}>
          <h3 className="text-3xl font-serif mb-6 text-center" style={{ color: colors.secondary }}>
            Our Journey
          </h3>
          <ImageGallery images={galleryImages} columns={2} />
        </div>
      )}
    </div>
  );
}
