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
    <div className="card">
      <h1 className="text-2xl font-semibold">Legality & Disclaimer</h1>
      <div className="mt-3 space-y-3 text-neutral-300">
        <p><strong>Educational Only.</strong> This app ships with no cultivation instructions. It provides neutral catalog information and private journaling tools.</p>
        <p><strong>Your Responsibility.</strong> You must comply with your local laws. If cultivation or related content is not legal where you live, do not enable it.</p>
        <p><strong>Age Gate.</strong> By enabling, you attest you are of legal age and in a jurisdiction where such content is permitted.</p>
      </div>
      <div className="mt-4 flex gap-2">
        {!allowed ? (
          <button onClick={accept} className="btn">Enable Sensitive Modules</button>
        ) : (
          <>
            <span className="badge">Enabled</span>
            <button onClick={revoke} className="btn">Disable</button>
          </>
        )}
      </div>
    </div>
  );
}