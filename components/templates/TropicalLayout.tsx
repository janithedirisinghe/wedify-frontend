"use client";

import { Calendar, MapPin, Clock, Waves } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";

interface TropicalLayoutProps {
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

export default function TropicalLayout({ wedding, colors, galleryImages }: TropicalLayoutProps) {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Wave header */}
      <div className="relative overflow-hidden rounded-t-lg" style={{ backgroundColor: colors.primary }}>
        <div className="relative z-10 text-center py-12 px-6">
          <p className="text-white/90 uppercase tracking-widest text-sm mb-4">
            Beach Wedding Celebration
          </p>
          <h1 className="text-6xl md:text-7xl font-light text-white mb-2">
            {wedding.brideName}
          </h1>
          <div className="flex items-center justify-center gap-4 my-6">
            <Waves className="w-6 h-6 text-white/80" />
            <span className="text-3xl text-white">&</span>
            <Waves className="w-6 h-6 text-white/80" />
          </div>
          <h1 className="text-6xl md:text-7xl font-light text-white">
            {wedding.groomName}
          </h1>
        </div>
        {/* Wave decoration */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-12"
          style={{
            background: `linear-gradient(to bottom, transparent, ${colors.accent})`,
          }}
        />
      </div>

      {/* Content */}
      <div className="card rounded-t-none" style={{ backgroundColor: colors.accent }}>
        {/* Message */}
        {wedding.message && (
          <div 
            className="p-8 rounded-lg mb-8 text-center"
            style={{
              background: `linear-gradient(135deg, ${colors.secondary}20 0%, ${colors.primary}20 100%)`,
            }}
          >
            <p className="text-lg italic" style={{ color: colors.primary }}>
              "{wedding.message}"
            </p>
          </div>
        )}

        {/* Details with tropical styling */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div 
            className="rounded-lg p-6 text-center"
            style={{
              backgroundColor: 'white',
              borderTop: `4px solid ${colors.primary}`,
            }}
          >
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: colors.secondary }}
            >
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">When</p>
            <p className="font-semibold text-lg" style={{ color: colors.primary }}>
              {formatDate(new Date(wedding.date), "full")}
            </p>
          </div>

          <div 
            className="rounded-lg p-6 text-center"
            style={{
              backgroundColor: 'white',
              borderTop: `4px solid ${colors.secondary}`,
            }}
          >
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: colors.primary }}
            >
              <Clock className="w-8 h-8 text-white" />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Time</p>
            <p className="font-semibold text-lg" style={{ color: colors.secondary }}>
              {wedding.time}
            </p>
          </div>

          <div 
            className="rounded-lg p-6 text-center"
            style={{
              backgroundColor: 'white',
              borderTop: `4px solid ${colors.accent}`,
            }}
          >
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: colors.secondary }}
            >
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">Where</p>
            <p className="font-semibold" style={{ color: colors.primary }}>
              {wedding.venue}
            </p>
            {wedding.venueAddress && (
              <p className="text-sm text-gray-600 mt-1">{wedding.venueAddress}</p>
            )}
          </div>
        </div>

        {/* Wave divider */}
        <div className="flex items-center justify-center gap-2 my-8">
          <Waves className="w-6 h-6" style={{ color: colors.primary }} />
          <Waves className="w-8 h-8" style={{ color: colors.secondary }} />
          <Waves className="w-6 h-6" style={{ color: colors.primary }} />
        </div>

        {/* Gallery */}
        {galleryImages && galleryImages.length > 0 && (
          <div>
            <h3 
              className="text-4xl font-light text-center mb-6"
              style={{ color: colors.primary }}
            >
              Paradise Memories
            </h3>
            <ImageGallery images={galleryImages} columns={3} />
          </div>
        )}
      </div>
    </div>
  );
}
