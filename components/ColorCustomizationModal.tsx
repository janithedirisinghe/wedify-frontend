"use client";

import { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { X, Palette, RotateCcw } from "lucide-react";
import { TEMPLATES } from "@/lib/constants";

interface ColorCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateId: string;
  initialColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onSave: (colors: { primary: string; secondary: string; accent: string }) => void;
}

export default function ColorCustomizationModal({
  isOpen,
  onClose,
  templateId,
  initialColors,
  onSave,
}: ColorCustomizationModalProps) {
  const template = TEMPLATES.find((t) => t.id === templateId);
  const defaultColors = template?.colors || { primary: "#d04061", secondary: "#446382", accent: "#f5f5f5" };

  const [colors, setColors] = useState(initialColors || defaultColors);
  const [activeColorPicker, setActiveColorPicker] = useState<"primary" | "secondary" | "accent" | null>(null);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(colors);
    onClose();
  };

  const handleReset = () => {
    setColors(defaultColors);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
              <Palette className="w-5 h-5 text-primary-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Customize Colors</h2>
              <p className="text-sm text-gray-600">{template?.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Color Pickers */}
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Choose Your Colors
              </h3>

              {/* Primary Color */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Color
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveColorPicker("primary")}
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: colors.primary }}
                  />
                  <input
                    type="text"
                    value={colors.primary}
                    onChange={(e) => setColors({ ...colors, primary: e.target.value })}
                    className="input-field flex-1"
                    placeholder="#d04061"
                  />
                </div>
                {activeColorPicker === "primary" && (
                  <div className="mt-3">
                    <HexColorPicker
                      color={colors.primary}
                      onChange={(color) => setColors({ ...colors, primary: color })}
                    />
                  </div>
                )}
              </div>

              {/* Secondary Color */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Secondary Color
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveColorPicker("secondary")}
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: colors.secondary }}
                  />
                  <input
                    type="text"
                    value={colors.secondary}
                    onChange={(e) => setColors({ ...colors, secondary: e.target.value })}
                    className="input-field flex-1"
                    placeholder="#446382"
                  />
                </div>
                {activeColorPicker === "secondary" && (
                  <div className="mt-3">
                    <HexColorPicker
                      color={colors.secondary}
                      onChange={(color) => setColors({ ...colors, secondary: color })}
                    />
                  </div>
                )}
              </div>

              {/* Accent Color */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accent Color
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveColorPicker("accent")}
                    className="w-12 h-12 rounded-lg border-2 border-gray-300 shadow-sm cursor-pointer hover:scale-105 transition-transform"
                    style={{ backgroundColor: colors.accent }}
                  />
                  <input
                    type="text"
                    value={colors.accent}
                    onChange={(e) => setColors({ ...colors, accent: e.target.value })}
                    className="input-field flex-1"
                    placeholder="#f5f5f5"
                  />
                </div>
                {activeColorPicker === "accent" && (
                  <div className="mt-3">
                    <HexColorPicker
                      color={colors.accent}
                      onChange={(color) => setColors({ ...colors, accent: color })}
                    />
                  </div>
                )}
              </div>

              <button
                onClick={handleReset}
                className="btn-outline w-full flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Reset to Default
              </button>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:sticky lg:top-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Live Preview
            </h3>
            <div
              className="rounded-lg shadow-lg overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`,
              }}
            >
              <div className="p-8 text-center">
                <div
                  className="inline-block px-6 py-2 rounded-full mb-4"
                  style={{ backgroundColor: colors.accent }}
                >
                  <p className="text-sm font-medium" style={{ color: colors.primary }}>
                    You're Invited
                  </p>
                </div>
                <h2
                  className="text-3xl font-serif mb-2"
                  style={{ color: colors.accent }}
                >
                  John & Jane
                </h2>
                <p className="text-lg mb-6" style={{ color: colors.accent, opacity: 0.9 }}>
                  December 15, 2025
                </p>
                <div
                  className="inline-block px-6 py-2 rounded-lg"
                  style={{ backgroundColor: colors.accent }}
                >
                  <p className="text-sm font-medium" style={{ color: colors.primary }}>
                    Grand Ballroom
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3 text-center">
              This is a preview. Actual invitation may vary slightly.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
          <button onClick={onClose} className="btn-outline px-6">
            Cancel
          </button>
          <button onClick={handleSave} className="btn-primary px-6">
            Save Colors
          </button>
        </div>
      </div>
    </div>
  );
}
