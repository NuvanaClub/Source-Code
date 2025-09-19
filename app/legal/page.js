"use client";

import { useEffect, useState } from "react";

export default function LegalPage() {
  const [allowed, setAllowed] = useState(false);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState("us");

  useEffect(() => {
    const v = localStorage.getItem("cultivation_allowed");
    setAllowed(v === "true");
  }, []);

  const accept = async () => {
    localStorage.setItem("cultivation_allowed", "true");
    setAllowed(true);
    
    // Log the action for audit purposes
    try {
      await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "legality_gate_enabled",
          details: `User enabled sensitive modules from jurisdiction: ${selectedJurisdiction}`,
          ipAddress: null, // Will be captured server-side
          userAgent: navigator.userAgent
        })
      });
    } catch (error) {
      console.error("Failed to log audit entry:", error);
    }
  };
  const revoke = () => {
    localStorage.removeItem("cultivation_allowed");
    setAllowed(false);
  };

  // Jurisdiction compliance profiles
  const jurisdictions = {
    us: {
      name: "United States",
      flag: "🇺🇸",
      status: "Mixed",
      description: "Federal prohibition, state-level legalization varies",
      legalStates: [
        "California", "Colorado", "Washington", "Oregon", "Nevada", "Alaska",
        "Maine", "Massachusetts", "Vermont", "Illinois", "Arizona", "Montana",
        "New Jersey", "New York", "Virginia", "Connecticut", "New Mexico",
        "Maryland", "Missouri", "Delaware", "Minnesota", "Ohio", "Rhode Island"
      ],
      restrictions: [
        "Federal prohibition still in effect",
        "No interstate transport",
        "Banking restrictions",
        "Employment protections vary by state"
      ],
      ageRequirement: "21+ (most states)",
      possessionLimits: "Varies by state (typically 1-2.5 oz)",
      cultivationAllowed: "Varies by state (typically 6-12 plants)"
    },
    canada: {
      name: "Canada",
      flag: "🇨🇦",
      status: "Legal",
      description: "Federally legal for recreational and medical use",
      legalStates: ["All provinces and territories"],
      restrictions: [
        "Provincial regulations vary",
        "No sales to minors",
        "Public consumption restrictions",
        "Driving under influence laws"
      ],
      ageRequirement: "18+ (19+ in some provinces)",
      possessionLimits: "30g dried cannabis (public), unlimited at home",
      cultivationAllowed: "Up to 4 plants per household"
    },
    mexico: {
      name: "Mexico",
      flag: "🇲🇽",
      status: "Legal",
      description: "Federally legal for recreational and medical use",
      legalStates: ["All states"],
      restrictions: [
        "Regulatory framework still developing",
        "No sales to minors",
        "Public consumption restrictions",
        "Limited commercial availability"
      ],
      ageRequirement: "18+",
      possessionLimits: "28g dried cannabis",
      cultivationAllowed: "Up to 6 plants per household"
    },
    northAmerica: {
      name: "North America (Other)",
      flag: "🌎",
      status: "Mixed",
      description: "Various legalization statuses across North American countries",
      legalStates: [
        "Costa Rica (decriminalized)", "Jamaica (decriminalized)",
        "Belize (decriminalized)", "Antigua and Barbuda (legal)",
        "Barbados (legal)", "St. Vincent and the Grenadines (legal)"
      ],
      restrictions: [
        "Varies significantly by country",
        "Most countries have decriminalized rather than legalized",
        "Medical access varies",
        "Tourist consumption restrictions"
      ],
      ageRequirement: "18+ (varies by country)",
      possessionLimits: "Varies by country (typically 1-30g)",
      cultivationAllowed: "Varies by country (typically 1-6 plants)"
    },
    centralAmerica: {
      name: "Central America",
      flag: "🌎",
      status: "Mixed",
      description: "Mixed legalization status across Central American countries",
      legalStates: [
        "Costa Rica (decriminalized)", "Belize (decriminalized)",
        "Guatemala (decriminalized)", "Panama (medical only)",
        "El Salvador (decriminalized)", "Honduras (decriminalized)",
        "Nicaragua (illegal but rarely enforced)"
      ],
      restrictions: [
        "Most countries have decriminalized rather than legalized",
        "Medical access limited in most countries",
        "Tourist consumption generally not permitted",
        "Small possession amounts typically tolerated"
      ],
      ageRequirement: "18+ (varies by country)",
      possessionLimits: "Varies by country (typically 1-10g)",
      cultivationAllowed: "Varies by country (typically 1-4 plants)"
    },
    southAmerica: {
      name: "South America",
      flag: "🌎",
      status: "Mixed",
      description: "Progressive legalization across several South American countries",
      legalStates: [
        "Uruguay (legal)", "Colombia (legal)", "Argentina (medical)",
        "Chile (medical)", "Peru (decriminalized)", "Ecuador (decriminalized)",
        "Brazil (decriminalized)", "Paraguay (illegal but tolerated)"
      ],
      restrictions: [
        "Uruguay and Colombia have full legalization",
        "Medical access expanding across the region",
        "Cultivation rights vary significantly",
        "Export restrictions in some countries"
      ],
      ageRequirement: "18+ (varies by country)",
      possessionLimits: "Varies by country (typically 5-40g)",
      cultivationAllowed: "Varies by country (typically 1-20 plants)"
    },
    asia: {
      name: "Asia",
      flag: "🌏",
      status: "Restricted",
      description: "Generally restrictive with few exceptions",
      legalStates: [
        "Thailand (medical)", "South Korea (medical)", "Israel (medical)",
        "Lebanon (decriminalized)", "Nepal (decriminalized)",
        "Sri Lanka (medical)", "Malaysia (medical CBD only)"
      ],
      restrictions: [
        "Most countries maintain strict prohibition",
        "Medical access very limited",
        "Severe penalties in many countries",
        "Cultural and religious restrictions"
      ],
      ageRequirement: "18+ (varies by country)",
      possessionLimits: "Varies by country (typically 0-10g)",
      cultivationAllowed: "Varies by country (typically 0-6 plants)"
    },
    oceania: {
      name: "Oceania",
      flag: "🌏",
      status: "Mixed",
      description: "Mixed legalization status across Pacific nations",
      legalStates: [
        "Australia (medical)", "New Zealand (medical)", "Fiji (decriminalized)",
        "Vanuatu (decriminalized)", "Papua New Guinea (decriminalized)",
        "Samoa (illegal)", "Tonga (illegal)", "Solomon Islands (illegal)"
      ],
      restrictions: [
        "Medical access expanding in major countries",
        "Recreational use remains limited",
        "Island nations have varying approaches",
        "Tourist consumption generally not permitted"
      ],
      ageRequirement: "18+ (varies by country)",
      possessionLimits: "Varies by country (typically 0-15g)",
      cultivationAllowed: "Varies by country (typically 0-4 plants)"
    },
    eu: {
      name: "European Union",
      flag: "🇪🇺",
      status: "Mixed",
      description: "Varies significantly by member state",
      legalStates: [
        "Netherlands (decriminalized)", "Portugal (decriminalized)",
        "Spain (private clubs)", "Germany (medical)", "Luxembourg (recreational)",
        "Malta (legal)", "Switzerland (decriminalized)", "Czech Republic (decriminalized)"
      ],
      restrictions: [
        "No EU-wide legalization",
        "Schengen area transport restrictions",
        "Varying medical access",
        "Limited recreational access"
      ],
      ageRequirement: "18+ (varies by country)",
      possessionLimits: "Varies by country (typically 5-30g)",
      cultivationAllowed: "Varies by country (typically 1-5 plants)"
    }
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
        
        {/* Jurisdiction Selector */}
        <div className="mb-6">
          <label className="label block mb-3">Select Your Jurisdiction</label>
          <select
            value={selectedJurisdiction}
            onChange={(e) => setSelectedJurisdiction(e.target.value)}
            className="input w-full md:w-auto"
          >
            {Object.entries(jurisdictions).map(([key, jurisdiction]) => (
              <option key={key} value={key}>
                {jurisdiction.flag} {jurisdiction.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Jurisdiction Details */}
        {(() => {
          const jurisdiction = jurisdictions[selectedJurisdiction];
          return (
            <div className="space-y-6">
              {/* Status Overview */}
              <div className={`p-6 rounded-2xl border-2 ${
                jurisdiction.status === "Legal" 
                  ? "bg-green-900/30 border-green-700/50" 
                  : jurisdiction.status === "Mixed"
                  ? "bg-yellow-900/30 border-yellow-700/50"
                  : jurisdiction.status === "Restricted"
                  ? "bg-red-900/30 border-red-700/50"
                  : "bg-gray-900/30 border-gray-700/50"
              }`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{jurisdiction.flag}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-green-300">{jurisdiction.name}</h3>
                    <span className={`badge ${
                      jurisdiction.status === "Legal" 
                        ? "bg-green-600" 
                        : jurisdiction.status === "Mixed"
                        ? "bg-yellow-600"
                        : jurisdiction.status === "Restricted"
                        ? "bg-red-600"
                        : "bg-gray-600"
                    }`}>
                      {jurisdiction.status}
                    </span>
                  </div>
                </div>
                <p className="text-green-200">{jurisdiction.description}</p>
              </div>

              {/* Legal Details Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Legal States/Areas */}
                <div className="p-4 bg-green-900/20 rounded-2xl border border-green-700/30">
                  <h4 className="font-semibold text-green-300 mb-3">✅ Legal Areas</h4>
                  <div className="space-y-2">
                    {jurisdiction.legalStates.map((state, index) => (
                      <div key={index} className="text-green-200 text-sm">
                        • {state}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Restrictions */}
                <div className="p-4 bg-orange-900/20 rounded-2xl border border-orange-700/30">
                  <h4 className="font-semibold text-orange-300 mb-3">⚠️ Important Restrictions</h4>
                  <div className="space-y-2">
                    {jurisdiction.restrictions.map((restriction, index) => (
                      <div key={index} className="text-orange-200 text-sm">
                        • {restriction}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Legal Requirements */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-900/20 rounded-2xl border border-blue-700/30">
                  <h4 className="font-semibold text-blue-300 mb-2">👤 Age Requirement</h4>
                  <p className="text-blue-200 text-sm">{jurisdiction.ageRequirement}</p>
                </div>
                <div className="p-4 bg-purple-900/20 rounded-2xl border border-purple-700/30">
                  <h4 className="font-semibold text-purple-300 mb-2">📦 Possession Limits</h4>
                  <p className="text-purple-200 text-sm">{jurisdiction.possessionLimits}</p>
                </div>
                <div className="p-4 bg-indigo-900/20 rounded-2xl border border-indigo-700/30">
                  <h4 className="font-semibold text-indigo-300 mb-2">🌱 Cultivation</h4>
                  <p className="text-indigo-200 text-sm">{jurisdiction.cultivationAllowed}</p>
                </div>
              </div>

              {/* Disclaimer */}
              <div className="p-4 bg-neutral-900/50 rounded-2xl border border-neutral-700/50">
                <p className="text-neutral-300 text-sm text-center">
                  ⚠️ <strong>Important:</strong> Laws change frequently. Always verify current regulations in your specific location before engaging in any cannabis-related activities. This information is for educational purposes only and should not be considered legal advice.
                </p>
              </div>
            </div>
          );
        })()}
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