"use client";

import { useState } from "react";
import { Plus, Users, Palette, Send, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import { TEMPLATES } from "@/lib/constants";

interface InvitationGroup {
  id: string;
  name: string;
  templateId: string;
  customColors?: {
    primary: string;
    secondary: string;
    accent: string;
  };
  guestIds: string[];
  createdAt: string;
  sentCount: number;
}

export default function InvitesPage() {
  const [groups, setGroups] = useState<InvitationGroup[]>([
    {
      id: "1",
      name: "Family & Close Friends",
      templateId: "elegant-rose",
      customColors: {
        primary: "#e35d72",
        secondary: "#2d3b4c",
        accent: "#f9d5da",
      },
      guestIds: ["1", "2", "3"],
      createdAt: "2025-11-01",
      sentCount: 2,
    },
    {
      id: "2",
      name: "Work Colleagues",
      templateId: "modern-minimal",
      guestIds: ["4", "5"],
      createdAt: "2025-11-05",
      sentCount: 0,
    },
  ]);

  const handleDeleteGroup = (id: string) => {
    if (confirm("Are you sure you want to delete this invitation group?")) {
      setGroups(groups.filter((group) => group.id !== id));
    }
  };

  const getTemplate = (templateId: string) => {
    return TEMPLATES.find((t) => t.id === templateId);
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Invitation Groups</h1>
        <p className="text-gray-600">
          Manage invitation groups with different templates and guest lists
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total Groups</p>
          <p className="text-3xl font-bold text-gray-900">{groups.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Total Invitations</p>
          <p className="text-3xl font-bold text-blue-600">
            {groups.reduce((sum, g) => sum + g.guestIds.length, 0)}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600 mb-1">Sent</p>
          <p className="text-3xl font-bold text-green-600">
            {groups.reduce((sum, g) => sum + g.sentCount, 0)}
          </p>
        </div>
      </div>

      {/* Create New Group Button */}
      <div className="card mb-6 bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-dashed border-primary-300">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Create New Invitation Group
          </h3>
          <p className="text-gray-600 mb-4">
            Select a template, customize colors, and choose guests to create an invitation group
          </p>
          <Link href="/dashboard/invites/create" className="btn-primary inline-flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Create Group
          </Link>
        </div>
      </div>

      {/* Groups List */}
      {groups.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500">No invitation groups yet. Create your first group!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {groups.map((group) => {
            const template = getTemplate(group.templateId);
            const colors = group.customColors || template?.colors;

            return (
              <div key={group.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {group.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Created {new Date(group.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/dashboard/invites/${group.id}/edit`}
                      className="p-2 text-gray-600 hover:text-primary-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDeleteGroup(group.id)}
                      className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div
                    className="h-32 rounded-lg flex items-center justify-center relative overflow-hidden"
                    style={{
                      background: colors
                        ? `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`
                        : "#e5e7eb",
                    }}
                  >
                    <div className="text-center text-white z-10">
                      <Palette className="w-8 h-8 mx-auto mb-2" />
                      <p className="font-medium">{template?.name || "Unknown Template"}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <Users className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                    <p className="text-sm text-gray-600">Guests</p>
                    <p className="text-lg font-bold text-gray-900">{group.guestIds.length}</p>
                  </div>
                  <div className="text-center">
                    <Send className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                    <p className="text-sm text-gray-600">Sent</p>
                    <p className="text-lg font-bold text-green-600">{group.sentCount}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link
                    href={`/dashboard/invites/${group.id}`}
                    className="btn-outline flex-1 flex items-center justify-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </Link>
                  <Link
                    href={`/dashboard/invites/${group.id}/send`}
                    className="btn-primary flex-1 flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Invites
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
