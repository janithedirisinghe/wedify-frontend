"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Heart, X } from "lucide-react";
import { apiHelpers } from "@/lib/api";

const rsvpSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  phone: z.string().min(10, "Phone number must be at least 10 digits").optional().or(z.literal("")),
  status: z.enum(["accepted", "declined"]),
  message: z.string().max(500, "Message must be less than 500 characters").optional(),
  guestCount: z.number().min(1).max(10).optional(),
});

type RSVPFormData = z.infer<typeof rsvpSchema>;

interface RSVPFormProps {
  weddingId: string;
  guestCode?: string;
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function RSVPForm({
  weddingId,
  guestCode,
  onSuccess,
  onClose,
}: RSVPFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RSVPFormData>({
    resolver: zodResolver(rsvpSchema),
    defaultValues: {
      status: "accepted",
      guestCount: 1,
    },
  });

  const rsvpStatus = watch("status");

  const onSubmit = async (data: RSVPFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await apiHelpers.submitRSVP({
        ...data,
        weddingId,
        guestCode,
      });

      setSubmitStatus("success");
      setTimeout(() => {
        onSuccess?.();
        onClose?.();
      }, 2000);
    } catch (error) {
      console.error("RSVP submission error:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <Heart className="w-12 h-12 text-primary-600 mx-auto mb-3" fill="currentColor" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">RSVP</h2>
        <p className="text-gray-600">Please let us know if you can attend</p>
      </div>

      {/* Success Message */}
      {submitStatus === "success" && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 text-center font-medium">
            Thank you! Your RSVP has been submitted successfully.
          </p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === "error" && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-center">
            Something went wrong. Please try again.
          </p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name *
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="input-field"
            placeholder="Enter your full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="input-field"
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            {...register("phone")}
            className="input-field"
            placeholder="+94 XX XXX XXXX"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          )}
        </div>

        {/* Response */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Will you attend? *
          </label>
          <div className="flex gap-4">
            <label className="flex-1">
              <input
                type="radio"
                value="accepted"
                {...register("status")}
                className="sr-only peer"
              />
              <div className="p-3 border-2 border-gray-300 rounded-lg text-center cursor-pointer peer-checked:border-primary-600 peer-checked:bg-primary-50 hover:border-primary-400 transition-all">
                <span className="font-medium">✓ Accept</span>
              </div>
            </label>
            <label className="flex-1">
              <input
                type="radio"
                value="declined"
                {...register("status")}
                className="sr-only peer"
              />
              <div className="p-3 border-2 border-gray-300 rounded-lg text-center cursor-pointer peer-checked:border-red-600 peer-checked:bg-red-50 hover:border-red-400 transition-all">
                <span className="font-medium">✗ Decline</span>
              </div>
            </label>
          </div>
        </div>

        {/* Guest Count (only if accepted) */}
        {rsvpStatus === "accepted" && (
          <div>
            <label htmlFor="guestCount" className="block text-sm font-medium text-gray-700 mb-1">
              Number of Guests
            </label>
            <input
              id="guestCount"
              type="number"
              min="1"
              max="10"
              {...register("guestCount", { valueAsNumber: true })}
              className="input-field"
            />
          </div>
        )}

        {/* Message */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
            Message (Optional)
          </label>
          <textarea
            id="message"
            rows={3}
            {...register("message")}
            className="input-field"
            placeholder="Leave a message for the couple..."
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Submitting..." : "Submit RSVP"}
        </button>
      </form>
    </div>
  );
}
