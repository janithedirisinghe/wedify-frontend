"use client";

import { useState } from "react";
import TemplatePreview from "@/components/TemplatePreview";
import { TEMPLATES } from "@/lib/constants";
import { Check } from "lucide-react";

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState("elegant-rose");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Saving template:", selectedTemplate);
    setIsSaving(false);
  };

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
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-primary-600 animate-pulse" />
          <p className="text-sm font-medium text-primary-900">Current Template</p>
        </div>
        <div className="bg-white rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {TEMPLATES.find((t) => t.id === selectedTemplate)?.name}
          </h3>
          <p className="text-gray-600">
            {TEMPLATES.find((t) => t.id === selectedTemplate)?.description}
          </p>
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
    </div>
  );
}
