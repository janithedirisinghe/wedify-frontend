"use client";

import { Calendar, MapPin, Clock, Heart } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";

interface VintageLayoutProps {
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

export default function VintageLayout({ wedding, colors, galleryImages }: VintageLayoutProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Vintage frame */}
      <div 
        className="relative rounded-lg p-1"
        style={{
          background: `linear-gradient(45deg, ${colors.primary}, ${colors.secondary})`,
        }}
      >
        <div className="card bg-gradient-to-br from-amber-50 to-orange-50">
          {/* Ornate corner decorations */}
          <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: colors.primary }} />
          <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 rounded-tr-lg" style={{ borderColor: colors.primary }} />
          <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 rounded-bl-lg" style={{ borderColor: colors.primary }} />
          <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: colors.primary }} />

          {/* Content */}
          <div className="relative z-10 p-12">
            {/* Header decoration */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="w-20 h-px" style={{ backgroundColor: colors.secondary }} />
                <Heart className="w-4 h-4" style={{ color: colors.primary }} />
                <div className="w-20 h-px" style={{ backgroundColor: colors.secondary }} />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] mb-2" style={{ color: colors.secondary }}>
                Together With Their Families
              </p>
            </div>

            {/* Names with vintage typography */}
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-serif italic mb-3" style={{ color: colors.primary }}>
                {wedding.brideName}
              </h1>
              <div className="flex items-center justify-center gap-4 my-6">
                <div className="w-1 h-8" style={{ backgroundColor: colors.secondary }} />
                <span className="text-2xl font-light" style={{ color: colors.secondary }}>and</span>
                <div className="w-1 h-8" style={{ backgroundColor: colors.secondary }} />
              </div>
              <h1 className="text-5xl md:text-6xl font-serif italic" style={{ color: colors.primary }}>
                {wedding.groomName}
              </h1>
            </div>

            {/* Invitation text */}
            <div className="text-center mb-8">
              <p className="text-sm uppercase tracking-widest mb-2" style={{ color: colors.secondary }}>
                Request the honor of your presence
              </p>
              <p className="text-xs uppercase tracking-wider text-gray-600">
                At the celebration of their marriage
              </p>
            </div>

            {/* Message */}
            {wedding.message && (
              <div 
                className="border-y-2 py-6 mb-8"
                style={{ borderColor: colors.accent }}
              >
                <p className="text-center italic text-gray-700">{wedding.message}</p>
              </div>
            )}

            {/* Event details */}
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center gap-3 mb-2">
                  <Calendar className="w-5 h-5" style={{ color: colors.primary }} />
                  <span className="text-xs uppercase tracking-wider" style={{ color: colors.secondary }}>
                    Date
                  </span>
                </div>
                <p className="text-lg font-serif" style={{ color: colors.primary }}>
                  {formatDate(new Date(wedding.date), "full")}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-16 h-px" style={{ backgroundColor: colors.accent }} />
                <Heart className="w-3 h-3" style={{ color: colors.accent }} />
                <div className="w-16 h-px" style={{ backgroundColor: colors.accent }} />
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5" style={{ color: colors.primary }} />
                  <span className="text-xs uppercase tracking-wider" style={{ color: colors.secondary }}>
                    Time
                  </span>
                </div>
                <p className="text-lg font-serif" style={{ color: colors.primary }}>
                  {wedding.time}
                </p>
              </div>

              <div className="flex items-center justify-center gap-2">
                <div className="w-16 h-px" style={{ backgroundColor: colors.accent }} />
                <Heart className="w-3 h-3" style={{ color: colors.accent }} />
                <div className="w-16 h-px" style={{ backgroundColor: colors.accent }} />
              </div>

              <div className="text-center">
                <div className="inline-flex items-center gap-3 mb-2">
                  <MapPin className="w-5 h-5" style={{ color: colors.primary }} />
                  <span className="text-xs uppercase tracking-wider" style={{ color: colors.secondary }}>
                    Location
                  </span>
                </div>
                <p className="text-lg font-serif" style={{ color: colors.primary }}>
                  {wedding.venue}
                </p>
                {wedding.venueAddress && (
                  <p className="text-sm text-gray-600 mt-1">{wedding.venueAddress}</p>
                )}
              </div>
            </div>

            {/* Footer decoration */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <div className="w-20 h-px" style={{ backgroundColor: colors.secondary }} />
              <Heart className="w-4 h-4" style={{ color: colors.primary }} />
              <div className="w-20 h-px" style={{ backgroundColor: colors.secondary }} />
            </div>
          </div>
        </div>
      </div>

      {/* Gallery in vintage frame */}
      {galleryImages && galleryImages.length > 0 && (
        <div 
          className="mt-8 rounded-lg p-1"
          style={{
            background: `linear-gradient(45deg, ${colors.secondary}, ${colors.accent})`,
          }}
        >
          <div className="card bg-gradient-to-br from-amber-50 to-orange-50">
            <h3 
              className="text-4xl font-serif italic text-center mb-6"
              style={{ color: colors.primary }}
            >
              Cherished Moments
            </h3>
            <ImageGallery images={galleryImages} columns={3} />
          </div>
        </div>
      )}
    </div>
  );
}
