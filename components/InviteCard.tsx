"use client";

import Image from "next/image";
import { Calendar, MapPin, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

interface InviteCardProps {
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
  template?: string;
}

export default function InviteCard({ wedding, template = "elegant-rose" }: InviteCardProps) {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="card overflow-hidden">
        {/* Header Image */}
        {wedding.imageUrl && (
          <div className="relative w-full h-64 -mx-6 -mt-6 mb-6">
            <Image
              src={wedding.imageUrl}
              alt={`${wedding.brideName} & ${wedding.groomName}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
          </div>
        )}

        {/* Couple Names */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900 mb-2">
            {wedding.brideName}
          </h1>
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-12 h-px bg-primary-400" />
            <span className="text-2xl text-primary-600">&</span>
            <div className="w-12 h-px bg-primary-400" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-gray-900">
            {wedding.groomName}
          </h1>
        </div>

        {/* Invitation Message */}
        {wedding.message && (
          <div className="text-center mb-8">
            <p className="text-gray-600 italic">{wedding.message}</p>
          </div>
        )}

        {/* Wedding Details */}
        <div className="space-y-4 mb-8">
          {/* Date */}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-primary-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Date</p>
              <p className="text-gray-600">{formatDate(new Date(wedding.date), "full")}</p>
            </div>
          </div>

          {/* Time */}
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-primary-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Time</p>
              <p className="text-gray-600">{wedding.time}</p>
            </div>
          </div>

          {/* Venue */}
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Venue</p>
              <p className="text-gray-600">{wedding.venue}</p>
              {wedding.venueAddress && (
                <p className="text-sm text-gray-500">{wedding.venueAddress}</p>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="text-center py-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            We joyfully request the pleasure of your company
          </p>
        </div>
      </div>
    </div>
  );
}
