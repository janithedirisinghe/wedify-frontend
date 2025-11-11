"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Users, 
  Mail, 
  Palette, 
  Settings, 
  Heart,
  LogOut,
  Menu,
  X 
} from "lucide-react";
import { APP_NAME, ROUTES } from "@/lib/constants";
import { useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navItems = [
    {
      href: ROUTES.DASHBOARD,
      label: "Overview",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      href: ROUTES.GUESTS,
      label: "Guests",
      icon: <Users className="w-5 h-5" />,
    },
    {
      href: ROUTES.INVITES,
      label: "Invitations",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      href: ROUTES.TEMPLATES,
      label: "Templates",
      icon: <Palette className="w-5 h-5" />,
    },
    {
      href: ROUTES.SETTINGS,
      label: "Settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-gray-200 px-4 h-16">
        <Link href={ROUTES.HOME} className="flex items-center space-x-2">
          <Heart className="w-6 h-6 text-primary-600" fill="currentColor" />
          <span className="text-xl font-bold text-gray-900">{APP_NAME}</span>
        </Link>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2"
          aria-label="Toggle sidebar"
        >
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transition-transform duration-200 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="hidden lg:flex items-center h-16 px-6 border-b border-gray-200">
              <Link href={ROUTES.HOME} className="flex items-center space-x-2">
                <Heart className="w-6 h-6 text-primary-600" fill="currentColor" />
                <span className="text-xl font-bold text-gray-900">{APP_NAME}</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? "bg-primary-50 text-primary-600 font-medium"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* User Info & Logout */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-center gap-3 px-4 py-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                  <span className="text-primary-600 font-semibold">JD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">John & Jane</p>
                  <p className="text-xs text-gray-500 truncate">john@example.com</p>
                </div>
              </div>
              <button
                onClick={() => {
                  // Handle logout
                  console.log("Logout");
                }}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {sidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-30"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
