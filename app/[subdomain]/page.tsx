import { Metadata } from "next";
import { notFound } from "next/navigation";
import InviteCard from "@/components/InviteCard";
import RSVPForm from "@/components/RSVPForm";
import { Heart } from "lucide-react";

// Mock function - replace with actual API call
async function getWeddingBySubdomain(subdomain: string) {
  // Simulate API call
  // In production, fetch from your backend: GET /api/wedding/:subdomain
  // Should return wedding with customColors if set
  return {
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
    // Example with custom colors:
    // customColors: { primary: "#ff6b9d", secondary: "#00b8d4", accent: "#fff59d" }
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const wedding = await getWeddingBySubdomain(subdomain);

  if (!wedding) {
    return {
      title: "Wedding Invitation Not Found",
    };
  }

  return {
    title: `${wedding.brideName} & ${wedding.groomName} - Wedding Invitation`,
    description: `Join us for our wedding celebration on ${wedding.date} at ${wedding.venue}`,
    openGraph: {
      title: `${wedding.brideName} & ${wedding.groomName}`,
      description: `You're invited to our wedding! ${wedding.date}`,
      images: wedding.imageUrl ? [wedding.imageUrl] : [],
    },
  };
}

export default async function InvitationPage({
  params,
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const wedding = await getWeddingBySubdomain(subdomain);

  if (!wedding) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {/* Header */}
      <header className="py-6">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Heart className="w-8 h-8 text-primary-600 mx-auto mb-2" fill="currentColor" />
          <p className="text-sm text-gray-600">You're Invited!</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Invitation Card */}
          <InviteCard 
            wedding={wedding} 
            template={wedding.template}
            customColors={wedding.customColors}
          />

          {/* RSVP Section */}
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Will You Join Us?
                </h2>
                <p className="text-gray-600">
                  Please let us know if you can attend
                </p>
              </div>
              <RSVPForm weddingId={wedding.id} />
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
