"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Calendar, MapPin, Users, Globe, Save } from "lucide-react";

const settingsSchema = z.object({
  brideName: z.string().min(2, "Name must be at least 2 characters"),
  groomName: z.string().min(2, "Name must be at least 2 characters"),
  weddingDate: z.string().min(1, "Date is required"),
  weddingTime: z.string().min(1, "Time is required"),
  venue: z.string().min(2, "Venue is required"),
  venueAddress: z.string().optional(),
  subdomain: z.string().min(3, "Subdomain must be at least 3 characters"),
  message: z.string().max(500).optional(),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"wedding" | "domain" | "account">("wedding");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      brideName: "Jane Smith",
      groomName: "John Doe",
      weddingDate: "2025-12-15",
      weddingTime: "18:00",
      venue: "Grand Ballroom, Hotel Paradise",
      venueAddress: "123 Paradise Street, Colombo 07",
      subdomain: "john-and-jane",
      message: "We joyfully request the pleasure of your company",
    },
  });

  const onSubmit = async (data: SettingsFormData) => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Settings saved:", data);
    setIsSaving(false);
  };

  const tabs = [
    { id: "wedding", label: "Wedding Details", icon: <Users className="w-5 h-5" /> },
    { id: "domain", label: "Domain & URL", icon: <Globe className="w-5 h-5" /> },
    { id: "account", label: "Account", icon: <Users className="w-5 h-5" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your wedding details and account settings
        </p>
      </div>

      {/* Tabs */}
      <div className="card p-0 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Wedding Details Tab */}
            {activeTab === "wedding" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Bride Name */}
                  <div>
                    <label htmlFor="brideName" className="block text-sm font-medium text-gray-700 mb-1">
                      Bride's Name *
                    </label>
                    <input
                      id="brideName"
                      type="text"
                      {...register("brideName")}
                      className="input-field"
                    />
                    {errors.brideName && (
                      <p className="mt-1 text-sm text-red-600">{errors.brideName.message}</p>
                    )}
                  </div>

                  {/* Groom Name */}
                  <div>
                    <label htmlFor="groomName" className="block text-sm font-medium text-gray-700 mb-1">
                      Groom's Name *
                    </label>
                    <input
                      id="groomName"
                      type="text"
                      {...register("groomName")}
                      className="input-field"
                    />
                    {errors.groomName && (
                      <p className="mt-1 text-sm text-red-600">{errors.groomName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Wedding Date */}
                  <div>
                    <label htmlFor="weddingDate" className="block text-sm font-medium text-gray-700 mb-1">
                      <Calendar className="inline w-4 h-4 mr-1" />
                      Wedding Date *
                    </label>
                    <input
                      id="weddingDate"
                      type="date"
                      {...register("weddingDate")}
                      className="input-field"
                    />
                    {errors.weddingDate && (
                      <p className="mt-1 text-sm text-red-600">{errors.weddingDate.message}</p>
                    )}
                  </div>

                  {/* Wedding Time */}
                  <div>
                    <label htmlFor="weddingTime" className="block text-sm font-medium text-gray-700 mb-1">
                      Time *
                    </label>
                    <input
                      id="weddingTime"
                      type="time"
                      {...register("weddingTime")}
                      className="input-field"
                    />
                    {errors.weddingTime && (
                      <p className="mt-1 text-sm text-red-600">{errors.weddingTime.message}</p>
                    )}
                  </div>
                </div>

                {/* Venue */}
                <div>
                  <label htmlFor="venue" className="block text-sm font-medium text-gray-700 mb-1">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    Venue *
                  </label>
                  <input
                    id="venue"
                    type="text"
                    {...register("venue")}
                    className="input-field"
                    placeholder="e.g., Grand Ballroom, Hotel Paradise"
                  />
                  {errors.venue && (
                    <p className="mt-1 text-sm text-red-600">{errors.venue.message}</p>
                  )}
                </div>

                {/* Venue Address */}
                <div>
                  <label htmlFor="venueAddress" className="block text-sm font-medium text-gray-700 mb-1">
                    Venue Address
                  </label>
                  <input
                    id="venueAddress"
                    type="text"
                    {...register("venueAddress")}
                    className="input-field"
                    placeholder="Full address with city"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Invitation Message
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    {...register("message")}
                    className="input-field"
                    placeholder="A personal message for your guests..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
                  )}
                </div>
              </div>
            )}

            {/* Domain Tab */}
            {activeTab === "domain" && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="subdomain" className="block text-sm font-medium text-gray-700 mb-1">
                    <Globe className="inline w-4 h-4 mr-1" />
                    Your Wedding URL
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">https://</span>
                    <input
                      id="subdomain"
                      type="text"
                      {...register("subdomain")}
                      className="input-field flex-1"
                    />
                    <span className="text-gray-500">.wedify.lk</span>
                  </div>
                  {errors.subdomain && (
                    <p className="mt-1 text-sm text-red-600">{errors.subdomain.message}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    This will be the URL for your wedding invitation page
                  </p>
                </div>

                <div className="card bg-blue-50 border border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">Pro Tip</h4>
                  <p className="text-sm text-blue-800">
                    Keep your subdomain short and memorable. Use only lowercase letters, numbers, and hyphens.
                  </p>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === "account" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Account Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value="john@example.com"
                        disabled
                        className="input-field bg-gray-50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Plan
                      </label>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <span className="font-medium">Free Plan</span>
                        <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                          Upgrade to Pro
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-900 mb-2">Danger Zone</h4>
                  <button
                    type="button"
                    className="text-sm text-red-600 hover:text-red-700 font-medium"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            )}

            {/* Save Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={isSaving}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
