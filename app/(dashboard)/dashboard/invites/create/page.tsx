"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check, ChevronRight } from "lucide-react";
import Link from "next/link";
import { TEMPLATES } from "@/lib/constants";
import InviteCard from "@/components/InviteCard";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  category?: string;
}

// Mock guests data - replace with actual API call
const mockGuests: Guest[] = [
  { id: "1", name: "Sarah Johnson", email: "sarah@example.com", phone: "+94 71 234 5678", category: "Family" },
  { id: "2", name: "Michael Brown", email: "michael@example.com", phone: "+94 77 345 6789", category: "Friends" },
  { id: "3", name: "Emily Davis", email: "emily@example.com", phone: "+94 76 456 7890", category: "Colleagues" },
];

export default function CreateInvitationGroupPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [groupName, setGroupName] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [customColors, setCustomColors] = useState<{
    primary: string;
    secondary: string;
    accent: string;
  } | null>(null);
  const [selectedGuestIds, setSelectedGuestIds] = useState<string[]>([]);

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = TEMPLATES.find((t) => t.id === templateId);
    if (template) {
      setCustomColors(template.colors);
    }
  };

  const toggleGuestSelection = (guestId: string) => {
    setSelectedGuestIds((prev) =>
      prev.includes(guestId)
        ? prev.filter((id) => id !== guestId)
        : [...prev, guestId]
    );
  };

  const handleCreateGroup = () => {
    if (!groupName || !selectedTemplate || selectedGuestIds.length === 0) {
      alert("Please complete all steps before creating the group");
      return;
    }

    // TODO: API call to create group
    console.log("Creating group:", {
      name: groupName,
      templateId: selectedTemplate,
      customColors,
      guestIds: selectedGuestIds,
    });

    // Redirect to invitations page
    router.push("/dashboard/invites");
  };

  const canProceed = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return selectedTemplate !== "";
      case 2:
        return selectedGuestIds.length > 0;
      case 3:
        return groupName.trim() !== "";
      default:
        return false;
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/dashboard/invites"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Invitations
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Invitation Group</h1>
        <p className="text-gray-600">
          Select a template, choose guests, and create your invitation group
        </p>
      </div>

      {/* Progress Steps */}
      <div className="card mb-8">
        <div className="flex items-center justify-between">
          {[
            { number: 1, title: "Select Template" },
            { number: 2, title: "Choose Guests" },
            { number: 3, title: "Review & Create" },
          ].map((item, index) => (
            <div key={item.number} className="flex items-center flex-1">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    step > item.number
                      ? "bg-green-500 text-white"
                      : step === item.number
                      ? "bg-primary-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > item.number ? <Check className="w-5 h-5" /> : item.number}
                </div>
                <span
                  className={`font-medium ${
                    step === item.number ? "text-gray-900" : "text-gray-500"
                  }`}
                >
                  {item.title}
                </span>
              </div>
              {index < 2 && (
                <div className="flex-1 h-1 mx-4 bg-gray-200 relative">
                  <div
                    className={`absolute inset-y-0 left-0 ${
                      step > item.number ? "bg-green-500" : "bg-gray-200"
                    }`}
                    style={{ width: step > item.number ? "100%" : "0%" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step 1: Select Template */}
      {step === 1 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Template</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEMPLATES.map((template) => (
              <button
                key={template.id}
                onClick={() => handleTemplateSelect(template.id)}
                className={`card text-left transition-all hover:shadow-lg ${
                  selectedTemplate === template.id
                    ? "ring-2 ring-primary-600 shadow-lg"
                    : ""
                }`}
              >
                <div
                  className="h-40 rounded-lg mb-4 flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, ${template.colors.primary}, ${template.colors.secondary})`,
                  }}
                >
                  {selectedTemplate === template.id && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">
                  {template.name}
                </h3>
                <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                <div className="flex gap-2">
                  {Object.entries(template.colors).map(([key, color]) => (
                    <div
                      key={key}
                      className="w-8 h-8 rounded-full border-2 border-white shadow"
                      style={{ backgroundColor: color }}
                      title={key}
                    />
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Choose Guests */}
      {step === 2 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Guests</h2>
          <p className="text-gray-600 mb-6">
            Choose the guests who will receive this invitation
          </p>

          <div className="card mb-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">
                  {selectedGuestIds.length} guest{selectedGuestIds.length !== 1 ? "s" : ""}{" "}
                  selected
                </p>
                <p className="text-sm text-gray-600">
                  Out of {mockGuests.length} total guests
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setSelectedGuestIds(mockGuests.map((g) => g.id))}
                  className="btn-outline text-sm"
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelectedGuestIds([])}
                  className="btn-outline text-sm"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {mockGuests.map((guest) => {
              const isSelected = selectedGuestIds.includes(guest.id);
              return (
                <button
                  key={guest.id}
                  onClick={() => toggleGuestSelection(guest.id)}
                  className={`w-full card text-left transition-all ${
                    isSelected ? "ring-2 ring-primary-600 bg-primary-50" : "hover:shadow-md"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        isSelected
                          ? "bg-primary-600 border-primary-600"
                          : "border-gray-300"
                      }`}
                    >
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{guest.name}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-sm text-gray-600">{guest.email}</p>
                        {guest.phone && (
                          <p className="text-sm text-gray-600">{guest.phone}</p>
                        )}
                      </div>
                    </div>
                    {guest.category && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {guest.category}
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {mockGuests.length === 0 && (
            <div className="card text-center py-12">
              <p className="text-gray-500 mb-4">No guests available</p>
              <Link href="/dashboard/guests" className="btn-primary inline-flex items-center gap-2">
                Add Guests
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Step 3: Review & Create */}
      {step === 3 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Create</h2>

          {/* Group Name */}
          <div className="card mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Group Name *
            </label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Family & Close Friends"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Template Preview */}
            <div className="card">
              <h3 className="font-semibold text-gray-900 mb-4">Selected Template</h3>
              <div
                className="h-48 rounded-lg mb-4 flex items-center justify-center"
                style={{
                  background: customColors
                    ? `linear-gradient(135deg, ${customColors.primary}, ${customColors.secondary})`
                    : "#e5e7eb",
                }}
              >
                <div className="text-white text-center">
                  <p className="text-2xl font-bold">
                    {TEMPLATES.find((t) => t.id === selectedTemplate)?.name}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setStep(1)}
                className="btn-outline w-full text-sm"
              >
                Change Template
              </button>
            </div>

            {/* Guest List */}
            <div className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Selected Guests</h3>
                <button onClick={() => setStep(2)} className="text-primary-600 text-sm font-medium">
                  Edit
                </button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {mockGuests
                  .filter((g) => selectedGuestIds.includes(g.id))
                  .map((guest) => (
                    <div
                      key={guest.id}
                      className="p-3 bg-gray-50 rounded-lg"
                    >
                      <p className="font-medium text-gray-900">{guest.name}</p>
                      <p className="text-sm text-gray-600">{guest.email}</p>
                    </div>
                  ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-900">
                  Total: {selectedGuestIds.length} guest{selectedGuestIds.length !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Invitation Preview</h3>
            <div className="bg-gray-50 p-6 rounded-lg">
              <InviteCard
                wedding={{
                  brideName: "Jane",
                  groomName: "John",
                  date: "2025-12-25",
                  time: "4:00 PM",
                  venue: "Grand Hotel Ballroom",
                  venueAddress: "123 Wedding Street, City",
                  message: "Join us as we celebrate our special day",
                }}
                template={selectedTemplate}
                customColors={customColors || undefined}
              />
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={() => {
            if (step > 1) setStep((step - 1) as 1 | 2 | 3);
            else router.push("/dashboard/invites");
          }}
          className="btn-outline"
        >
          {step === 1 ? "Cancel" : "Back"}
        </button>
        <div className="flex gap-3">
          {step < 3 ? (
            <button
              onClick={() => setStep((step + 1) as 1 | 2 | 3)}
              disabled={!canProceed(step)}
              className="btn-primary flex items-center gap-2"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleCreateGroup}
              disabled={!groupName.trim()}
              className="btn-primary"
            >
              Create Invitation Group
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
