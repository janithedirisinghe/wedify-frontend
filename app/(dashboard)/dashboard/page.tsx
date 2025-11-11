"use client";

import Link from "next/link";
import { Heart, Users, CheckCircle, XCircle, Clock, ExternalLink, Mail } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export default function DashboardPage() {
  // Mock data - replace with actual API calls
  const stats = {
    totalGuests: 150,
    rsvpAccepted: 120,
    rsvpDeclined: 15,
    rsvpPending: 15,
    daysUntilWedding: 45,
  };

  const recentActivity = [
    { name: "Sarah Johnson", action: "accepted", time: "2 hours ago" },
    { name: "Michael Brown", action: "declined", time: "5 hours ago" },
    { name: "Emily Davis", action: "accepted", time: "1 day ago" },
    { name: "David Wilson", action: "accepted", time: "1 day ago" },
  ];

  const weddingDetails = {
    subdomain: "john-and-jane",
    brideName: "Jane Smith",
    groomName: "John Doe",
    date: "December 15, 2025",
    venue: "Grand Ballroom, Hotel Paradise",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your wedding invitation
        </p>
      </div>

      {/* Wedding Countdown */}
      <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {weddingDetails.brideName} & {weddingDetails.groomName}
            </h2>
            <p className="text-primary-100 mb-1">{weddingDetails.date}</p>
            <p className="text-primary-100">{weddingDetails.venue}</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold mb-2">
              {stats.daysUntilWedding}
            </div>
            <div className="text-primary-100">days to go</div>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-primary-400">
          <Link
            href={`https://${weddingDetails.subdomain}.wedify.lk`}
            target="_blank"
            className="flex items-center gap-2 text-white hover:text-primary-100 transition-colors"
          >
            <span className="font-medium">
              {weddingDetails.subdomain}.wedify.lk
            </span>
            <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Guests */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.totalGuests}
          </div>
          <div className="text-sm text-gray-600">Total Guests</div>
        </div>

        {/* Accepted */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.rsvpAccepted}
          </div>
          <div className="text-sm text-gray-600">Accepted</div>
        </div>

        {/* Declined */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.rsvpDeclined}
          </div>
          <div className="text-sm text-gray-600">Declined</div>
        </div>

        {/* Pending */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
          <div className="text-3xl font-bold text-gray-900 mb-1">
            {stats.rsvpPending}
          </div>
          <div className="text-sm text-gray-600">Pending</div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <Link
              href={ROUTES.GUESTS}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-primary-600" />
                <span className="font-medium text-gray-900">Manage Guests</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href={ROUTES.INVITES}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary-600" />
                <span className="font-medium text-gray-900">Send Invitations</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
            <Link
              href={ROUTES.TEMPLATES}
              className="flex items-center justify-between p-4 rounded-lg border border-gray-200 hover:border-primary-300 hover:bg-primary-50 transition-all"
            >
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-primary-600" fill="currentColor" />
                <span className="font-medium text-gray-900">Change Template</span>
              </div>
              <span className="text-gray-400">→</span>
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent RSVP Activity
          </h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {activity.action === "accepted" ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                  <div>
                    <p className="font-medium text-gray-900">{activity.name}</p>
                    <p className="text-sm text-gray-500">
                      {activity.action === "accepted" ? "Accepted" : "Declined"} invitation
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">{activity.time}</span>
              </div>
            ))}
          </div>
          <Link
            href={ROUTES.GUESTS}
            className="block mt-4 pt-4 border-t text-center text-sm text-primary-600 hover:text-primary-700 font-medium"
          >
            View All Activity
          </Link>
        </div>
      </div>
    </div>
  );
}
