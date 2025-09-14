"use client";

import { useEffect, useState } from "react";

export default function LegalGate({ children }) {
  const [allowed, setAllowed] = useState(false);
  useEffect(() => {
    setAllowed(localStorage.getItem("cultivation_allowed") === "true");
  }, []);
  if (!allowed) {
    return (
      <div className="card">
        <h2 className="text-xl font-semibold">Sensitive Module Locked</h2>
        <p className="mt-2 text-neutral-300">
          You must enable the legality/age gate on the <a className="link" href="/legal">Legal</a> page to view this section.
        </p>
      </div>
    );
  }
  return children;
}