"use client";

import { Calendar, MapPin, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";

interface BasicLayoutProps {
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

export default function BasicLayout({ wedding, colors, galleryImages }: BasicLayoutProps) {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Simple Header */}
      <div className="card text-center">
        <h1 className="text-5xl font-serif mb-4" style={{ color: colors.secondary }}>
          {wedding.brideName}
          <span className="mx-3" style={{ color: colors.primary }}>&</span>
          {wedding.groomName}
        </h1>
        <p className="text-lg text-gray-600">{formatDate(new Date(wedding.date), "full")}</p>
      </div>

      {/* Message */}
      {wedding.message && (
        <div className="card text-center">
          <p className="text-gray-700 italic">{wedding.message}</p>
        </div>
      )}

      {/* Details */}
      <div className="card space-y-4">
        <div className="flex items-start gap-3">
          <Calendar className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
          <div>
            <p className="font-medium text-gray-900">Date</p>
            <p className="text-gray-600">{formatDate(new Date(wedding.date), "full")}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Clock className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
          <div>
            <p className="font-medium text-gray-900">Time</p>
            <p className="text-gray-600">{wedding.time}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <MapPin className="w-5 h-5 mt-0.5" style={{ color: colors.primary }} />
          <div>
            <p className="font-medium text-gray-900">Venue</p>
            <p className="text-gray-600">{wedding.venue}</p>
            {wedding.venueAddress && (
              <p className="text-sm text-gray-500">{wedding.venueAddress}</p>
            )}
          </div>
        </div>
      </div>

      {/* Gallery */}
      {galleryImages && galleryImages.length > 0 && (
        <div className="card">
          <h3 className="text-2xl font-serif mb-4 text-center" style={{ color: colors.secondary }}>
            Our Memories
          </h3>
          <ImageGallery images={galleryImages} columns={3} />
        </div>
      )}
    </div>
  );
}
