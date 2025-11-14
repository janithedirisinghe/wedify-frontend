"use client";

import { Calendar, MapPin, Clock, Heart, Users, Sparkles } from "lucide-react";
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
    story?: string;
    howWeMet?: string;
    groomBio?: string;
    brideBio?: string;
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
    <div className="w-full animate-fadeIn">
      {/* Hero Section - Couple Names */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-white">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full" style={{ background: colors.primary, filter: 'blur(60px)' }}></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full" style={{ background: colors.secondary, filter: 'blur(70px)' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full" style={{ background: colors.accent, filter: 'blur(80px)' }}></div>
        </div>
        
        <div className="relative z-10 text-center px-4 py-16">
          {/* Heart Icon */}
          <div className="flex justify-center mb-6">
            <Heart 
              className="w-16 h-16 animate-pulse" 
              style={{ color: colors.primary }}
              fill="currentColor"
            />
          </div>

          {/* Couple Names */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif mb-8 leading-tight tracking-wide">
            <span className="inline-block hover:scale-105 transition-transform duration-300" style={{ color: colors.secondary }}>
              {wedding.brideName}
            </span>
            <span className="mx-4 md:mx-6 text-4xl md:text-6xl lg:text-7xl inline-block animate-pulse" style={{ color: colors.primary }}>
              &
            </span>
            <span className="inline-block hover:scale-105 transition-transform duration-300" style={{ color: colors.secondary }}>
              {wedding.groomName}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">
            Together Forever
          </p>

          {/* Date Badge */}
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white shadow-xl border-2" style={{ borderColor: colors.primary + '30' }}>
            <Calendar className="w-6 h-6" style={{ color: colors.primary }} />
            <p className="text-lg md:text-xl font-medium text-gray-800">
              {formatDate(new Date(wedding.date), "full")}
            </p>
          </div>
        </div>
      </section>

      {/* Welcome Message Section */}
      {wedding.message && (
        <section className="max-w-4xl mx-auto px-4 py-16">
          <div className="relative group">
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                 style={{ background: `linear-gradient(135deg, ${colors.primary}10, ${colors.accent}10)` }}>
            </div>
            <div className="relative bg-white rounded-2xl p-8 md:p-12 shadow-lg border-l-4 hover:shadow-xl transition-all duration-300" style={{ borderLeftColor: colors.accent }}>
              <div className="flex items-start gap-4">
                <div className="text-6xl md:text-8xl leading-none opacity-20 font-serif" style={{ color: colors.secondary }}>"</div>
                <div className="flex-1 pt-4">
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed italic mb-4">
                    {wedding.message}
                  </p>
                  <p className="text-right text-gray-500 font-medium">
                    - {wedding.brideName} & {wedding.groomName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Our Story Section */}
      {(wedding.story || wedding.howWeMet) && (
        <section className="bg-gradient-to-br from-gray-50 to-white py-16">
          <div className="max-w-5xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: colors.secondary }}>
                Our Love Story
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: colors.primary }}></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* How We Met */}
              {wedding.howWeMet && (
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                      <Sparkles className="w-6 h-6" style={{ color: colors.primary }} />
                    </div>
                    <h3 className="text-2xl font-serif" style={{ color: colors.secondary }}>
                      How We Met
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {wedding.howWeMet}
                  </p>
                </div>
              )}

              {/* Our Story */}
              {wedding.story && (
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent + '20' }}>
                      <Heart className="w-6 h-6" style={{ color: colors.accent }} />
                    </div>
                    <h3 className="text-2xl font-serif" style={{ color: colors.secondary }}>
                      Our Journey
                    </h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {wedding.story}
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Meet the Couple Section */}
      {(wedding.brideBio || wedding.groomBio) && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: colors.secondary }}>
              Meet the Couple
            </h2>
            <div className="w-24 h-1 mx-auto rounded-full" style={{ backgroundColor: colors.primary }}></div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {/* Bride */}
            {wedding.brideBio && (
              <div className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg" 
                         style={{ backgroundColor: colors.primary + '20' }}>
                      <span className="text-4xl font-serif" style={{ color: colors.primary }}>
                        {wedding.brideName.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-3xl font-serif mb-2" style={{ color: colors.secondary }}>
                      {wedding.brideName}
                    </h3>
                    <p className="text-gray-500 italic">The Bride</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-center">
                    {wedding.brideBio}
                  </p>
                </div>
              </div>
            )}

            {/* Groom */}
            {wedding.groomBio && (
              <div className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
                  <div className="text-center mb-6">
                    <div className="w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center shadow-lg" 
                         style={{ backgroundColor: colors.accent + '20' }}>
                      <span className="text-4xl font-serif" style={{ color: colors.accent }}>
                        {wedding.groomName.charAt(0)}
                      </span>
                    </div>
                    <h3 className="text-3xl font-serif mb-2" style={{ color: colors.secondary }}>
                      {wedding.groomName}
                    </h3>
                    <p className="text-gray-500 italic">The Groom</p>
                  </div>
                  <p className="text-gray-700 leading-relaxed text-center">
                    {wedding.groomBio}
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Photo Gallery Section */}
      {galleryImages && galleryImages.length > 0 && (
        <section className="bg-gradient-to-br from-white to-gray-50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: colors.secondary }}>
                Our Memories
              </h2>
              <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ backgroundColor: colors.primary }}></div>
              <p className="text-gray-600 text-lg">Captured moments of our journey together</p>
            </div>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-xl">
              <ImageGallery images={galleryImages} columns={3} />
            </div>
          </div>
        </section>
      )}

      {/* Wedding Details Section */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif mb-4" style={{ color: colors.secondary }}>
            Ceremony Details
          </h2>
          <div className="w-24 h-1 mx-auto rounded-full mb-4" style={{ backgroundColor: colors.primary }}></div>
          <p className="text-gray-600 text-lg">Join us in celebrating our special day</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* Date Card */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-t-4" style={{ borderTopColor: colors.primary }}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md transition-transform group-hover:scale-110 duration-300" 
                   style={{ backgroundColor: colors.primary + '20' }}>
                <Calendar className="w-8 h-8" style={{ color: colors.primary }} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-xl">Date</h3>
              <p className="text-gray-600 leading-relaxed">{formatDate(new Date(wedding.date), "full")}</p>
            </div>
          </div>

          {/* Time Card */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-t-4" style={{ borderTopColor: colors.accent }}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md transition-transform group-hover:scale-110 duration-300" 
                   style={{ backgroundColor: colors.accent + '20' }}>
                <Clock className="w-8 h-8" style={{ color: colors.accent }} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-xl">Time</h3>
              <p className="text-gray-600 leading-relaxed">{wedding.time}</p>
            </div>
          </div>

          {/* Venue Card */}
          <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 border-t-4" style={{ borderTopColor: colors.secondary }}>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center shadow-md transition-transform group-hover:scale-110 duration-300" 
                   style={{ backgroundColor: colors.secondary + '20' }}>
                <MapPin className="w-8 h-8" style={{ color: colors.secondary }} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 text-xl">Venue</h3>
              <p className="text-gray-700 font-medium mb-1">{wedding.venue}</p>
              {wedding.venueAddress && (
                <p className="text-sm text-gray-500 leading-relaxed">{wedding.venueAddress}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Call-to-Action */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <Heart 
            className="w-12 h-12 mx-auto mb-6 animate-pulse" 
            style={{ color: colors.primary }}
            fill="currentColor"
          />
          <h2 className="text-3xl md:text-4xl font-serif mb-4" style={{ color: colors.secondary }}>
            We Can't Wait to Celebrate With You!
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your presence would make our day even more special. Please RSVP to let us know if you can join us.
          </p>
        </div>
      </section>
    </div>
  );
}
