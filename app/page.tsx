"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Users, Mail, QrCode, Calendar, Check, Sparkles, Globe, Zap } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ROUTES, APP_NAME, TEMPLATES } from "@/lib/constants";

export default function LandingPage() {
  const features = [
    {
      icon: <Calendar className="w-8 h-8" />,
      title: "Beautiful Templates",
      description: "Choose from stunning, customizable wedding invitation templates",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Guest Management",
      description: "Easily manage your guest list and track RSVPs in real-time",
    },
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Easy Invitations",
      description: "Send invitations via WhatsApp or email with just a few clicks",
    },
    {
      icon: <QrCode className="w-8 h-8" />,
      title: "QR Codes & Links",
      description: "Generate unique QR codes and personalized links for each guest",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Custom Subdomains",
      description: "Get your personalized subdomain like yournames.wedify.lk",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Updates",
      description: "Track RSVPs and guest responses as they happen",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Wedding Invitation Platform</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Create Your Perfect
                <br />
                <span className="text-primary-600">Digital Wedding Invitation</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Design beautiful invitations, manage guests, send invites via WhatsApp & Email, 
                and track RSVPs—all in one place. Make your special day unforgettable with {APP_NAME}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={ROUTES.SIGNUP} className="btn-primary text-lg px-8 py-3">
                  Get Started Free
                </Link>
                <Link href="#templates" className="btn-outline text-lg px-8 py-3">
                  View Templates
                </Link>
              </div>
            </motion.div>

            {/* Sample subdomain display */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-12"
            >
              <p className="text-sm text-gray-500 mb-2">Your invitation will look like:</p>
              <div className="inline-block bg-white px-6 py-3 rounded-lg shadow-md border border-gray-200">
                <span className="text-gray-400">https://</span>
                <span className="text-primary-600 font-semibold">janith-and-sanduni</span>
                <span className="text-gray-400">.wedify.lk</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 opacity-10">
          <Heart className="w-32 h-32 text-primary-600" fill="currentColor" />
        </div>
        <div className="absolute bottom-20 right-10 opacity-10">
          <Heart className="w-24 h-24 text-primary-600" fill="currentColor" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need
            </h2>
            <p className="text-lg text-gray-600">
              Powerful features to make your wedding planning effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card text-center"
              >
                <div className="text-primary-600 mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Showcase Section */}
      <section id="templates" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Beautiful Templates
            </h2>
            <p className="text-lg text-gray-600">
              Choose from our collection of professionally designed templates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TEMPLATES.slice(0, 6).map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card group cursor-pointer hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-64 bg-gradient-to-br rounded-lg mb-4 overflow-hidden" style={{
                  background: `linear-gradient(135deg, ${template.colors.primary} 0%, ${template.colors.secondary} 100%)`
                }}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Heart className="w-20 h-20 text-white opacity-20" fill="currentColor" />
                  </div>
                  <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{template.description}</p>
                <div className="flex gap-2">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-200" style={{ backgroundColor: template.colors.primary }} />
                  <div className="w-8 h-8 rounded-full border-2 border-gray-200" style={{ backgroundColor: template.colors.secondary }} />
                  <div className="w-8 h-8 rounded-full border-2 border-gray-200" style={{ backgroundColor: template.colors.accent }} />
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href={ROUTES.SIGNUP} className="btn-primary text-lg px-8 py-3">
              Start Creating Your Invitation
            </Link>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple Pricing
            </h2>
            <p className="text-lg text-gray-600">
              Choose the plan that's right for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card border-2 border-gray-200"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <p className="text-gray-600 mb-6">Perfect for small weddings</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$0</span>
                <span className="text-gray-600">/forever</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Up to 100 guests</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">2 template designs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Email & WhatsApp invites</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">RSVP tracking</span>
                </li>
              </ul>
              <Link href={ROUTES.SIGNUP} className="btn-outline w-full text-center block">
                Get Started
              </Link>
            </motion.div>

            {/* Pro Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card border-2 border-primary-600 relative"
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Popular
                </span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
              <p className="text-gray-600 mb-6">For larger celebrations</p>
              <div className="mb-6">
                <span className="text-4xl font-bold text-gray-900">$29</span>
                <span className="text-gray-600">/one-time</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Up to 500 guests</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">All template designs</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Custom domain support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Priority support</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">Advanced analytics</span>
                </li>
              </ul>
              <Link href={ROUTES.SIGNUP} className="btn-primary w-full text-center block">
                Get Started
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Create Your Invitation?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Join thousands of couples who have made their wedding planning easier with {APP_NAME}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={ROUTES.SIGNUP}
                className="inline-block bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg text-lg"
              >
                Sign Up Free
              </Link>
              <Link
                href={ROUTES.SIGNIN}
                className="inline-block bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-lg hover:bg-white hover:text-primary-600 transition-all duration-200 text-lg"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
