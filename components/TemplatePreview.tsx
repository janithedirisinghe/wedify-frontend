"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { TEMPLATES } from "@/lib/constants";

interface TemplatePreviewProps {
  templateId: string;
  selected?: boolean;
  onSelect?: (templateId: string) => void;
}

export default function TemplatePreview({
  templateId,
  selected = false,
  onSelect,
}: TemplatePreviewProps) {
  const template = TEMPLATES.find((t) => t.id === templateId);

  if (!template) return null;

  return (
    <div
      className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-200 ${
        selected
          ? "ring-4 ring-primary-600 shadow-xl scale-105"
          : "ring-1 ring-gray-200 hover:ring-2 hover:ring-primary-300 hover:shadow-lg"
      }`}
      onClick={() => onSelect?.(templateId)}
    >
      {/* Selected Badge */}
      {selected && (
        <div className="absolute top-2 right-2 z-10 bg-primary-600 text-white rounded-full p-1">
          <Check className="w-4 h-4" />
        </div>
      )}

      {/* Template Preview */}
      <div className="aspect-[3/4] bg-gradient-to-br from-gray-100 to-gray-200 relative">
        {template.thumbnail && (
          <Image
            src={template.thumbnail}
            alt={template.name}
            fill
            className="object-cover"
          />
        )}
        
        {/* Color Palette Preview */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 text-center">
            <h3 className="text-2xl font-serif mb-2" style={{ color: template.colors.primary }}>
              John & Jane
            </h3>
            <div className="flex gap-2 justify-center">
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: template.colors.primary }}
              />
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: template.colors.secondary }}
              />
              <div
                className="w-6 h-6 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: template.colors.accent }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Template Info */}
      <div className="p-4 bg-white">
        <h3 className="font-semibold text-gray-900 mb-1">{template.name}</h3>
        <p className="text-sm text-gray-600">{template.description}</p>
      </div>
    </div>
  );
}
