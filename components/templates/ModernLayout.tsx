"use client";

import { Calendar, MapPin, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";

interface ModernLayoutProps {
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

export default function ModernLayout({ wedding, colors, galleryImages }: ModernLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Split Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Side - Names */}
        <div 
          className="rounded-lg p-12 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
          }}
        >
          <div className="text-center">
            <div className="mb-8">
              <h1 className="text-6xl font-bold mb-2" style={{ color: colors.accent }}>
                {wedding.brideName.split(' ')[0]}
              </h1>
              <div className="w-16 h-1 mx-auto" style={{ backgroundColor: colors.accent }} />
            </div>
            <div className="text-4xl font-light my-6" style={{ color: colors.accent }}>
              &
            </div>
            <div className="mt-8">
              <h1 className="text-6xl font-bold mt-2" style={{ color: colors.accent }}>
                {wedding.groomName.split(' ')[0]}
              </h1>
              <div className="w-16 h-1 mx-auto mt-2" style={{ backgroundColor: colors.accent }} />
            </div>
          </div>
        </div>

        {/* Right Side - Details */}
        <div className="card space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: colors.primary }}>
              Wedding Date
            </p>
            <p className="text-2xl font-medium" style={{ color: colors.secondary }}>
              {formatDate(new Date(wedding.date), "full")}
            </p>
          </div>

          <div className="h-px" style={{ backgroundColor: colors.accent }} />

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: colors.primary }}>
              Ceremony Time
            </p>
            <p className="text-xl" style={{ color: colors.secondary }}>
              {wedding.time}
            </p>
          </div>

          <div className="h-px" style={{ backgroundColor: colors.accent }} />

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider mb-2" style={{ color: colors.primary }}>
              Location
            </p>
            <p className="text-xl" style={{ color: colors.secondary }}>
              {wedding.venue}
            </p>
            {wedding.venueAddress && (
              <p className="text-sm text-gray-600 mt-1">{wedding.venueAddress}</p>
            )}
          </div>
        </div>
      </div>

      {/* Message */}
      {wedding.message && (
        <div 
          className="card text-center p-8"
          style={{
            borderLeft: `4px solid ${colors.primary}`,
          }}
        >
          <p className="text-lg text-gray-700">{wedding.message}</p>
        </div>
      )}

      {/* Gallery */}
      {galleryImages && galleryImages.length > 0 && (
        <div className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-12" style={{ backgroundColor: colors.primary }} />
            <h3 className="text-3xl font-bold" style={{ color: colors.secondary }}>
              Gallery
            </h3>
          </div>
          <ImageGallery images={galleryImages} columns={4} />
        </div>
      )}
    </div>
  );
}
