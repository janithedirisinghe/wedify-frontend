"use client";

import { useState } from "react";
import TemplatePreview from "@/components/TemplatePreview";
import ColorCustomizationModal from "@/components/ColorCustomizationModal";
import { TEMPLATES } from "@/lib/constants";
import { Check, Palette, ExternalLink } from "lucide-react";

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("elegant-rose");
  const [customColors, setCustomColors] = useState<{
    primary: string;
    secondary: string;
    accent: string;
  } | null>(null);
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Replace with actual API call to NestJS backend
    // await apiHelpers.updateWedding(weddingId, {
    //   templateId: selectedTemplate,
    //   customColors: customColors
    // });
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Saving template:", selectedTemplate, "with colors:", customColors);
    setIsSaving(false);
  };

  const handleColorSave = (colors: { primary: string; secondary: string; accent: string }) => {
    setCustomColors(colors);
  };

  const handlePreviewTemplate = () => {
    // Build preview URL with template and colors
    const params = new URLSearchParams({
      template: selectedTemplate,
    });

    if (customColors) {
      params.append("primary", customColors.primary);
      params.append("secondary", customColors.secondary);
      params.append("accent", customColors.accent);
    }

    // Open in new window
    window.open(
      `/template-preview?${params.toString()}`,
      "_blank",
      "width=1200,height=900,scrollbars=yes,resizable=yes"
    );
  };

  const currentTemplate = TEMPLATES.find((t) => t.id === selectedTemplate);
  const displayColors = customColors || currentTemplate?.colors;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Choose Template</h1>
          <p className="text-gray-600 mt-1">
            Select a beautiful template for your wedding invitation
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary flex items-center gap-2 disabled:opacity-50"
        >
          <Check className="w-5 h-5" />
          {isSaving ? "Saving..." : "Save Changes"}
        </button>
      </div>

      {/* Current Template Preview */}
      <div className="card bg-primary-50 border-2 border-primary-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
            <p className="text-sm font-medium text-primary-900">Current Template</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePreviewTemplate}
              className="btn-outline text-sm flex items-center gap-2"
            >
              <ExternalLink className="w-4 h-4" />
              Preview Full Page
            </button>
            <button
              onClick={() => setIsCustomizeModalOpen(true)}
              className="btn-primary text-sm flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              Customize Colors
            </button>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {currentTemplate?.name}
              </h3>
              <p className="text-gray-600 mb-4">
                {currentTemplate?.description}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Colors:</span>
                <div
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                  style={{ backgroundColor: displayColors?.primary }}
                />
                <div
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                  style={{ backgroundColor: displayColors?.secondary }}
                />
                <div
                  className="w-8 h-8 rounded-full border-2 border-gray-200"
                  style={{ backgroundColor: displayColors?.accent }}
                />
                {customColors && (
                  <span className="ml-2 text-xs bg-primary-100 text-primary-700 px-2 py-1 rounded-full">
                    Customized
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Available Templates
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TEMPLATES.map((template) => (
            <TemplatePreview
              key={template.id}
              templateId={template.id}
              selected={selectedTemplate === template.id}
              onSelect={setSelectedTemplate}
              onPreview={(templateId) => {
                const params = new URLSearchParams({ template: templateId });
                window.open(
                  `/template-preview?${params.toString()}`,
                  "_blank",
                  "width=1200,height=900,scrollbars=yes,resizable=yes"
                );
              }}
            />
          ))}
        </div>
      </div>

      {/* Template Features */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What's Included
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Fully Responsive</p>
              <p className="text-sm text-gray-600">
                Looks great on all devices
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Customizable Colors</p>
              <p className="text-sm text-gray-600">
                Match your wedding theme
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Easy to Share</p>
              <p className="text-sm text-gray-600">
                Share via link, email, or WhatsApp
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">RSVP Integration</p>
              <p className="text-sm text-gray-600">
                Built-in RSVP form
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Color Customization Modal */}
      <ColorCustomizationModal
        isOpen={isCustomizeModalOpen}
        onClose={() => setIsCustomizeModalOpen(false)}
        templateId={selectedTemplate}
        initialColors={customColors || undefined}
        onSave={handleColorSave}
      />
    </div>
  );
}
