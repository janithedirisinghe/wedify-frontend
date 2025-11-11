"use client";

import { useState } from "react";
import { Mail, MessageSquare, Copy, QrCode, Send, CheckCircle } from "lucide-react";
import Modal from "@/components/ui/Modal";
import { copyToClipboard, generateWhatsAppLink } from "@/lib/utils";

export default function InvitesPage() {
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<any>(null);

  const inviteUrl = "https://john-and-jane.wedify.lk";

  const guests = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah@example.com",
      phone: "+94712345678",
      inviteSent: true,
      inviteMethod: "email",
      sentDate: "2024-11-10",
    },
    {
      id: "2",
      name: "Michael Brown",
      email: "michael@example.com",
      phone: "+94773456789",
      inviteSent: false,
      inviteMethod: null,
      sentDate: null,
    },
    {
      id: "3",
      name: "Emily Davis",
      email: "emily@example.com",
      phone: "+94764567890",
      inviteSent: true,
      inviteMethod: "whatsapp",
      sentDate: "2024-11-09",
    },
  ];

  const handleCopyLink = async () => {
    const success = await copyToClipboard(inviteUrl);
    if (success) {
      alert("Link copied to clipboard!");
    }
  };

  const handleSendEmail = (guest: any) => {
    console.log("Sending email to:", guest);
    // Implement email sending logic
  };

  const handleSendWhatsApp = (guest: any) => {
    const message = `You're invited to our wedding! View your invitation here: ${inviteUrl}/invite/${guest.id}`;
    const whatsappUrl = generateWhatsAppLink(guest.phone, message);
    window.open(whatsappUrl, "_blank");
  };

  const handleBulkSend = (method: "email" | "whatsapp") => {
    console.log(`Sending bulk invitations via ${method}`);
    // Implement bulk send logic
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Send Invitations</h1>
        <p className="text-gray-600 mt-1">
          Share your wedding invitation with guests
        </p>
      </div>

      {/* Invitation Link Card */}
      <div className="card bg-gradient-to-br from-primary-50 to-white border-2 border-primary-100">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Your Invitation Link
            </h3>
            <p className="text-sm text-gray-600">
              Share this link with your guests
            </p>
          </div>
          <button
            onClick={() => setIsQRModalOpen(true)}
            className="btn-outline text-sm flex items-center gap-2"
          >
            <QrCode className="w-4 h-4" />
            QR Code
          </button>
        </div>

        <div className="flex items-center gap-2 p-4 bg-white rounded-lg border border-gray-200">
          <input
            type="text"
            value={inviteUrl}
            readOnly
            className="flex-1 bg-transparent outline-none text-sm text-gray-700"
          />
          <button
            onClick={handleCopyLink}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm font-medium"
          >
            <Copy className="w-4 h-4" />
            Copy
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card">
          <p className="text-sm text-gray-600">Total Guests</p>
          <p className="text-2xl font-bold text-gray-900">{guests.length}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Invitations Sent</p>
          <p className="text-2xl font-bold text-green-600">
            {guests.filter((g) => g.inviteSent).length}
          </p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-600">
            {guests.filter((g) => !g.inviteSent).length}
          </p>
        </div>
      </div>

      {/* Bulk Actions */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Send to All Guests
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => handleBulkSend("email")}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Mail className="w-5 h-5" />
            Send All via Email
          </button>
          <button
            onClick={() => handleBulkSend("whatsapp")}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            <MessageSquare className="w-5 h-5" />
            Send All via WhatsApp
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-3">
          This will send invitations to all guests who haven't received one yet
        </p>
      </div>

      {/* Guest List */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Individual Invitations
        </h3>
        <div className="space-y-3">
          {guests.map((guest) => (
            <div
              key={guest.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-gray-900">{guest.name}</p>
                  {guest.inviteSent && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                      <CheckCircle className="w-3 h-3" />
                      Sent
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-sm text-gray-600">{guest.email}</p>
                  <p className="text-sm text-gray-600">{guest.phone}</p>
                </div>
                {guest.inviteSent && (
                  <p className="text-xs text-gray-500 mt-1">
                    Sent via {guest.inviteMethod} on {guest.sentDate}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleSendEmail(guest)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  title="Send via Email"
                >
                  <Mail className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleSendWhatsApp(guest)}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  title="Send via WhatsApp"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    setSelectedGuest(guest);
                    setIsQRModalOpen(true);
                  }}
                  className="p-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
                  title="Generate QR Code"
                >
                  <QrCode className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* QR Code Modal */}
      <Modal
        isOpen={isQRModalOpen}
        onClose={() => {
          setIsQRModalOpen(false);
          setSelectedGuest(null);
        }}
        title="QR Code"
      >
        <div className="text-center space-y-4">
          <div className="bg-gray-100 p-8 rounded-lg inline-block">
            {/* Placeholder for QR code - use a QR code library in production */}
            <div className="w-64 h-64 bg-white flex items-center justify-center border-4 border-gray-300">
              <QrCode className="w-32 h-32 text-gray-400" />
            </div>
          </div>
          <p className="text-sm text-gray-600">
            {selectedGuest
              ? `QR code for ${selectedGuest.name}`
              : "Scan this code to view the invitation"}
          </p>
          <div className="flex gap-3">
            <button className="flex-1 btn-outline">Download</button>
            <button className="flex-1 btn-primary">Share</button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
