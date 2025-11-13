import { Metadata } from "next";
import { notFound } from "next/navigation";
import InviteCard from "@/components/InviteCard";
import RSVPForm from "@/components/RSVPForm";
import { Heart, Gift } from "lucide-react";

// Mock function - replace with actual API call
async function getGuestInvitation(subdomain: string, code: string) {
  // Simulate API call
  // In production: GET /api/wedding/:subdomain/guest/:code
  return {
    guest: {
      id: code,
      name: "Sarah Johnson",
      guestCount: 2,
    },
    wedding: {
      id: "wedding-123",
      subdomain,
      brideName: "Jane Smith",
      groomName: "John Doe",
      date: "2025-12-15",
      time: "6:00 PM",
      venue: "Grand Ballroom, Hotel Paradise",
      venueAddress: "123 Paradise Street, Colombo 07, Sri Lanka",
      imageUrl: undefined,
      message: "We joyfully request the pleasure of your company at our wedding celebration",
      template: "elegant-rose",
      customColors: undefined, // Will be set if user customized colors
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string; code: string }>;
}): Promise<Metadata> {
  const { subdomain, code } = await params;
  const data = await getGuestInvitation(subdomain, code);

  if (!data) {
    return {
      title: "Invitation Not Found",
    };
  }

  const { wedding, guest } = data;

  return {
    title: `${guest.name} - ${wedding.brideName} & ${wedding.groomName}'s Wedding`,
    description: `Personal invitation for ${guest.name}`,
    openGraph: {
      title: `${wedding.brideName} & ${wedding.groomName}`,
      description: `${guest.name}, you're invited to our wedding!`,
      images: wedding.imageUrl ? [wedding.imageUrl] : [],
    },
  };
}

export default async function PersonalInvitePage({
  params,
}: {
  params: Promise<{ subdomain: string; code: string }>;
}) {
  const { subdomain, code } = await params;
  const data = await getGuestInvitation(subdomain, code);

  if (!data) {
    notFound();
  }

  const { wedding, guest } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-8 h-8 text-primary-600 mx-auto mb-2" fill="currentColor" />
          <p className="text-sm text-gray-600">Personal Invitation</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Personal Greeting */}
          <div className="text-center animate-fade-in">
            <div className="inline-block px-6 py-3 bg-white rounded-full shadow-md mb-6">
              <p className="text-lg">
                <span className="text-gray-600">Dear</span>{" "}
                <span className="font-semibold text-primary-600">{guest.name}</span>
              </p>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
              You're Invited to Our Wedding!
            </h1>
            <p className="text-gray-600">
              We would be honored to have you celebrate this special day with us
            </p>
          </div>

          {/* Invitation Card */}
          <InviteCard 
            wedding={wedding} 
            template={wedding.template}
            customColors={wedding.customColors}
          />

          {/* Guest Details */}
          {guest.guestCount > 1 && (
            <div className="card text-center bg-primary-50 border-2 border-primary-100">
              <Gift className="w-8 h-8 text-primary-600 mx-auto mb-3" />
              <p className="text-gray-700">
                Your invitation is for{" "}
                <span className="font-semibold text-primary-600">
                  {guest.guestCount} {guest.guestCount === 1 ? "guest" : "guests"}
                </span>
              </p>
            </div>
          )}

          {/* RSVP Section */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Will You Join Us?
                </h2>
                <p className="text-gray-600">
                  Please confirm your attendance
                </p>
              </div>
              <RSVPForm weddingId={wedding.id} guestCode={guest.id} />
            </div>
          </div>

          {/* Additional Info */}
          <div className="card text-center bg-white/80 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              We Can't Wait to Celebrate With You!
            </h3>
            <p className="text-gray-600 mb-4">
              For any questions or special requirements, please don't hesitate to reach out.
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-500">
              <span>📧 Contact: info@wedding.com</span>
              <span>📱 +94 XX XXX XXXX</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-sm text-gray-500">
        <p>
          Created with <Heart className="inline w-4 h-4 text-primary-600" fill="currentColor" /> using{" "}
          <a
            href="https://wedify.lk"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Wedify
          </a>
        </p>
      </footer>
    </div>
  );
}
