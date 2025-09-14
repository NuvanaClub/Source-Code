"use client";

import { useState } from "react";
import { Button, Input, Textarea } from "@/components/Form";

export default function GrowEditor({ grow }) {
  const [note, setNote] = useState("");
  const [file, setFile] = useState(null);
  const [err, setErr] = useState("");

  const addEntry = async (e) => {
    e.preventDefault();
    setErr("");
    let photoPath = "";
    if (file) {
      const fd = new FormData();
      fd.append("file", file);
      const up = await fetch("/api/upload", { method: "POST", body: fd });
      if (!up.ok) return setErr("Upload failed");
      photoPath = (await up.json()).path;
    }
    const res = await fetch(`/grow/api/${grow.id}/entry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note, photoPath })
    });
    if (!res.ok) return setErr("Failed to save");
    window.location.reload();
  };

  return (
    <div className="grid gap-4">
      <div className="card">
        <h1 className="text-2xl font-semibold">{grow.title}</h1>
        <p className="text-sm text-neutral-400 mt-1">Private journal. Be mindful of local laws—do not log illegal activities.</p>
      </div>
      <div className="card">
        <form className="grid gap-3" onSubmit={addEntry}>
          <Textarea placeholder="Notes (no unlawful content)" value={note} onChange={e=>setNote(e.target.value)} required />
          <input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0] || null)} />
          <Button type="submit">Add Entry</Button>
          {err && <div className="text-sm text-red-400">{err}</div>}
        </form>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {grow.entries.map(en => (
          <div key={en.id} className="card">
            <div className="text-sm text-neutral-400">{new Date(en.createdAt).toLocaleString()}</div>
            {en.photoPath && <img src={en.photoPath} alt="Entry photo" className="rounded-xl mt-2" />}
            <p className="mt-2 text-neutral-200 whitespace-pre-wrap">{en.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}