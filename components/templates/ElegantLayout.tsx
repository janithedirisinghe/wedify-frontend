"use client";

import Image from "next/image";
import { Calendar, MapPin, Clock, Heart } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";

interface ElegantLayoutProps {
  wedding: {
    brideName: string;
    groomName: string;
    date: string;
    time: string;
    venue: string;
    venueAddress?: string;
    imageUrl?: string;
    message?: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  galleryImages?: string[];
}

export default function ElegantLayout({ wedding, colors, galleryImages }: ElegantLayoutProps) {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Ornate Border */}
      <div 
        className="rounded-lg overflow-hidden"
        style={{
          background: `linear-gradient(to bottom, ${colors.accent}, white)`,
        }}
      >
        <div className="p-2">
          <div 
            className="rounded-lg p-8 md:p-12"
            style={{
              border: `2px solid ${colors.primary}`,
              backgroundColor: 'white',
            }}
          >
            {/* Decorative Header */}
            <div className="text-center mb-8">
              <div className="flex justify-center gap-2 mb-4">
                <Heart className="w-5 h-5" style={{ color: colors.primary }} fill="currentColor" />
                <Heart className="w-6 h-6" style={{ color: colors.primary }} fill="currentColor" />
                <Heart className="w-5 h-5" style={{ color: colors.primary }} fill="currentColor" />
              </div>
              <p className="text-sm uppercase tracking-widest" style={{ color: colors.secondary }}>
                Together with their families
              </p>
            </div>

            {/* Names */}
            <div className="text-center mb-8">
              <h1 className="text-5xl md:text-6xl font-serif mb-3" style={{ color: colors.secondary }}>
                {wedding.brideName}
              </h1>
              <div className="flex items-center justify-center gap-4 my-4">
                <div className="w-16 h-px" style={{ backgroundColor: colors.primary }} />
                <span className="text-3xl font-serif" style={{ color: colors.primary }}>&</span>
                <div className="w-16 h-px" style={{ backgroundColor: colors.primary }} />
              </div>
              <h1 className="text-5xl md:text-6xl font-serif" style={{ color: colors.secondary }}>
                {wedding.groomName}
              </h1>
            </div>

            {/* Message */}
            {wedding.message && (
              <div className="text-center mb-8 px-6">
                <p className="text-gray-700 italic text-lg leading-relaxed">
                  "{wedding.message}"
                </p>
              </div>
            )}

            {/* Divider */}
            <div className="flex justify-center my-8">
              <div className="w-24 h-px" style={{ backgroundColor: colors.primary }} />
            </div>

            {/* Details in Elegant Format */}
            <div className="space-y-6 max-w-md mx-auto">
              <div className="text-center">
                <Calendar className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
                <p className="text-sm uppercase tracking-wide text-gray-600 mb-1">Date</p>
                <p className="text-lg font-medium" style={{ color: colors.secondary }}>
                  {formatDate(new Date(wedding.date), "full")}
                </p>
              </div>

              <div className="text-center">
                <Clock className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
                <p className="text-sm uppercase tracking-wide text-gray-600 mb-1">Time</p>
                <p className="text-lg font-medium" style={{ color: colors.secondary }}>
                  {wedding.time}
                </p>
              </div>

              <div className="text-center">
                <MapPin className="w-6 h-6 mx-auto mb-2" style={{ color: colors.primary }} />
                <p className="text-sm uppercase tracking-wide text-gray-600 mb-1">Venue</p>
                <p className="text-lg font-medium" style={{ color: colors.secondary }}>
                  {wedding.venue}
                </p>
                {wedding.venueAddress && (
                  <p className="text-sm text-gray-600 mt-1">{wedding.venueAddress}</p>
                )}
              </div>
            </div>

            {/* Decorative Footer */}
            <div className="flex justify-center gap-2 mt-8">
              <Heart className="w-5 h-5" style={{ color: colors.primary }} fill="currentColor" />
              <Heart className="w-6 h-6" style={{ color: colors.primary }} fill="currentColor" />
              <Heart className="w-5 h-5" style={{ color: colors.primary }} fill="currentColor" />
            </div>
          </div>
        </div>
      </div>

      {/* Gallery */}
      {galleryImages && galleryImages.length > 0 && (
        <div className="mt-12 card">
          <h3 className="text-3xl font-serif mb-6 text-center" style={{ color: colors.secondary }}>
            Our Love Story
          </h3>
          <ImageGallery images={galleryImages} columns={3} />
        </div>
      )}
    </div>
  );
}
