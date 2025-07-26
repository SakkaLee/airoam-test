'use client';
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faCheck, faStar, faRocket, faBrain, faGlobe, faShieldAlt } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../components/Logo";

export default function SubscribePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // API base URL - use environment variable or fallback to localhost for development
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000';

  const handleSubscribe = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE}/api/create-checkout-session/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          success_url: `${window.location.origin}/profile?success=1`,
          cancel_url: `${window.location.origin}/subscribe?canceled=1`,
        }),
      });

      const data = await response.json();

      if (data.checkout_url) {
        window.location.href = data.checkout_url;
      } else {
        setError('Failed to create checkout session');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: faRocket,
      title: "Real-time Updates",
      description: "Get the latest AI news and research papers as they're published"
    },
    {
      icon: faBrain,
      title: "Deep Analysis",
      description: "Expert insights and analysis of AI trends and breakthroughs"
    },
    {
      icon: faGlobe,
      title: "Global Coverage",
      description: "Comprehensive coverage of AI developments worldwide"
    },
    {
      icon: faShieldAlt,
      title: "Premium Content",
      description: "Exclusive articles, tutorials, and research summaries"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 font-sans">
      {/* Header Navigation */}
      <header className="w-full flex items-center justify-between px-6 lg:px-8 py-4 border-b border-slate-700/50 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Logo size={32} />
          <span className="text-xl lg:text-2xl font-bold tracking-wide text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Airoam</span>
        </div>
        <nav className="hidden md:flex gap-6 lg:gap-8 text-sm lg:text-base font-medium">
          <Link href="/" className="hover:text-blue-400 transition-colors duration-200">Home</Link>
          <Link href="/news" className="hover:text-blue-400 transition-colors duration-200">News</Link>
          <Link href="/tutorials" className="hover:text-purple-400 transition-colors duration-200">Tutorials</Link>
          <Link href="/community" className="hover:text-green-400 transition-colors duration-200">Community</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/login" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">Login</Link>
          <Link href="/register" className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200">
            Sign Up
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Premium Subscription
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Unlock exclusive AI news, research insights, and premium content. 
            Stay ahead of the curve with our comprehensive AI coverage.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Pricing Card */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <FontAwesomeIcon icon={faStar} className="w-6 h-6 text-yellow-400" />
                <h2 className="text-2xl font-bold text-white">Premium Plan</h2>
              </div>
              
              <div className="mb-6">
                <div className="text-5xl font-bold text-white mb-2">$9.99</div>
                <div className="text-slate-300">per month</div>
              </div>

              <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg p-4 mb-6">
                <div className="text-sm text-slate-300">
                  Cancel anytime • No commitment • 30-day money-back guarantee
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mt-0.5">
                    <FontAwesomeIcon icon={faCheck} className="w-3 h-3 text-green-400" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{feature.title}</div>
                    <div className="text-sm text-slate-300">{feature.description}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Subscribe Button */}
            <button
              onClick={handleSubscribe}
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold text-lg rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Processing...' : 'Subscribe Now'}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
                <p className="text-red-300 text-sm">{error}</p>
              </div>
            )}

            <div className="mt-4 text-center">
              <p className="text-xs text-slate-400">
                Secure payment powered by Stripe
              </p>
            </div>
          </div>

          {/* Features Detail */}
          <div className="space-y-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <FontAwesomeIcon icon={faRocket} className="w-5 h-5 text-blue-400" />
                What You&apos;ll Get
              </h3>
              <ul className="space-y-3 text-slate-300">
                <li>• Unlimited access to premium AI news and research</li>
                <li>• Exclusive expert analysis and insights</li>
                <li>• Early access to breaking AI developments</li>
                <li>• Curated research paper summaries</li>
                <li>• Industry trend reports and predictions</li>
                <li>• Priority customer support</li>
              </ul>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                <FontAwesomeIcon icon={faShieldAlt} className="w-5 h-5 text-green-400" />
                Why Subscribe?
              </h3>
              <div className="space-y-3 text-slate-300">
                <p>
                  Stay ahead of the AI revolution with our comprehensive coverage of the latest developments, 
                  research breakthroughs, and industry insights.
                </p>
                <p>
                  Our expert team curates and analyzes the most important AI news, saving you hours of research 
                  and keeping you informed about the technologies that will shape the future.
                </p>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="text-xl font-bold text-white mb-4">Testimonials</h3>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-400 pl-4">
                                  <p className="text-slate-300 italic">
                  &ldquo;Airoam&apos;s premium content has been invaluable for staying current with AI developments. 
                  The analysis is always insightful and well-researched.&rdquo;
                </p>
                  <p className="text-sm text-slate-400 mt-2">- Dr. Sarah Chen, AI Researcher</p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                                  <p className="text-slate-300 italic">
                  &ldquo;The exclusive research summaries save me hours every week. 
                  Highly recommended for anyone serious about AI.&rdquo;
                </p>
                  <p className="text-sm text-slate-400 mt-2">- Michael Rodriguez, Tech Lead</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="font-bold text-white mb-2">Can I cancel anytime?</h3>
                             <p className="text-slate-300 text-sm">Yes, you can cancel your subscription at any time. You&apos;ll continue to have access until the end of your billing period.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="font-bold text-white mb-2">Is there a free trial?</h3>
                             <p className="text-slate-300 text-sm">We offer a 30-day money-back guarantee. If you&apos;re not satisfied, we&apos;ll refund your payment.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="font-bold text-white mb-2">How often is content updated?</h3>
              <p className="text-slate-300 text-sm">We publish new content daily, with breaking news updates throughout the day.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700/50 p-6">
              <h3 className="font-bold text-white mb-2">What payment methods do you accept?</h3>
              <p className="text-slate-300 text-sm">We accept all major credit cards and debit cards through our secure Stripe payment system.</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-slate-700/50 bg-slate-900/95 backdrop-blur-sm py-8 px-4 mt-16">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Logo size={28} />
            <div>
              <span className="font-bold text-lg text-white bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Airoam</span>
              <div className="text-slate-400 text-sm">© {new Date().getFullYear()} All rights reserved</div>
            </div>
          </div>
          <div className="flex flex-col items-center lg:items-end gap-2">
            <div className="text-slate-300">Contact: <a href="mailto:airoam.net@gmail.com" className="text-blue-400 hover:text-blue-300 underline transition-colors">airoam.net@gmail.com</a></div>
            <div className="flex gap-4 text-slate-400">
              <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 