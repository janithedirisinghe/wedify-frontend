"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Users, Mail, QrCode, Calendar, Check } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ROUTES, APP_NAME } from "@/lib/constants";

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
  ];

  const steps = [
    {
      number: "1",
      title: "Create Account",
      description: "Sign up and set up your wedding details in minutes",
    },
    {
      number: "2",
      title: "Choose Template",
      description: "Select and customize your perfect invitation design",
    },
    {
      number: "3",
      title: "Add Guests",
      description: "Import or add your guest list with their contact details",
    },
    {
      number: "4",
      title: "Send Invites",
      description: "Share your beautiful invitation and track RSVPs",
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
              <Heart className="w-16 h-16 text-primary-600 mx-auto mb-6" fill="currentColor" />
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                Create Your Perfect
                <br />
                <span className="text-primary-600">Wedding Invitation</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Design beautiful invitations, manage guests, and track RSVPs all in one place.
                Make your special day unforgettable with {APP_NAME}.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={ROUTES.DASHBOARD} className="btn-primary text-lg px-8">
                  Get Started Free
                </Link>
                <Link href="#features" className="btn-outline text-lg px-8">
                  Learn More
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
                <span className="text-primary-600 font-semibold">your-names</span>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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

      {/* How It Works Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Four simple steps to create your perfect invitation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300" />
                )}
              </motion.div>
            ))}
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
              <Link href={ROUTES.DASHBOARD} className="btn-outline w-full text-center block">
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
              <Link href={ROUTES.DASHBOARD} className="btn-primary w-full text-center block">
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
            <Link
              href={ROUTES.DASHBOARD}
              className="inline-block bg-white text-primary-600 font-semibold py-3 px-8 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg text-lg"
            >
              Start For Free
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
