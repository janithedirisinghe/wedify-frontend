"use client";

import { TEMPLATES, MOCK_GALLERY_IMAGES } from "@/lib/constants";
import BasicLayout from "@/components/templates/BasicLayout";
import ElegantLayout from "@/components/templates/ElegantLayout";
import ModernLayout from "@/components/templates/ModernLayout";
import RusticLayout from "@/components/templates/RusticLayout";
import TropicalLayout from "@/components/templates/TropicalLayout";
import VintageLayout from "@/components/templates/VintageLayout";

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
    galleryImages?: string[];
  };
  template?: string;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function InviteCard({ 
  wedding, 
  template = "elegant-rose",
  customColors 
}: InviteCardProps) {
  // Get base template
  const baseTemplate = TEMPLATES.find((t) => t.id === template);
  
  // Use custom colors if provided, otherwise use template defaults
  const colors = customColors || baseTemplate?.colors || {
    primary: "#d04061",
    secondary: "#446382",
    accent: "#f5f5f5",
  };

  // Get gallery images (use provided or mock images)
  const galleryImages = wedding.galleryImages || [...MOCK_GALLERY_IMAGES];

  // Determine which layout to use
  const layout = baseTemplate?.layout || "elegant";

  // Render the appropriate layout component
  const layoutProps = {
    wedding,
    colors,
    galleryImages,
  };

  switch (layout) {
    case "basic":
      return <BasicLayout {...layoutProps} />;
    case "elegant":
      return <ElegantLayout {...layoutProps} />;
    case "modern":
      return <ModernLayout {...layoutProps} />;
    case "rustic":
      return <RusticLayout {...layoutProps} />;
    case "tropical":
      return <TropicalLayout {...layoutProps} />;
    case "vintage":
      return <VintageLayout {...layoutProps} />;
    default:
      return <ElegantLayout {...layoutProps} />;
  }
}
