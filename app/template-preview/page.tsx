"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import InviteCard from "@/components/InviteCard";
import RSVPForm from "@/components/RSVPForm";
import { Heart, ArrowLeft, Palette } from "lucide-react";
import { TEMPLATES } from "@/lib/constants";
import Link from "next/link";

function PreviewContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const templateId = searchParams.get("template") || "elegant-rose";
    const primaryColor = searchParams.get("primary");
    const secondaryColor = searchParams.get("secondary");
    const accentColor = searchParams.get("accent");

    // Mock wedding data for preview
    const mockWedding = {
        brideName: "Jane Smith",
        groomName: "John Doe",
        date: "2025-12-15",
        time: "6:00 PM",
        venue: "Grand Ballroom, Hotel Paradise",
        venueAddress: "123 Paradise Street, Colombo 07, Sri Lanka",
        imageUrl: undefined,
        message: "We joyfully request the pleasure of your company at our wedding celebration",
    };

    const customColors =
        primaryColor && secondaryColor && accentColor
            ? {
                primary: primaryColor,
                secondary: secondaryColor,
                accent: accentColor,
            }
            : undefined;

    const template = TEMPLATES.find((t) => t.id === templateId);

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
            {/* Header */}
            <header className="py-6 bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Heart className="w-6 h-6 text-primary-600" fill="currentColor" />
                            <div>
                                <p className="font-semibold text-gray-900">Template Preview</p>
                                <p className="text-xs text-gray-600">{template?.name}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600">
                                <span>Preview Mode</span>
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            </div>
                            <Link
                                href="/dashboard/templates"
                                className="btn-outline text-sm px-4 py-2 flex items-center gap-2"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                Back to Templates
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="py-12 px-4">
                {/* <div className="max-w-4xl mx-auto space-y-12"> */}
                    {/* Invitation Card */}
                    <InviteCard
                        wedding={mockWedding}
                        template={templateId}
                        customColors={customColors}
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
                            <RSVPForm weddingId="preview" />
                        </div>
                    </div>

                    {/* Additional Info */}
                    <div className="card text-center bg-white/80 backdrop-blur-sm">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">
                            This is a Preview
                        </h3>
                        <p className="text-gray-600 mb-4">
                            This is how your invitation will look with the selected template and colors.
                            Return to the templates page to customize or select a different template.
                        </p>
                        <Link
                            href="/dashboard/templates"
                            className="btn-primary inline-flex items-center gap-2"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Templates
                        </Link>
                    </div>
                {/* </div> */}
            </main>

            {/* Footer */}
            <footer className="py-8 text-center text-sm text-gray-500">
                <p>
                    Created with <Heart className="inline w-4 h-4 text-primary-600" fill="currentColor" /> using Wedify
                </p>
            </footer>
        </div>
    );
}

export default function TemplatePreviewPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading preview...</div>}>
            <PreviewContent />
        </Suspense>
    );
}
