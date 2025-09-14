"use client";

import { useEffect, useState } from "react";

export default function LegalPage() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const v = localStorage.getItem("cultivation_allowed");
    setAllowed(v === "true");
  }, []);

  const accept = () => {
    localStorage.setItem("cultivation_allowed", "true");
    setAllowed(true);
  };
  const revoke = () => {
    localStorage.removeItem("cultivation_allowed");
    setAllowed(false);
  };

  return (
    <div className="grid gap-8">
      {/* Header */}
      <div className="card hero-gradient glow text-center">
        <h1 className="text-4xl font-bold mb-4 weed-leaf">
          ⚖️ Legal Information & Disclaimer
        </h1>
        <p className="text-xl text-green-200">
          Important legal information for cannabis enthusiasts
        </p>
      </div>

      {/* Legal Status */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-green-300 mb-4 flex items-center gap-2">
          🚨 Legal Status
        </h2>
        <div className="space-y-4 text-green-200">
          <div className="p-4 bg-green-900/30 rounded-2xl border border-green-700/50">
            <h3 className="font-semibold text-green-300 mb-2">📚 Educational Purpose Only</h3>
            <p>This application is designed for educational and informational purposes only. It provides neutral catalog information and private journaling tools without any cultivation instructions.</p>
          </div>
          
          <div className="p-4 bg-orange-900/30 rounded-2xl border border-orange-700/50">
            <h3 className="font-semibold text-orange-300 mb-2">⚠️ Your Legal Responsibility</h3>
            <p>You are solely responsible for complying with all applicable local, state, and federal laws. If cannabis-related activities are not legal in your jurisdiction, do not engage with or enable such content.</p>
          </div>
          
          <div className="p-4 bg-purple-900/30 rounded-2xl border border-purple-700/50">
            <h3 className="font-semibold text-purple-300 mb-2">🔞 Age Verification</h3>
            <p>By using this application, you attest that you are of legal age (18+ or 21+ depending on your jurisdiction) and are in a location where such content is permitted by law.</p>
          </div>
        </div>
      </div>

      {/* Jurisdiction Information */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-green-300 mb-4 flex items-center gap-2">
          🌍 Jurisdiction Information
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-4 bg-green-900/20 rounded-2xl border border-green-700/30">
            <h3 className="font-semibold text-green-300 mb-3">✅ Legal States/Countries</h3>
            <ul className="space-y-2 text-green-200 text-sm">
              <li>• Canada (recreational & medical)</li>
              <li>• Uruguay (recreational & medical)</li>
              <li>• Netherlands (decriminalized)</li>
              <li>• Portugal (decriminalized)</li>
              <li>• Various US states (varies by state)</li>
            </ul>
            <p className="text-xs text-green-400 mt-3">
              *This list is not comprehensive and laws change frequently
            </p>
          </div>
          
          <div className="p-4 bg-red-900/20 rounded-2xl border border-red-700/30">
            <h3 className="font-semibold text-red-300 mb-3">❌ Restricted Areas</h3>
            <ul className="space-y-2 text-red-200 text-sm">
              <li>• Many countries worldwide</li>
              <li>• Federal level in the US</li>
              <li>• Most Asian countries</li>
              <li>• Most Middle Eastern countries</li>
              <li>• Check your local laws!</li>
            </ul>
            <p className="text-xs text-red-400 mt-3">
              Always verify current laws in your area
            </p>
          </div>
        </div>
      </div>

      {/* Terms of Use */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-green-300 mb-4 flex items-center gap-2">
          📋 Terms of Use
        </h2>
        <div className="space-y-4 text-green-200">
          <div className="p-4 bg-neutral-900/50 rounded-2xl border border-neutral-700/50">
            <h3 className="font-semibold text-green-300 mb-2">1. No Medical Advice</h3>
            <p className="text-sm">This application does not provide medical advice. Consult healthcare professionals for medical questions.</p>
          </div>
          
          <div className="p-4 bg-neutral-900/50 rounded-2xl border border-neutral-700/50">
            <h3 className="font-semibold text-green-300 mb-2">2. No Cultivation Instructions</h3>
            <p className="text-sm">We do not provide step-by-step cultivation guides or growing instructions.</p>
          </div>
          
          <div className="p-4 bg-neutral-900/50 rounded-2xl border border-neutral-700/50">
            <h3 className="font-semibold text-green-300 mb-2">3. Data Privacy</h3>
            <p className="text-sm">Your grow logs and personal data are stored securely and not shared with third parties.</p>
          </div>
          
          <div className="p-4 bg-neutral-900/50 rounded-2xl border border-neutral-700/50">
            <h3 className="font-semibold text-green-300 mb-2">4. User Responsibility</h3>
            <p className="text-sm">Users are responsible for their own actions and compliance with applicable laws.</p>
          </div>
        </div>
      </div>

      {/* Module Control */}
      <div className="card">
        <h2 className="text-2xl font-semibold text-green-300 mb-4 flex items-center gap-2">
          ⚙️ Module Control
        </h2>
        <div className="p-6 bg-green-900/20 rounded-2xl border border-green-700/50">
          <p className="text-green-200 mb-4">
            Control access to sensitive modules. Only enable if you are of legal age and in a jurisdiction where cannabis-related content is permitted.
          </p>
          <div className="flex items-center gap-4">
            {!allowed ? (
              <button 
                onClick={accept} 
                className="btn btn-primary flex items-center gap-2"
              >
                ✅ Enable Sensitive Modules
              </button>
            ) : (
              <div className="flex items-center gap-4">
                <span className="badge text-green-300">
                  ✅ Modules Enabled
                </span>
                <button 
                  onClick={revoke} 
                  className="btn flex items-center gap-2"
                >
                  ❌ Disable Modules
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="card text-center">
        <h2 className="text-2xl font-semibold text-green-300 mb-4">
          📞 Questions or Concerns?
        </h2>
        <p className="text-green-200 mb-4">
          If you have questions about our legal policies or terms of use, please contact us.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:legal@weedwiki.com" className="btn">
            📧 Contact Legal Team
          </a>
          <a href="/" className="btn btn-secondary">
            🏠 Return Home
          </a>
        </div>
      </div>
    </div>
  );
}