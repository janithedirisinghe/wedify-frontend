"use client";

import Image from "next/image";
import { Calendar, MapPin, Clock, Heart, Sparkles, Crown, Flower, ArrowDown, Star, CircleDot } from "lucide-react";
import { formatDate } from "@/lib/utils";
import ImageGallery from "@/components/ImageGallery";
import { useState, useEffect } from "react";

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

export default function ElegantLayout({ wedding, colors, galleryImages }: ElegantLayoutProps) {
  const [timeUntilWedding, setTimeUntilWedding] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const calculateTimeUntil = () => {
      const weddingDate = new Date(wedding.date).getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeUntilWedding({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTimeUntil();
    const timer = setInterval(calculateTimeUntil, 1000);

    return () => clearInterval(timer);
  }, [wedding.date]);

  return (
    <div className="bg-gradient-to-b from-gray-50 via-white to-gray-50 animate-fadeIn">
      {/* Floating Scroll Indicator */}
      <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div 
          className="animate-bounce cursor-pointer hover:scale-110 transition-transform duration-300"
          onClick={() => window.scrollBy({ top: window.innerHeight * 0.7, behavior: 'smooth' })}
        >
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm"
            style={{ backgroundColor: colors.primary + '90', border: `2px solid ${colors.accent}` }}
          >
            <ArrowDown className="w-6 h-6 text-white" />
          </div>
        </div>
      </div>

      {/* Hero Section with Ornate Design */}
      <section className="relative min-h-[70vh] flex items-center justify-center py-16 px-4 overflow-hidden">
        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Heart className="absolute top-20 left-10 w-8 h-8 opacity-10 animate-pulse" style={{ color: colors.primary, animationDuration: '3s' }} />
          <Heart className="absolute top-40 right-20 w-6 h-6 opacity-10 animate-pulse" style={{ color: colors.accent, animationDuration: '4s', animationDelay: '1s' }} />
          <Sparkles className="absolute bottom-32 left-20 w-6 h-6 opacity-10 animate-pulse" style={{ color: colors.secondary, animationDuration: '5s', animationDelay: '2s' }} />
          <Star className="absolute top-60 right-40 w-5 h-5 opacity-10 animate-pulse" style={{ color: colors.primary, animationDuration: '4s', animationDelay: '0.5s' }} />
          <Flower className="absolute bottom-20 right-16 w-7 h-7 opacity-10 animate-pulse" style={{ color: colors.accent, animationDuration: '6s', animationDelay: '1.5s' }} />
        </div>

        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64" style={{ background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)` }}></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64" style={{ background: `radial-gradient(circle, ${colors.secondary} 0%, transparent 70%)` }}></div>
        </div>

        {/* Main Ornate Card */}
        <div 
          className="relative w-full rounded-lg overflow-hidden shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${colors.accent}15, white, ${colors.primary}10)`,
          }}
        >
          <div className="p-3">
            <div 
              className="rounded-lg bg-white p-8 md:p-16 relative overflow-hidden"
              style={{
                border: `3px solid ${colors.primary}40`,
                boxShadow: `inset 0 0 0 1px ${colors.accent}30`,
              }}
            >
              {/* Corner Ornaments */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 rounded-tl-lg opacity-30" style={{ borderColor: colors.primary }}></div>
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 rounded-tr-lg opacity-30" style={{ borderColor: colors.primary }}></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 rounded-bl-lg opacity-30" style={{ borderColor: colors.primary }}></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 rounded-br-lg opacity-30" style={{ borderColor: colors.primary }}></div>

              {/* Decorative Header */}
              <div className="text-center mb-8">
                <div className="flex justify-center items-center gap-3 mb-6">
                  <div className="w-12 h-px" style={{ backgroundColor: colors.primary }}></div>
                  <Heart className="w-5 h-5 animate-pulse" style={{ color: colors.primary }} fill="currentColor" />
                  <Crown className="w-6 h-6" style={{ color: colors.primary }} />
                  <Heart className="w-5 h-5 animate-pulse" style={{ color: colors.primary }} fill="currentColor" />
                  <div className="w-12 h-px" style={{ backgroundColor: colors.primary }}></div>
                </div>
                <p className="text-sm uppercase tracking-[0.3em] font-light" style={{ color: colors.secondary }}>
                  Together with their families
                </p>
              </div>

              {/* Couple Names */}
              <div className="text-center mb-8">
                <h1 className="text-5xl md:text-7xl font-serif mb-6 tracking-wide hover:scale-105 transition-transform duration-500" style={{ color: colors.secondary }}>
                  {wedding.brideName}
                </h1>
                <div className="flex items-center justify-center gap-6 my-8">
                  <div className="w-20 md:w-32 h-px" style={{ backgroundColor: colors.primary }} />
                  <div className="relative">
                    <span className="text-4xl md:text-5xl font-serif relative z-10" style={{ color: colors.primary }}>
                      &
                    </span>
                    <div className="absolute inset-0 blur-lg opacity-30" style={{ backgroundColor: colors.primary }}></div>
                  </div>
                  <div className="w-20 md:w-32 h-px" style={{ backgroundColor: colors.primary }} />
                </div>
                <h1 className="text-5xl md:text-7xl font-serif tracking-wide hover:scale-105 transition-transform duration-500" style={{ color: colors.secondary }}>
                  {wedding.groomName}
                </h1>
              </div>

              {/* Tagline */}
              <div className="text-center mb-8">
                <p className="text-lg md:text-xl italic text-gray-600 font-light">
                  request the honor of your presence
                </p>
              </div>

              {/* Date Display */}
              <div className="text-center mb-8">
                <div className="inline-block px-8 py-4 rounded-full border-2 shadow-lg" style={{ borderColor: colors.accent + '40', backgroundColor: 'white' }}>
                  <p className="text-xl md:text-2xl font-serif" style={{ color: colors.secondary }}>
                    {formatDate(new Date(wedding.date), "full")}
                  </p>
                </div>
              </div>

              {/* Decorative Footer */}
              <div className="flex justify-center items-center gap-3 mt-8">
                <div className="w-12 h-px" style={{ backgroundColor: colors.primary }}></div>
                <Heart className="w-5 h-5 animate-pulse" style={{ color: colors.primary }} fill="currentColor" />
                <Sparkles className="w-6 h-6" style={{ color: colors.accent }} />
                <Heart className="w-5 h-5 animate-pulse" style={{ color: colors.primary }} fill="currentColor" />
                <div className="w-12 h-px" style={{ backgroundColor: colors.primary }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer Section */}
      <section className="w-full bg-white py-12 px-4">
        <div className="mx-auto" style={{ maxWidth: '72rem' }}>
          <div 
            className="relative rounded-2xl p-1 shadow-2xl overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}25, ${colors.accent}20, ${colors.secondary}15)`,
            }}
          >
            {/* Animated Background */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-32 h-32 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: colors.primary, animationDuration: '4s' }}></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: colors.accent, animationDuration: '6s', animationDelay: '1s' }}></div>
            </div>

            <div className="relative bg-white rounded-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="w-12 h-px" style={{ backgroundColor: colors.primary }}></div>
                  <CircleDot className="w-5 h-5 animate-spin" style={{ color: colors.primary, animationDuration: '8s' }} />
                  <div className="w-12 h-px" style={{ backgroundColor: colors.primary }}></div>
                </div>
                <h3 className="text-2xl md:text-3xl font-serif mb-2" style={{ color: colors.secondary }}>
                  Counting Down to Forever
                </h3>
                <p className="text-gray-600 italic">Our special day is approaching</p>
              </div>

              <div className="grid grid-cols-4 gap-4 md:gap-8 max-w-4xl mx-auto">
                {/* Days */}
                <div className="group">
                  <div 
                    className="relative p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    style={{ 
                      backgroundColor: colors.primary + '08',
                      border: `2px solid ${colors.primary}30`
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: colors.primary + '05' }}></div>
                    <div className="relative z-10">
                      <p className="text-3xl md:text-5xl font-bold mb-2 font-serif" style={{ color: colors.primary }}>
                        {timeUntilWedding.days}
                      </p>
                      <p className="text-xs md:text-sm uppercase tracking-wider text-gray-600 font-light">Days</p>
                    </div>
                  </div>
                </div>

                {/* Hours */}
                <div className="group">
                  <div 
                    className="relative p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    style={{ 
                      backgroundColor: colors.accent + '08',
                      border: `2px solid ${colors.accent}30`
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: colors.accent + '05' }}></div>
                    <div className="relative z-10">
                      <p className="text-3xl md:text-5xl font-bold mb-2 font-serif" style={{ color: colors.accent }}>
                        {timeUntilWedding.hours}
                      </p>
                      <p className="text-xs md:text-sm uppercase tracking-wider text-gray-600 font-light">Hours</p>
                    </div>
                  </div>
                </div>

                {/* Minutes */}
                <div className="group">
                  <div 
                    className="relative p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    style={{ 
                      backgroundColor: colors.secondary + '08',
                      border: `2px solid ${colors.secondary}30`
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: colors.secondary + '05' }}></div>
                    <div className="relative z-10">
                      <p className="text-3xl md:text-5xl font-bold mb-2 font-serif" style={{ color: colors.secondary }}>
                        {timeUntilWedding.minutes}
                      </p>
                      <p className="text-xs md:text-sm uppercase tracking-wider text-gray-600 font-light">Minutes</p>
                    </div>
                  </div>
                </div>

                {/* Seconds */}
                <div className="group">
                  <div 
                    className="relative p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                    style={{ 
                      backgroundColor: colors.primary + '08',
                      border: `2px solid ${colors.primary}30`
                    }}
                  >
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ backgroundColor: colors.primary + '05' }}></div>
                    <div className="relative z-10">
                      <p className="text-3xl md:text-5xl font-bold mb-2 font-serif" style={{ color: colors.primary }}>
                        {timeUntilWedding.seconds}
                      </p>
                      <p className="text-xs md:text-sm uppercase tracking-wider text-gray-600 font-light">Seconds</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Message Section */}
      {wedding.message && (
        <section className="w-full px-4 py-16 relative overflow-hidden">
          {/* Parallax Background Elements */}
          <div className="absolute inset-0 pointer-events-none opacity-5">
            <div className="absolute top-20 left-10 w-96 h-96" style={{ background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)` }}></div>
            <div className="absolute bottom-20 right-10 w-96 h-96" style={{ background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)` }}></div>
          </div>

          <div className="mx-auto relative">
            <div 
              className="relative rounded-lg p-1 shadow-xl transform transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
              style={{
                background: `linear-gradient(135deg, ${colors.accent}20, ${colors.primary}15)`,
              }}
            >
              <div className="bg-white rounded-lg p-8 md:p-12 relative">
                {/* Decorative Quote Marks */}
                <div className="absolute top-6 left-6 text-6xl md:text-8xl font-serif leading-none opacity-10" style={{ color: colors.secondary }}>
                  "
                </div>
                <div className="absolute bottom-6 right-6 text-6xl md:text-8xl font-serif leading-none opacity-10 rotate-180" style={{ color: colors.secondary }}>
                  "
                </div>
                
                <div className="relative z-10 text-center px-4 md:px-12 py-8">
                  <p className="text-xl md:text-2xl text-gray-700 italic leading-relaxed mb-6 font-light">
                    {wedding.message}
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-px" style={{ backgroundColor: colors.primary }}></div>
                    <p className="text-gray-600 font-medium tracking-wide">
                      {wedding.brideName} & {wedding.groomName}
                    </p>
                    <div className="w-8 h-px" style={{ backgroundColor: colors.primary }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Love Story Section */}
      {(wedding.story || wedding.howWeMet) && (
        <section className="w-full bg-white py-16 relative overflow-hidden">
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 opacity-30 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full" style={{ 
              background: `radial-gradient(circle at 20% 30%, ${colors.primary}10 0%, transparent 50%), radial-gradient(circle at 80% 70%, ${colors.accent}10 0%, transparent 50%)`
            }}></div>
          </div>

          <div className="mx-auto px-4 relative z-10" style={{ maxWidth: '72rem' }}>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-px" style={{ backgroundColor: colors.primary }}></div>
                <Heart className="w-6 h-6" style={{ color: colors.primary }} fill="currentColor" />
                <div className="w-16 h-px" style={{ backgroundColor: colors.primary }}></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-3" style={{ color: colors.secondary }}>
                Our Love Story
              </h2>
              <p className="text-gray-600 italic">A journey written in the stars</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* How We Met */}
              {wedding.howWeMet && (
                <div 
                  className="group relative p-1 rounded-lg transform transition-all duration-500 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${colors.primary}20, transparent)`,
                  }}
                >
                  <div className="bg-white rounded-lg p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                    {/* Hover Overlay Effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${colors.primary}03, transparent)` }}
                    ></div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div 
                          className="w-14 h-14 rounded-full flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                          style={{ backgroundColor: colors.primary + '15' }}
                        >
                          <Sparkles className="w-7 h-7 group-hover:rotate-12 transition-transform duration-300" style={{ color: colors.primary }} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif group-hover:translate-x-2 transition-transform duration-300" style={{ color: colors.secondary }}>
                          How We Met
                        </h3>
                      </div>
                      <div className="w-16 h-px mb-6 group-hover:w-24 transition-all duration-300" style={{ backgroundColor: colors.primary }}></div>
                      <p className="text-gray-700 leading-relaxed text-lg font-light">
                        {wedding.howWeMet}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Our Journey */}
              {wedding.story && (
                <div 
                  className="group relative p-1 rounded-lg transform transition-all duration-500 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${colors.accent}20, transparent)`,
                  }}
                >
                  <div className="bg-white rounded-lg p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                    {/* Hover Overlay Effect */}
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{ background: `linear-gradient(135deg, ${colors.accent}03, transparent)` }}
                    ></div>

                    <div className="relative z-10">
                      <div className="flex items-center gap-4 mb-6">
                        <div 
                          className="w-14 h-14 rounded-full flex items-center justify-center shadow-md group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                          style={{ backgroundColor: colors.accent + '15' }}
                        >
                          <Heart className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" style={{ color: colors.accent }} />
                        </div>
                        <h3 className="text-2xl md:text-3xl font-serif group-hover:translate-x-2 transition-transform duration-300" style={{ color: colors.secondary }}>
                          Our Journey
                        </h3>
                      </div>
                      <div className="w-16 h-px mb-6 group-hover:w-24 transition-all duration-300" style={{ backgroundColor: colors.accent }}></div>
                      <p className="text-gray-700 leading-relaxed text-lg font-light">
                        {wedding.story}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Meet the Couple Section */}
      {(wedding.brideBio || wedding.groomBio) && (
        <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16">
          <div className="mx-auto px-4" style={{ maxWidth: '72rem' }}>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-px" style={{ backgroundColor: colors.primary }}></div>
                <Crown className="w-6 h-6" style={{ color: colors.primary }} />
                <div className="w-16 h-px" style={{ backgroundColor: colors.primary }}></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-3" style={{ color: colors.secondary }}>
                Meet the Couple
              </h2>
              <p className="text-gray-600 italic">Two souls, one heart</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-16 mx-auto" style={{ maxWidth: '80rem' }}>
              {/* The Bride */}
              {wedding.brideBio && (
                <div className="group transform transition-all duration-500 hover:scale-105">
                  <div 
                    className="p-1 rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${colors.primary}25, ${colors.accent}15)`,
                    }}
                  >
                    <div className="bg-white rounded-lg p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                      {/* Animated Background on Hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at center, ${colors.primary}05, transparent 70%)` }}
                      ></div>

                      <div className="relative z-10 text-center mb-6">
                        <div 
                          className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl border-4 group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 relative"
                          style={{ 
                            backgroundColor: colors.primary + '15',
                            borderColor: colors.primary + '30'
                          }}
                        >
                          <span className="text-5xl font-serif group-hover:scale-110 transition-transform duration-500" style={{ color: colors.primary }}>
                            {wedding.brideName.charAt(0)}
                          </span>
                          {/* Pulse Ring Effect */}
                          <div className="absolute inset-0 rounded-full border-2 animate-ping opacity-20" style={{ borderColor: colors.primary }}></div>
                        </div>
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="w-8 h-px group-hover:w-16 transition-all duration-500" style={{ backgroundColor: colors.primary }}></div>
                          <Flower className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" style={{ color: colors.primary }} />
                          <div className="w-8 h-px group-hover:w-16 transition-all duration-500" style={{ backgroundColor: colors.primary }}></div>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-serif mb-2 group-hover:scale-110 transition-transform duration-300" style={{ color: colors.secondary }}>
                          {wedding.brideName}
                        </h3>
                        <p className="text-gray-500 italic uppercase tracking-widest text-sm">The Bride</p>
                      </div>
                      <div className="w-12 h-px mx-auto mb-6 group-hover:w-24 transition-all duration-500" style={{ backgroundColor: colors.primary }}></div>
                      <p className="text-gray-700 leading-relaxed text-center font-light relative z-10">
                        {wedding.brideBio}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* The Groom */}
              {wedding.groomBio && (
                <div className="group transform transition-all duration-500 hover:scale-105">
                  <div 
                    className="p-1 rounded-lg"
                    style={{
                      background: `linear-gradient(135deg, ${colors.secondary}25, ${colors.accent}15)`,
                    }}
                  >
                    <div className="bg-white rounded-lg p-8 md:p-10 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                      {/* Animated Background on Hover */}
                      <div 
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{ background: `radial-gradient(circle at center, ${colors.secondary}05, transparent 70%)` }}
                      ></div>

                      <div className="relative z-10 text-center mb-6">
                        <div 
                          className="w-28 h-28 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl border-4 group-hover:scale-125 group-hover:-rotate-6 transition-all duration-500 relative"
                          style={{ 
                            backgroundColor: colors.secondary + '15',
                            borderColor: colors.secondary + '30'
                          }}
                        >
                          <span className="text-5xl font-serif group-hover:scale-110 transition-transform duration-500" style={{ color: colors.secondary }}>
                            {wedding.groomName.charAt(0)}
                          </span>
                          {/* Pulse Ring Effect */}
                          <div className="absolute inset-0 rounded-full border-2 animate-ping opacity-20" style={{ borderColor: colors.secondary }}></div>
                        </div>
                        <div className="flex items-center justify-center gap-2 mb-3">
                          <div className="w-8 h-px group-hover:w-16 transition-all duration-500" style={{ backgroundColor: colors.secondary }}></div>
                          <Crown className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" style={{ color: colors.secondary }} />
                          <div className="w-8 h-px group-hover:w-16 transition-all duration-500" style={{ backgroundColor: colors.secondary }}></div>
                        </div>
                        <h3 className="text-3xl md:text-4xl font-serif mb-2 group-hover:scale-110 transition-transform duration-300" style={{ color: colors.secondary }}>
                          {wedding.groomName}
                        </h3>
                        <p className="text-gray-500 italic uppercase tracking-widest text-sm">The Groom</p>
                      </div>
                      <div className="w-12 h-px mx-auto mb-6 group-hover:w-24 transition-all duration-500" style={{ backgroundColor: colors.secondary }}></div>
                      <p className="text-gray-700 leading-relaxed text-center font-light relative z-10">
                        {wedding.groomBio}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Photo Gallery Section */}
      {galleryImages && galleryImages.length > 0 && (
        <section className="w-full bg-white py-16">
          <div className="mx-auto px-4" style={{ maxWidth: '80rem' }}>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-px" style={{ backgroundColor: colors.primary }}></div>
                <Heart className="w-6 h-6" style={{ color: colors.primary }} fill="currentColor" />
                <div className="w-16 h-px" style={{ backgroundColor: colors.primary }}></div>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif mb-3" style={{ color: colors.secondary }}>
                Cherished Moments
              </h2>
              <p className="text-gray-600 italic">A collection of our beautiful memories</p>
            </div>
            
            <div 
              className="p-2 rounded-lg"
              style={{
                background: `linear-gradient(135deg, ${colors.accent}15, ${colors.primary}10)`,
              }}
            >
              <div className="bg-white rounded-lg p-6 md:p-10 shadow-xl">
                <ImageGallery images={galleryImages} columns={3} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Wedding Details Section */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="mx-auto px-4" style={{ maxWidth: '80rem' }}>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-px" style={{ backgroundColor: colors.primary }}></div>
              <Sparkles className="w-6 h-6" style={{ color: colors.primary }} />
              <div className="w-16 h-px" style={{ backgroundColor: colors.primary }}></div>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif mb-3" style={{ color: colors.secondary }}>
              Celebration Details
            </h2>
            <p className="text-gray-600 italic">Join us as we begin our forever</p>
          </div>

          <div 
            className="p-2 rounded-lg"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}15, ${colors.accent}15)`,
            }}
          >
            <div 
              className="bg-white rounded-lg p-8 md:p-12"
              style={{
                border: `2px solid ${colors.primary}20`,
              }}
            >
              <div className="grid md:grid-cols-3 gap-8 md:gap-12">
                {/* Date */}
                <div className="text-center group transform transition-all duration-500 hover:scale-110">
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 relative overflow-hidden"
                    style={{ 
                      backgroundColor: colors.primary + '10',
                      borderColor: colors.primary + '30'
                    }}
                  >
                    {/* Ripple Effect on Hover */}
                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500"></div>
                    <Calendar className="w-9 h-9 relative z-10 group-hover:rotate-12 transition-transform duration-300" style={{ color: colors.primary }} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 font-light">When</p>
                  <div className="w-12 h-px mx-auto mb-4 group-hover:w-20 transition-all duration-300" style={{ backgroundColor: colors.primary }}></div>
                  <p className="text-lg md:text-xl font-serif leading-relaxed group-hover:scale-105 transition-transform duration-300" style={{ color: colors.secondary }}>
                    {formatDate(new Date(wedding.date), "full")}
                  </p>
                </div>

                {/* Time */}
                <div className="text-center group transform transition-all duration-500 hover:scale-110">
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 relative overflow-hidden"
                    style={{ 
                      backgroundColor: colors.accent + '10',
                      borderColor: colors.accent + '30'
                    }}
                  >
                    {/* Ripple Effect on Hover */}
                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500"></div>
                    <Clock className="w-9 h-9 relative z-10 group-hover:rotate-180 transition-transform duration-500" style={{ color: colors.accent }} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 font-light">At</p>
                  <div className="w-12 h-px mx-auto mb-4 group-hover:w-20 transition-all duration-300" style={{ backgroundColor: colors.accent }}></div>
                  <p className="text-lg md:text-xl font-serif leading-relaxed group-hover:scale-105 transition-transform duration-300" style={{ color: colors.secondary }}>
                    {wedding.time}
                  </p>
                </div>

                {/* Venue */}
                <div className="text-center group transform transition-all duration-500 hover:scale-110">
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300 border-2 relative overflow-hidden"
                    style={{ 
                      backgroundColor: colors.secondary + '10',
                      borderColor: colors.secondary + '30'
                    }}
                  >
                    {/* Ripple Effect on Hover */}
                    <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500"></div>
                    <MapPin className="w-9 h-9 relative z-10 group-hover:scale-125 transition-transform duration-300" style={{ color: colors.secondary }} />
                  </div>
                  <p className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3 font-light">Where</p>
                  <div className="w-12 h-px mx-auto mb-4 group-hover:w-20 transition-all duration-300" style={{ backgroundColor: colors.secondary }}></div>
                  <p className="text-lg md:text-xl font-serif mb-2 leading-relaxed group-hover:scale-105 transition-transform duration-300" style={{ color: colors.secondary }}>
                    {wedding.venue}
                  </p>
                  {wedding.venueAddress && (
                    <p className="text-sm text-gray-600 leading-relaxed font-light">
                      {wedding.venueAddress}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Footer CTA */}
      <section className="w-full bg-white py-16 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 pointer-events-none opacity-5">
          <div className="absolute top-0 left-1/4 w-64 h-64" style={{ background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)` }}></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64" style={{ background: `radial-gradient(circle, ${colors.accent} 0%, transparent 70%)` }}></div>
        </div>

        <div className="mx-auto px-4 text-center relative z-10" style={{ maxWidth: '48rem' }}>
          {/* Animated Heart Group */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-20 h-px animate-pulse" style={{ backgroundColor: colors.primary, animationDuration: '2s' }}></div>
            <div className="relative">
              <Heart 
                className="w-10 h-10 animate-pulse relative z-10" 
                style={{ color: colors.primary, animationDuration: '1.5s' }}
                fill="currentColor"
              />
              {/* Pulse rings */}
              <div className="absolute inset-0 rounded-full border-2 animate-ping" style={{ borderColor: colors.primary }}></div>
              <div className="absolute inset-0 rounded-full border animate-pulse opacity-30" style={{ borderColor: colors.accent, animationDelay: '0.5s', animationDuration: '2s' }}></div>
            </div>
            <div className="w-20 h-px animate-pulse" style={{ backgroundColor: colors.primary, animationDuration: '2s' }}></div>
          </div>

          {/* CTA Content with Gradient Border */}
          <div 
            className="p-1 rounded-2xl mb-8"
            style={{
              background: `linear-gradient(135deg, ${colors.primary}30, ${colors.accent}30, ${colors.secondary}20)`,
            }}
          >
            <div className="bg-white rounded-xl p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-serif mb-6 hover:scale-105 transition-transform duration-300" style={{ color: colors.secondary }}>
                Your Presence Would Be Our Greatest Gift
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light italic mb-6">
                We would be honored to celebrate this special moment with you. 
                <br className="hidden md:block" />
                Kindly respond at your earliest convenience.
              </p>

              {/* Decorative Elements */}
              <div className="flex items-center justify-center gap-4 mt-8">
                <Sparkles className="w-5 h-5 animate-pulse" style={{ color: colors.primary, animationDuration: '3s' }} />
                <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: colors.primary, animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: colors.accent, animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: colors.secondary, animationDelay: '0.4s' }}></div>
                </div>
                <Sparkles className="w-5 h-5 animate-pulse" style={{ color: colors.accent, animationDuration: '3s', animationDelay: '1s' }} />
              </div>
            </div>
          </div>

          {/* Decorative Footer Line */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-24 h-px" style={{ backgroundColor: colors.primary }}></div>
            <Star className="w-4 h-4" style={{ color: colors.secondary }} />
            <div className="w-24 h-px" style={{ backgroundColor: colors.primary }}></div>
          </div>
        </div>
      </section>
    </div>
  );
}
